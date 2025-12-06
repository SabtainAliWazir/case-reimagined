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
  Minus
} from "lucide-react";

type ConversionType = 
  | "sentence" 
  | "lower" 
  | "upper" 
  | "capitalized" 
  | "alternating" 
  | "title" 
  | "inverse"
  | "reverse"
  | "slug";

interface ConversionOption {
  id: ConversionType;
  label: string;
  description: string;
  transform: (text: string) => string;
}

const conversions: ConversionOption[] = [
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
    id: "alternating",
    label: "aLtErNaTiNg cAsE",
    description: "Alternate between lowercase and uppercase",
    transform: (text) => {
      return text.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join("");
    },
  },
  {
    id: "title",
    label: "Title Case",
    description: "Capitalize major words",
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
    id: "inverse",
    label: "InVeRsE cAsE",
    description: "Swap uppercase and lowercase",
    transform: (text) => {
      return text.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
    },
  },
  {
    id: "reverse",
    label: "esreveR",
    description: "Reverse the text",
    transform: (text) => text.split("").reverse().join(""),
  },
  {
    id: "slug",
    label: "slug-case",
    description: "Convert to URL-friendly slug",
    transform: (text) => {
      return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    },
  },
];

export const TextConverter = () => {
  const [text, setText] = useState("");
  const [activeConversion, setActiveConversion] = useState<ConversionType | null>(null);

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
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Text Area */}
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your content here..."
          className="w-full h-64 p-6 rounded-xl bg-card border border-border shadow-card font-mono text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 placeholder:text-muted-foreground/50"
          aria-label="Text input for case conversion"
        />
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-muted-foreground">
            {stats.charCount} characters
          </span>
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="glass rounded-xl p-4 shadow-card animate-fade-in-delay-1">
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

      {/* Stats Bar */}
      <div className="glass rounded-xl p-4 shadow-card animate-fade-in-delay-2">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Type className="w-4 h-4 text-primary" />
            <span>{stats.charCount} Characters</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-4 h-4 text-primary" />
            <span>{stats.wordCount} Words</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUpDown className="w-4 h-4 text-primary" />
            <span>{stats.sentenceCount} Sentences</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Minus className="w-4 h-4 text-primary" />
            <span>{stats.lineCount} Lines</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center animate-fade-in-delay-3">
        <Button variant="action" onClick={handleCopy} className="gap-2">
          <Copy className="w-4 h-4" />
          Copy to Clipboard
        </Button>
        <Button variant="action" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download Text
        </Button>
        <Button variant="action" onClick={handleClear} className="gap-2 hover:border-destructive/50 hover:text-destructive">
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
