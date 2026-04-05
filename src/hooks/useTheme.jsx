import { useState, useEffect, useCallback } from "react";
const THEME_KEY = "findash-theme";
export const useTheme = () => {
    const [theme, setThemeState] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(THEME_KEY);
            if (stored)
                return stored;
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
    });
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", theme === "dark");
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);
    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    }, []);
    return { theme, toggleTheme };
};
