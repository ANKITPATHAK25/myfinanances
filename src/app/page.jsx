"use client";
import { AppProvider } from "@/context/AppContext";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingBreakdown } from "@/components/dashboard/SpendingBreakdown";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Insights } from "@/components/dashboard/Insights";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
const Dashboard = () => {
    const { theme, toggleTheme } = useTheme();
    return (<div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-display font-bold tracking-tight">FinDash</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme}/>
            <RoleSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <SpendingBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
          <Insights />
        </div>
      </main>
    </div>);
};
const Index = () => (<AppProvider>
    <Dashboard />
  </AppProvider>);
export default Index;
