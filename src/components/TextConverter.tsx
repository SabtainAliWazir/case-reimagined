import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Copy, 
  Download, 
  Trash2, 
  Type,
  ArrowUpDown,
  Hash,
  Minus,
  Sparkles
} from "lucide-react";

export type ConversionType = 
  | "sentence" 
  | "lower" 
  | "upper" 
  | "capitalized" 
  | "alternating" 
  | "title" 
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "inverse"
  | "reverse"
  | "slug";

export interface ConversionOption {
  id: ConversionType;
  label: string;
  description: string;
  transform: (text: string) => string;
}

export const conversions: ConversionOption[] = [
  {
    id: "sentence",
    label: "Sentence case",
    description: "Capitalize the first letter of each sentence",
    transform: (text) => {
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    },
  },
  {
    id: "lower",
    label: "lower case",
    description: "Convert all letters to lowercase",
    transform: (text) => text.toLowerCase(),
  },
  {
    id: "upper",
    label: "UPPER CASE",
    description: "Convert all letters to uppercase",
    transform: (text) => text.toUpperCase(),
  },
  {
    id: "capitalized",
    label: "Capitalized Case",
    description: "Capitalize the first letter of every word",
    transform: (text) => {
      return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    },
  },
  {
    id: "title",
    label: "Title Case",
    description: "Capitalize major words according to headline rules",
    transform: (text) => {
      const minorWords = ["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "so", "the", "to", "up", "yet"];
      return text.toLowerCase().split(" ").map((word, index) => {
        if (index === 0 || !minorWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      }).join(" ");
    },
  },
  {
    id: "camel",
    label: "camelCase",
    description: "Convert text to camelCase format",
    transform: (text) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (c) => c.toLowerCase());
    },
  },
  {
    id: "pascal",
    label: "PascalCase",
    description: "Convert text to PascalCase format",
    transform: (text) => {
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[a-z]/, (c) => c.toUpperCase());
    },
  },
  {
    id: "snake",
    label: "snake_case",
    description: "Convert text to snake_case format with underscores",
    transform: (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    },
  },
  {
    id: "kebab",
    label: "kebab-case",
    description: "Convert text to kebab-case format with dashes",
    transform: (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  {
    id: "alternating",
    label: "aLtErNaTiNg cAsE",
    description: "Alternate between lowercase and uppercase",
    transform: (text) => {
      return text.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("");
    },
  },
  {
    id: "inverse",
    label: "InVeRsE cAsE",
    description: "Swap uppercase and lowercase characters",
    transform: (text) => {
      return text.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
    },
  },
  {
    id: "reverse",
    label: "esreveR",
    description: "Reverse the text characters",
    transform: (text) => text.split("").reverse().join(""),
  },
  {
    id: "slug",
    label: "slug-case",
    description: "Convert to URL-friendly web slug",
    transform: (text) => {
      return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    },
  },
];

interface TextConverterProps {
  defaultMode?: ConversionType;
  initialPlaceholder?: string;
}

export const TextConverter = ({ defaultMode, initialPlaceholder }: TextConverterProps) => {
  const [text, setText] = useState("");
  const [activeConversion, setActiveConversion] = useState<ConversionType | null>(defaultMode || null);

  const stats = useMemo(() => {
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, "").length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentenceCount = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) || []).length || (text.trim().length > 0 ? 1 : 0);
    const lineCount = text.trim() === "" ? 0 : text.split(/\n/).filter(l => l.trim()).length;
    return { charCount, charNoSpaces, wordCount, sentenceCount, lineCount };
  }, [text]);

  const handleConversion = (type: ConversionType) => {
    const conversion = conversions.find((c) => c.id === type);
    if (conversion && text) {
      setText(conversion.transform(text));
      setActiveConversion(type);
      toast.success(`Converted to ${conversion.label}`);
    }
  };

  const handleCopy = async () => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    if (!text) {
      toast.error("Nothing to download");
      return;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  const handleClear = () => {
    setText("");
    setActiveConversion(null);
    toast.success("Cleared");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10">
      
      {/* Motionix Workspace Window Container */}
      <div className="bg-[#f5f1ea] dark:bg-[#1a1511] p-2.5 md:p-3.5 rounded-[1.75rem] border border-[#e9e4de] dark:border-border/60 shadow-card">
        
        {/* Workspace Topbar */}
        <div className="flex items-center justify-between px-3 py-2 mb-2 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span>browser-first execution</span>
          </div>
          <span className="text-[10px] tracking-wider uppercase opacity-70">zero upload required</span>
        </div>

        {/* Inner Canvas Card */}
        <div className="bg-card rounded-[1.25rem] p-4 md:p-6 border border-border/80 shadow-sm">
          {/* Text Area */}
          <div className="relative group mb-5">
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={initialPlaceholder || "Type or paste your content here..."}
              className="w-full h-56 md:h-72 p-5 rounded-xl bg-background border border-border/80 shadow-inner font-sans text-base md:text-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-muted-foreground/50 leading-relaxed"
              aria-label="Text input for case conversion"
            />
          </div>

          {/* Conversion Mode Pills */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {conversions.map((conversion) => (
                <Button
                  key={conversion.id}
                  variant={activeConversion === conversion.id ? "converterActive" : "converter"}
                  size="converter"
                  onClick={() => handleConversion(conversion.id)}
                  title={conversion.description}
                >
                  {conversion.label}
                </Button>
              ))}
            </div>
          </div>

          {/* JetBrains Mono Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-xs text-muted-foreground py-4 border-t border-border/60">
            <div className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-primary" />
              <span className="tabular-nums font-medium">{stats.charCount}</span> Characters
            </div>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-primary" />
              <span className="tabular-nums font-medium">{stats.wordCount}</span> Words
            </div>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
              <span className="tabular-nums font-medium">{stats.sentenceCount}</span> Sentences
            </div>
            <span className="opacity-30">•</span>
            <div className="flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-primary" />
              <span className="tabular-nums font-medium">{stats.lineCount}</span> Lines
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <Button variant="action" size="default" onClick={handleCopy} className="gap-2 px-6">
          <Copy className="w-4 h-4" />
          Copy Output
        </Button>
        <Button variant="action" size="default" onClick={handleDownload} className="gap-2 px-6">
          <Download className="w-4 h-4" />
          Download TXT
        </Button>
        <Button variant="action" size="default" onClick={handleClear} className="gap-2 px-6 hover:border-destructive/40 hover:text-destructive">
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
