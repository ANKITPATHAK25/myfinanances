import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { mockTransactions } from "@/data/mockData";
const AppContext = createContext(null);
const STORAGE_KEY = "findash-transactions";
const ROLE_KEY = "findash-role";
const CATEGORY_COLORS = {
    "Food & Dining": "hsl(24 80% 55%)",
    Transportation: "hsl(200 70% 50%)",
    Shopping: "hsl(280 60% 55%)",
    Entertainment: "hsl(330 65% 55%)",
    Utilities: "hsl(45 80% 50%)",
    Healthcare: "hsl(0 65% 55%)",
    Rent: "hsl(220 55% 50%)",
    Other: "hsl(160 40% 50%)",
};
const loadTransactions = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored)
            return JSON.parse(stored);
    }
    catch { }
    return mockTransactions;
};
const loadRole = () => {
    try {
        const stored = localStorage.getItem(ROLE_KEY);
        if (stored === "admin" || stored === "viewer")
            return stored;
    }
    catch { }
    return "admin";
};
export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(loadTransactions);
    const [role, setRoleState] = useState(loadRole);
    const [filters, setFilters] = useState({
        search: "",
        type: "all",
        category: "all",
        sortBy: "date",
        sortOrder: "desc",
    });
    // Persist transactions
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);
    // Persist role
    const setRole = useCallback((r) => {
        setRoleState(r);
        localStorage.setItem(ROLE_KEY, r);
    }, []);
    const addTransaction = useCallback((t) => {
        setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
    }, []);
    const deleteTransaction = useCallback((id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const filteredTransactions = useMemo(() => {
        let result = [...transactions];
        if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
        }
        if (filters.type !== "all")
            result = result.filter((t) => t.type === filters.type);
        if (filters.category !== "all")
            result = result.filter((t) => t.category === filters.category);
        result.sort((a, b) => {
            const mul = filters.sortOrder === "asc" ? 1 : -1;
            if (filters.sortBy === "date")
                return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
            return mul * (a.amount - b.amount);
        });
        return result;
    }, [transactions, filters]);
    const summary = useMemo(() => {
        const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
        const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
        return { totalBalance: totalIncome - totalExpenses, totalIncome, totalExpenses };
    }, [transactions]);
    const categoryBreakdown = useMemo(() => {
        const map = {};
        transactions.filter((t) => t.type === "expense").forEach((t) => {
            map[t.category] = (map[t.category] || 0) + t.amount;
        });
        return Object.entries(map)
            .map(([category, amount]) => ({ category, amount, fill: CATEGORY_COLORS[category] || "hsl(0 0% 60%)" }))
            .sort((a, b) => b.amount - a.amount);
    }, [transactions]);
    return (<AppContext.Provider value={{ transactions, role, setRole, filters, setFilters, addTransaction, deleteTransaction, filteredTransactions, summary, categoryBreakdown }}>
      {children}
    </AppContext.Provider>);
};
export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("useApp must be used within AppProvider");
    return ctx;
};
