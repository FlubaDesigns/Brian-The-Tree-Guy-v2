import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="theme-toggle-container" data-testid="theme-toggle">
          <Sun className="theme-toggle-icon" />
          <Switch
            checked={isDark}
            onCheckedChange={toggleTheme}
            aria-label="Toggle dark mode"
            data-testid="switch-theme-toggle"
          />
          <Moon className="theme-toggle-icon" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch between light and dark mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
