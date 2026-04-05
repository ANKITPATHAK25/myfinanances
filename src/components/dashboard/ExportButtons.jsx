import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
const toCSV = (transactions) => {
    const headers = "Date,Description,Amount,Category,Type";
    const rows = transactions.map((t) => `${t.date},"${t.description}",${t.amount},${t.category},${t.type}`);
    return [headers, ...rows].join("\n");
};
const download = (content, filename, mime) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};
export const ExportButtons = () => {
    const { filteredTransactions } = useApp();
    const exportCSV = () => {
        download(toCSV(filteredTransactions), "transactions.csv", "text/csv");
    };
    const exportJSON = () => {
        const data = filteredTransactions.map(({ id, ...rest }) => rest);
        download(JSON.stringify(data, null, 2), "transactions.json", "application/json");
    };
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 h-8">
          <Download size={14}/> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCSV}>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem onClick={exportJSON}>Export as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
};
