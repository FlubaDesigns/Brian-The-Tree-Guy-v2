import { useLocation } from "wouter";
import { Phone, Trees, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [, navigate] = useLocation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-dark" data-testid="footer">
      <div className="section-content">
        <div className="footer-centered">
          <Button
            variant="outline"
            onClick={scrollToTop}
            className="back-to-top-btn"
            data-testid="button-back-to-top"
          >
            <ArrowUp className="icon-sm" />
            Back to Top
          </Button>
          <div className="footer-logo">
            <Trees className="icon-xl icon-primary" />
            <span className="footer-title" data-testid="text-footer-title">
              Brian The Tree Guy
            </span>
          </div>

          <a
            href="tel:941-445-2234"
            className="footer-phone"
            data-testid="link-footer-phone"
          >
            <Phone className="icon-md" />
            941-445-2234
          </a>

          <nav className="footer-nav" data-testid="nav-footer">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="footer-nav-link"
                data-testid={`link-footer-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="footer-divider">
            <p className="footer-copyright" data-testid="text-copyright">
              © {currentYear} Brian The Tree Guy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
