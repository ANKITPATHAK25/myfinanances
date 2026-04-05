import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
export const SpendingBreakdown = () => {
    const { categoryBreakdown } = useApp();
    if (categoryBreakdown.length === 0) {
        return (<div className="gradient-card rounded-xl p-5 flex items-center justify-center h-full">
        <p className="text-muted-foreground text-sm">No expense data yet.</p>
      </div>);
    }
    return (<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="gradient-card rounded-xl p-5">
      <h3 className="text-base font-display font-semibold mb-4">Spending Breakdown</h3>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={55} outerRadius={85} strokeWidth={2} stroke="hsl(0 0% 100%)">
                {categoryBreakdown.map((entry, i) => (<Cell key={i} fill={entry.fill}/>))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {categoryBreakdown.map((item) => (<div key={item.category} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }}/>
              <span className="text-muted-foreground">{item.category}</span>
              <span className="font-medium">${item.amount.toFixed(0)}</span>
            </div>))}
        </div>
      </div>
    </motion.div>);
};
