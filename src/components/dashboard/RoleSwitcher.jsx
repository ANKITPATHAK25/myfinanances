import { useApp } from "@/context/AppContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Eye } from "lucide-react";
export const RoleSwitcher = () => {
    const { role, setRole } = useApp();
    return (<div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {role === "admin" ? <Shield size={14}/> : <Eye size={14}/>}
        <span className="hidden sm:inline">Role:</span>
      </div>
      <Select value={role} onValueChange={(v) => setRole(v)}>
        <SelectTrigger className="w-[110px] h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>);
};
