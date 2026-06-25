import { Type, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Case Converter" },
  { href: "/word-counter", label: "Word Counter" },
  { href: "/text-formatter", label: "Formatter" },
  { href: "/text-cleaner", label: "Cleaner" },
  { href: "/json-formatter", label: "JSON" },
  { href: "/password-generator", label: "Password" },
  { href: "/lorem-ipsum", label: "Lorem" },
];

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full pt-6 pb-2 px-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-lg rounded-full px-6 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Type className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight">
            Case<span className="text-primary">Convert</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 font-medium ${location.pathname === link.href
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm rounded-lg transition-colors ${location.pathname === link.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
