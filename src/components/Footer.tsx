import { Type, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const tools = [
    { href: "/", label: "Case Converter" },
    { href: "/word-counter", label: "Word Counter" },
    { href: "/text-formatter", label: "Text Formatter" },
    { href: "/binary-translator", label: "Binary Translator" },
    { href: "/morse-translator", label: "Morse Translator" },
  ];

  const sections = [
    { href: "/#converter", label: "Converter" },
    { href: "/#features", label: "Features" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Type className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold">
                Case<span className="text-primary">Convert</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online text tools.  Case Convert, count words, translate to binary and morse code.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Tools</h3>
            <nav className="flex flex-col gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tool.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sectionsa */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Sections</h3>
            <nav className="flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section.href}
                  href={section.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">About</h3>
            <p className="text-sm text-muted-foreground">
             CaseConvert is a free, privacy-focused text utility. All processing happens in your browser - no data is sent to servers.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} CaseConvert. Free online text case converter tool.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-destructive fill-destructive" />
            <span>for text lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
