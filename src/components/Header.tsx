import { Type } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-glow">
            <Type className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Convert<span className="text-primary">Case</span>
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#converter" className="hover:text-foreground transition-colors">Converter</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
      </div>
    </header>
  );
};
