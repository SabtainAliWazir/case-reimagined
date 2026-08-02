import { Type, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "./ui/dropdown-menu";
import { allCalculators } from "@/pages/CalculatorsIndex";

// Group calculators by category
const financialCategories = allCalculators.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = [];
  }
  acc[curr.category].push(curr);
  return acc;
}, {} as Record<string, typeof allCalculators>);

const navCategories = [
  {
    category: "Text & Dev",
    links: [
      { href: "/", label: "Case Converter" },
      { href: "/word-counter", label: "Word Counter" },
      { href: "/text-formatter", label: "Text Formatter" },
      { href: "/text-cleaner", label: "Text Cleaner" },
      { href: "/json-formatter", label: "JSON Formatter" },
      { href: "/base64", label: "Base64 Encoder" },
      { href: "/url-encoder", label: "URL Encoder" },
      { href: "/hash-generator", label: "Hash Generator" },
      { href: "/password-generator", label: "Password Generator" },
      { href: "/lorem-ipsum", label: "Lorem Ipsum" },
      { href: "/binary-translator", label: "Binary Translator" },
      { href: "/morse-translator", label: "Morse Translator" },
      { href: "/epoch-converter", label: "Epoch Converter" },
    ]
  },
  {
    category: "File Tools",
    links: [
      { href: "/zip-creator", label: "ZIP Creator" },
      { href: "/zip-extractor", label: "ZIP Extractor" },
      { href: "/image-converter", label: "Image Converter" },
    ]
  },
  {
    category: "Financial",
    isNested: true,
    links: [
      { href: "/calculators", label: "★ All Calculators Hub ★" }
    ],
    subCategories: financialCategories
  }
];

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

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
        <nav className="hidden lg:flex items-center gap-2">
          {navCategories.map((category) => (
            <DropdownMenu key={category.category}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full gap-1 text-muted-foreground hover:text-foreground font-medium">
                  {category.category}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background/95 backdrop-blur-xl border-white/20 rounded-2xl p-2 shadow-xl">
                {category.isNested ? (
                  <>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer mb-2">
                      <Link to="/calculators" className="w-full font-bold text-primary px-3 py-2.5">
                        ★ All Calculators Hub ★
                      </Link>
                    </DropdownMenuItem>
                    {Object.entries(category.subCategories || {}).map(([subCatName, tools]) => (
                      <DropdownMenuSub key={subCatName}>
                        <DropdownMenuSubTrigger className="rounded-xl cursor-pointer px-3 py-2.5 hover:bg-accent/50 transition-colors">
                          {subCatName}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-64 bg-background/95 backdrop-blur-xl border-white/20 rounded-2xl p-2 shadow-xl max-h-[80vh] overflow-y-auto">
                            {tools.map(tool => (
                              <DropdownMenuItem key={tool.href} asChild className="rounded-xl cursor-pointer">
                                <Link
                                  to={tool.href}
                                  className={`w-full px-3 py-2 transition-colors ${
                                    location.pathname === tool.href 
                                      ? "bg-primary/10 text-primary font-semibold" 
                                      : "hover:bg-accent/50"
                                  }`}
                                >
                                  {tool.title}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                  </>
                ) : (
                  category.links.map(link => (
                    <DropdownMenuItem key={link.href} asChild className="rounded-xl cursor-pointer">
                      <Link
                        to={link.href}
                        className={`w-full flex items-center px-3 py-2.5 transition-colors ${
                          location.pathname === link.href 
                            ? "bg-primary/10 text-primary font-semibold" 
                            : "hover:bg-accent/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
        <nav className="lg:hidden mt-4 pb-4 border-t border-border/50 pt-4 bg-background/95 backdrop-blur-xl rounded-2xl shadow-xl px-4 mx-2 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-6 py-4">
            {navCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <h3 className="font-heading font-bold text-sm text-primary tracking-wider uppercase px-2">{category.category}</h3>
                
                {category.isNested ? (
                  <div className="flex flex-col gap-3 pl-2 border-l-2 border-border/50 ml-2">
                    <Link
                      to="/calculators"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-sm rounded-xl font-bold text-primary bg-primary/5"
                    >
                      ★ All Calculators Hub ★
                    </Link>
                    {Object.entries(category.subCategories || {}).map(([subCatName, tools]) => (
                      <div key={subCatName} className="space-y-1">
                        <div className="text-xs font-semibold text-muted-foreground px-4 py-1 uppercase">{subCatName}</div>
                        {tools.map(tool => (
                          <Link
                            key={tool.href}
                            to={tool.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-2 text-sm rounded-xl transition-colors ${
                              location.pathname === tool.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            }`}
                          >
                            {tool.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 text-sm rounded-xl transition-colors ${
                          location.pathname === link.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
