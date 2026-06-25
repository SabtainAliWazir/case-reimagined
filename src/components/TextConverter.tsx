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
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in relative z-10">
      
      {/* Abstract Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Glass Card */}
      <div className="bg-card/60 backdrop-blur-2xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-3 md:p-6 transition-all duration-500 hover:shadow-glow">
        
        {/* Text Area */}
        <div className="relative group mb-6">
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your content here..."
            className="w-full h-64 md:h-80 p-6 md:p-8 rounded-2xl bg-card dark:bg-black/40 border border-border shadow-sm font-sans text-lg resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 placeholder:text-muted-foreground/50"
            aria-label="Text input for case conversion"
          />
        </div>

        {/* Conversion Buttons */}
        <div className="mb-8 px-2 md:px-6">
          <div className="flex flex-wrap gap-3 justify-center">
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
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm py-6 border-t border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Type className="w-4 h-4 text-primary" />
            <span className="font-medium">{stats.charCount} Characters</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Hash className="w-4 h-4 text-primary" />
            <span className="font-medium">{stats.wordCount} Words</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUpDown className="w-4 h-4 text-primary" />
            <span className="font-medium">{stats.sentenceCount} Sentences</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Minus className="w-4 h-4 text-primary" />
            <span className="font-medium">{stats.lineCount} Lines</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center animate-fade-in-delay-3 pt-4">
        <Button variant="action" size="lg" onClick={handleCopy} className="gap-2 px-8">
          <Copy className="w-5 h-5" />
          Copy to Clipboard
        </Button>
        <Button variant="action" size="lg" onClick={handleDownload} className="gap-2 px-8">
          <Download className="w-5 h-5" />
          Download Text
        </Button>
        <Button variant="action" size="lg" onClick={handleClear} className="gap-2 px-8 hover:border-destructive/50 hover:text-destructive">
          <Trash2 className="w-5 h-5" />
          Clear
        </Button>
      </div>
    </div>
  );
};
