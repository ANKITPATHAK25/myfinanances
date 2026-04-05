import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
const formatCurrency = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
export const Insights = () => {
    const { transactions, categoryBreakdown, summary } = useApp();
    const highestCategory = categoryBreakdown[0];
    const marchExpenses = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith("2026-03"))
        .reduce((s, t) => s + t.amount, 0);
    const febExpenses = transactions
        .filter((t) => t.type === "expense" && t.date.startsWith("2026-02"))
        .reduce((s, t) => s + t.amount, 0);
    const monthDiff = marchExpenses - febExpenses;
    const savingsRate = summary.totalIncome > 0 ? ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100 : 0;
    const insights = [
        {
            icon: BarChart3,
            title: "Top Spending Category",
            description: highestCategory
                ? `${highestCategory.category} at ${formatCurrency(highestCategory.amount)}`
                : "No expenses recorded",
            color: "text-warning",
        },
        {
            icon: monthDiff > 0 ? TrendingUp : TrendingDown,
            title: "March vs February",
            description: `Spending ${monthDiff > 0 ? "increased" : "decreased"} by ${formatCurrency(Math.abs(monthDiff))}`,
            color: monthDiff > 0 ? "text-expense" : "text-income",
        },
        {
            icon: Lightbulb,
            title: "Savings Rate",
            description: `You're saving ${savingsRate.toFixed(1)}% of your income`,
            color: "text-primary",
        },
    ];
    return (<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="gradient-card rounded-xl p-5">
      <h3 className="text-base font-display font-semibold mb-4">Insights</h3>
      <div className="space-y-4">
        {insights.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12, duration: 0.35 }} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/50 transition-colors duration-200">
            <div className={`mt-0.5 ${item.color}`}>
              <item.icon size={18}/>
            </div>
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>))}
      </div>
    </motion.div>);
};
