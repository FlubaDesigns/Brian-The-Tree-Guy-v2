import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Settings, Sun, Moon, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FontSize = "small" | "medium" | "large";

function SettingsPanel() {
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  useEffect(() => {
    // Load saved theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
    // Load saved font size
    const storedFontSize = localStorage.getItem("fontSize") as FontSize;
    if (storedFontSize) {
      setFontSize(storedFontSize);
      document.documentElement.setAttribute("data-font-size", storedFontSize);
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

  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
    document.documentElement.setAttribute("data-font-size", size);
    localStorage.setItem("fontSize", size);
  };

  return (
    <div className="settings-panel">
      <DropdownMenuLabel className="settings-header">
        <Settings className="icon-sm" />
        <span>Accessibility Settings</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {/* Light/Dark Mode */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="settings-item" data-testid="settings-theme-row">
            <div className="settings-item-label">
              <Sun className="settings-icon settings-icon-sun" />
              <span className="settings-label">Light / Dark</span>
              <Moon className="settings-icon settings-icon-moon" />
            </div>
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
              data-testid="switch-theme-toggle"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Switch between light and dark mode for easier viewing</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuSeparator />

      {/* Font Size */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="settings-item settings-item-font" data-testid="settings-font-row">
            <div className="settings-item-label">
              <Type className="settings-icon settings-icon-type" />
              <span className="settings-label">Font Size</span>
            </div>
            <div className="font-size-buttons">
              <button
                onClick={() => changeFontSize("small")}
                className={`font-size-btn font-size-small ${fontSize === "small" ? "active" : ""}`}
                aria-label="Small font size"
                data-testid="button-font-small"
              >
                A
              </button>
              <button
                onClick={() => changeFontSize("medium")}
                className={`font-size-btn font-size-medium ${fontSize === "medium" ? "active" : ""}`}
                aria-label="Medium font size"
                data-testid="button-font-medium"
              >
                A
              </button>
              <button
                onClick={() => changeFontSize("large")}
                className={`font-size-btn font-size-large ${fontSize === "large" ? "active" : ""}`}
                aria-label="Large font size"
                data-testid="button-font-large"
              >
                A
              </button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Adjust text size for easier reading</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header
      className={`header ${isScrolled ? "header-scrolled" : "header-transparent"}`}
      data-testid="header"
    >
      <div className="header-inner">
        <div className="header-content">
          <Link href="/" className="header-logo" data-testid="link-logo">
            <div className="logo-container">
              <div className="logo-text">
                <span className="logo-title">Brian The Tree Guy</span>
                <span className="logo-tagline">Professional Tree Services</span>
              </div>
              <img
                src="/images/brianthetreeguy_logo_60h_tr.png"
                alt="Brian The Tree Guy Logo"
                className="logo-tree"
              />
            </div>
          </Link>

          <nav className="nav-desktop" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="nav-desktop">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="settings-gear-btn"
                  aria-label="Settings"
                  data-testid="button-settings-desktop"
                >
                  <Settings className="icon-md text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="settings-dropdown">
                <SettingsPanel />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="nav-mobile-toggle">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="settings-gear-btn"
                  aria-label="Settings"
                  data-testid="button-settings-mobile"
                >
                  <Settings className="icon-md text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="settings-dropdown">
                <SettingsPanel />
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              data-testid="button-menu-toggle"
            >
              {isMenuOpen ? <X className="icon-lg" /> : <Menu className="icon-lg" />}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`nav-mobile-menu ${isMenuOpen ? "open" : "closed"}`}
        data-testid="nav-mobile"
      >
        <nav className="nav-mobile-inner bg-card-color">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                onClick={() => setIsMenuOpen(false)}
                className={`nav-mobile-link ${isActive(item.href) ? "active" : ""}`}
                data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <a
            href="tel:941-445-2234"
            className="phone-link nav-mobile-link"
            data-testid="link-phone-mobile-menu"
          >
            <Phone className="icon-md" />
            <span>Call Now: 941-445-2234</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
