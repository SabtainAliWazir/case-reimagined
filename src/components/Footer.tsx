import { Type, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const caseConverters = [
    { href: "/uppercase-converter", label: "Uppercase (ALL CAPS)" },
    { href: "/lowercase-converter", label: "Lowercase Converter" },
    { href: "/title-case-converter", label: "Title Case (Headlines)" },
    { href: "/sentence-case-converter", label: "Sentence Case" },
    { href: "/capitalized-case-converter", label: "Capitalized Case" },
    { href: "/camelcase-converter", label: "camelCase Converter" },
    { href: "/kebab-case-converter", label: "kebab-case Converter" },
    { href: "/camelcase-to-snake-case", label: "camelCase to snake_case" },
    { href: "/snake-case-to-camelcase", label: "snake_case to camelCase" },
    { href: "/pascalcase-to-camelcase", label: "PascalCase to camelCase" },
    { href: "/kebab-case-to-camelcase", label: "kebab-case to camelCase" },
    { href: "/pascal-case-converter", label: "PascalCase Converter" },
    { href: "/alternating-case-converter", label: "Alternating Meme Text" },
    { href: "/reverse-text-generator", label: "Reverse Text (esreveR)" },
  ];

  const devAndTextTools = [
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
  ];

  const sections = [
    { href: "/", label: "Case Converter" },
    { href: "/blog", label: "Blog & Guides" },
    { href: "/calculators", label: "Financial Calculators Hub" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact & Support" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="py-14 px-4 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Type className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Case<span className="text-primary font-serif italic text-xl font-normal ml-0.5">Convert</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Browser-first text conversions, cryptographic hashing, and financial calculations. 100% private. Files never leave your device.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-medium">
              <Link to="/blog" className="hover:text-primary text-primary">Browse Blog & Guides →</Link>
              <Link to="/about" className="hover:text-foreground">About CaseConvert</Link>
              <Link to="/contact" className="hover:text-foreground">Contact & Support</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            </div>
          </div>

          {/* Case Converters Column */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">Case Converters</h3>
            <nav className="flex flex-col gap-1.5">
              {caseConverters.slice(0, 10).map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Developer & Text Tools */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">Text & Dev</h3>
            <nav className="flex flex-col gap-1.5">
              {devAndTextTools.slice(0, 10).map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Hubs & Calculators */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider mb-3 text-foreground">Explore</h3>
            <nav className="flex flex-col gap-1.5">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  to={section.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <p>© {currentYear} CaseConvert. Browser-first privacy toolkit.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted for developers & writers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
