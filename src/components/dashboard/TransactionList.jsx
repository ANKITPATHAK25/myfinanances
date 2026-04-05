import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ExportButtons } from "./ExportButtons";
const categories = [
    "Salary", "Freelance", "Food & Dining", "Transportation", "Shopping",
    "Entertainment", "Utilities", "Healthcare", "Rent", "Investment", "Other",
];
const formatCurrency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
export const TransactionList = () => {
    const { filteredTransactions, filters, setFilters, role, addTransaction, deleteTransaction } = useApp();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [groupBy, setGroupBy] = useState("none");
    const [form, setForm] = useState({ description: "", amount: "", category: "Other", type: "expense", date: new Date().toISOString().slice(0, 10) });
    const handleAdd = () => {
        if (!form.description || !form.amount)
            return;
        addTransaction({ ...form, amount: parseFloat(form.amount) });
        setForm({ description: "", amount: "", category: "Other", type: "expense", date: new Date().toISOString().slice(0, 10) });
        setDialogOpen(false);
    };
    const toggleSort = () => {
        setFilters((f) => ({ ...f, sortOrder: f.sortOrder === "asc" ? "desc" : "asc" }));
    };
    // Group transactions
    const grouped = (() => {
        if (groupBy === "none")
            return { "": filteredTransactions };
        const map = {};
        filteredTransactions.forEach((t) => {
            const key = groupBy === "category"
                ? t.category
                : new Date(t.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
            (map[key] ??= []).push(t);
        });
        return map;
    })();
    return (<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="gradient-card rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-base font-display font-semibold">Transactions</h3>
        <div className="flex items-center gap-2">
          <ExportButtons />
          {role === "admin" && (<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5 h-8">
                  <Plus size={14}/> Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 pt-2">
                  <div>
                    <Label>Description</Label>
                    <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g., Grocery Store"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Amount</Label>
                      <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00"/>
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}/>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Type</Label>
                      <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAdd} className="w-full">Add Transaction</Button>
                </div>
              </DialogContent>
            </Dialog>)}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14}/>
          <Input className="pl-8 h-9 text-sm" placeholder="Search transactions..." value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}/>
        </div>
        <Select value={filters.type} onValueChange={(v) => setFilters((f) => ({ ...f, type: v }))}>
          <SelectTrigger className="w-full sm:w-[130px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.category} onValueChange={(v) => setFilters((f) => ({ ...f, category: v }))}>
          <SelectTrigger className="w-full sm:w-[140px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={filters.sortBy} onValueChange={(v) => setFilters((f) => ({ ...f, sortBy: v }))}>
          <SelectTrigger className="w-full sm:w-[120px] h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date">By Date</SelectItem>
            <SelectItem value="amount">By Amount</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={toggleSort} className="h-9 px-2.5">
          {filters.sortOrder === "asc" ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
        </Button>
      </div>

      {/* Group By */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-muted-foreground">Group by:</span>
        {["none", "date", "category"].map((g) => (<Button key={g} variant={groupBy === g ? "default" : "outline"} size="sm" className="h-7 text-xs px-2.5" onClick={() => setGroupBy(g)}>
            {g === "none" ? "None" : g === "date" ? "Month" : "Category"}
          </Button>))}
      </div>

      {/* List */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (<div className="text-center py-10 text-muted-foreground text-sm">
            No transactions found.
          </div>) : (Object.entries(grouped).map(([groupLabel, items]) => (<div key={groupLabel}>
              {groupLabel && (<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-3 pb-1 px-3 sticky top-0 bg-card/90 backdrop-blur-sm z-[1]">
                  {groupLabel}
                </div>)}
              <AnimatePresence>
                {items.map((t) => (<motion.div key={t.id} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-all duration-200 group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {t.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold transition-colors ${t.type === "income" ? "text-income" : "text-expense"}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </span>
                      {role === "admin" && (<button onClick={() => deleteTransaction(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1">
                          <Trash2 size={14}/>
                        </button>)}
                    </div>
                  </motion.div>))}
              </AnimatePresence>
            </div>)))}
      </div>
    </motion.div>);
};
