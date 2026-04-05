import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
const cards = [
    { key: "totalBalance", label: "Total Balance", icon: Wallet, className: "gradient-primary" },
    { key: "totalIncome", label: "Income", icon: TrendingUp, className: "gradient-income" },
    { key: "totalExpenses", label: "Expenses", icon: TrendingDown, className: "gradient-expense" },
];
const formatCurrency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
export const SummaryCards = () => {
    const { summary } = useApp();
    return (<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ key, label, icon: Icon, className }, i) => (<motion.div key={key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className={`${className} rounded-xl p-5 text-primary-foreground relative overflow-hidden`}>
          <div className="absolute top-3 right-3 opacity-20">
            <Icon size={48}/>
          </div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-2xl font-bold font-display mt-1">{formatCurrency(summary[key])}</p>
        </motion.div>))}
    </div>);
};
