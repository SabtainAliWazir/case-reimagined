import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Type, ChevronDown, Menu, X, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
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
    category: "Case Converters",
    links: [
      { href: "/", label: "All-in-One Case Converter" },
      { href: "/camelcase-to-snake-case", label: "camelCase to snake_case" },
      { href: "/snake-case-to-camelcase", label: "snake_case to camelCase" },
      { href: "/pascalcase-to-camelcase", label: "PascalCase to camelCase" },
      { href: "/kebab-case-to-camelcase", label: "kebab-case to camelCase" },
      { href: "/uppercase-converter", label: "UPPERCASE (ALL CAPS)" },
      { href: "/lowercase-converter", label: "lowercase (small letters)" },
      { href: "/title-case-converter", label: "Title Case (Headlines)" },
      { href: "/sentence-case-converter", label: "Sentence case" },
      { href: "/capitalized-case-converter", label: "Capitalized Case" },
      { href: "/camelcase-converter", label: "camelCase" },
      { href: "/kebab-case-converter", label: "kebab-case" },
      { href: "/pascal-case-converter", label: "PascalCase" },
      { href: "/alternating-case-converter", label: "aLtErNaTiNg cAsE" },
      { href: "/reverse-text-generator", label: "Reverse Text (esreveR)" },
    ]
  },
  {
    category: "Text & Dev",
    links: [
      { href: "/slug-generator", label: "SEO Slug Generator" },
      { href: "/small-text-generator", label: "Small Text (Tiny Font)" },
      { href: "/binary-to-hex", label: "Binary to Hex Converter" },
      { href: "/binary-to-morse-code", label: "Binary to Morse (Audio)" },
      { href: "/base64-to-hex", label: "Base64 to Hex Converter" },
      { href: "/word-frequency-counter", label: "Word Frequency Counter" },
      { href: "/text-diff-checker", label: "Text Diff Checker" },
      { href: "/caesar-cipher", label: "Caesar Cipher (ROT13)" },
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

  return (
    <header className="w-full pt-4 pb-2 px-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-card/90 backdrop-blur-md border border-border shadow-card rounded-full px-5 py-2.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <Type className="w-4 h-4" />
          </div>
          <span className="text-lg font-heading font-bold tracking-tight text-foreground">
            Case<span className="text-primary font-serif italic text-xl font-normal ml-0.5">Convert</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navCategories.map((category) => (
            <DropdownMenu key={category.category}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full gap-1 text-muted-foreground hover:text-foreground font-medium text-xs md:text-sm px-3.5 h-8">
                  {category.category}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-card/95 backdrop-blur-xl border-border rounded-2xl p-2 shadow-card-hover">
                {category.isNested ? (
                  <>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer mb-2">
                      <Link to="/calculators" className="w-full font-bold text-primary px-3 py-2">
                        ★ All Calculators Hub ★
                      </Link>
                    </DropdownMenuItem>
                    {Object.entries(category.subCategories || {}).map(([subCatName, tools]) => (
                      <DropdownMenuSub key={subCatName}>
                        <DropdownMenuSubTrigger className="rounded-xl cursor-pointer px-3 py-2 text-xs font-medium hover:bg-muted transition-colors">
                          {subCatName}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-64 bg-card/95 backdrop-blur-xl border-border rounded-2xl p-2 shadow-card-hover max-h-[80vh] overflow-y-auto">
                            {tools.map(tool => (
                              <DropdownMenuItem key={tool.href} asChild className="rounded-xl cursor-pointer">
                                <Link
                                  to={tool.href}
                                  className={`w-full px-3 py-1.5 text-xs transition-colors ${
                                    location.pathname === tool.href 
                                      ? "bg-primary/10 text-primary font-semibold" 
                                      : "hover:bg-muted"
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
                        className={`w-full flex items-center px-3 py-2 text-xs transition-colors ${
                          location.pathname === link.href 
                            ? "bg-primary/10 text-primary font-semibold" 
                            : "hover:bg-muted"
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

          {/* Direct Blog Link */}
          <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground font-medium text-xs md:text-sm px-3.5 h-8" asChild>
            <Link to="/blog">Blog</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden mt-3 pb-4 border border-border pt-4 bg-card/95 backdrop-blur-xl rounded-2xl shadow-card px-4 mx-2 max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-5 py-2">
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-sm"
            >
              <BookOpen className="w-4 h-4" /> Read Blog & Guides
            </Link>

            {navCategories.map((category) => (
              <div key={category.category} className="space-y-1.5">
                <h3 className="font-mono text-[11px] font-bold text-muted-foreground tracking-wider uppercase px-2">{category.category}</h3>
                
                {category.isNested ? (
                  <div className="flex flex-col gap-2 pl-2 border-l border-border ml-2">
                    <Link
                      to="/calculators"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 text-xs rounded-lg font-bold text-primary bg-primary/5"
                    >
                      ★ All Calculators Hub ★
                    </Link>
                    {Object.entries(category.subCategories || {}).map(([subCatName, tools]) => (
                      <div key={subCatName} className="space-y-1">
                        <div className="text-[10px] font-semibold text-muted-foreground px-3 pt-1 uppercase">{subCatName}</div>
                        {tools.map(tool => (
                          <Link
                            key={tool.href}
                            to={tool.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-1.5 text-xs rounded-lg transition-colors ${
                              location.pathname === tool.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {tool.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          location.pathname === link.href
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
