import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
export const ThemeToggle = ({ theme, onToggle }) => {
    return (<Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 relative">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (<motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun size={16}/>
          </motion.div>) : (<motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon size={16}/>
          </motion.div>)}
      </AnimatePresence>
    </Button>);
};
