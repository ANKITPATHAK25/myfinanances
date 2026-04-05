import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { balanceTrend } from "@/data/mockData";
export const BalanceChart = () => {
    return (<motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="gradient-card rounded-xl p-5">
      <h3 className="text-base font-display font-semibold mb-4">Balance Trend</h3>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(165 60% 40%)" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="hsl(165 60% 40%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)"/>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)"/>
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}/>
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Balance"]} contentStyle={{ borderRadius: "0.5rem", border: "1px solid hsl(220 13% 91%)", fontSize: 13 }}/>
            <Area type="monotone" dataKey="balance" stroke="hsl(165 60% 40%)" strokeWidth={2.5} fill="url(#balanceGradient)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>);
};
