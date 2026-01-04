import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Trash2,
  Space,
  WrapText,
  ListX,
  Scissors,
  RemoveFormatting,
  FileText,
  Sparkles,
  Type,
  Hash
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const TextCleaner = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const cleaners = [
    {
      name: "Remove Extra Spaces",
      icon: Space,
      description: "Collapse multiple spaces into one",
      transform: (t: string) => t.replace(/[ \t]+/g, " ").trim(),
    },
    {
      name: "Remove Line Breaks",
      icon: WrapText,
      description: "Convert all line breaks to spaces",
      transform: (t: string) => t.replace(/[\r\n]+/g, " ").trim(),
    },
    {
      name: "Remove Duplicate Lines",
      icon: ListX,
      description: "Keep only unique lines",
      transform: (t: string) => {
        const lines = t.split(/\r?\n/);
        const uniqueLines = [...new Set(lines)];
        return uniqueLines.join("\n");
      },
    },
    {
      name: "Trim Whitespace",
      icon: Scissors,
      description: "Remove leading/trailing spaces from each line",
      transform: (t: string) => {
        return t.split(/\r?\n/).map(line => line.trim()).join("\n");
      },
    },
    {
      name: "Remove Empty Lines",
      icon: RemoveFormatting,
      description: "Delete all blank lines",
      transform: (t: string) => {
        return t.split(/\r?\n/).filter(line => line.trim() !== "").join("\n");
      },
    },
    {
      name: "Normalize Text",
      icon: Sparkles,
      description: "Fix smart quotes, dashes, and special characters",
      transform: (t: string) => {
        return t
          // Smart quotes to regular quotes
          .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
          .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
          // Various dashes to regular hyphen
          .replace(/[\u2013\u2014\u2015]/g, "-")
          // Ellipsis
          .replace(/\u2026/g, "...")
          // Non-breaking spaces
          .replace(/\u00A0/g, " ")
          // Other common special characters
          .replace(/\u2022/g, "*") // bullet
          .replace(/\u00B7/g, "*") // middle dot
          .replace(/\u2019/g, "'") // right single quotation
          .trim();
      },
    },
    {
      name: "Clean PDF Text",
      icon: FileText,
      description: "All-in-one: fix spacing, hyphenation, line breaks",
      transform: (t: string) => {
        return t
          // Fix hyphenated words split across lines
          .replace(/-\s*\n\s*/g, "")
          // Replace single line breaks (not paragraphs) with spaces
          .replace(/(?<!\n)\n(?!\n)/g, " ")
          // Collapse multiple spaces
          .replace(/[ \t]+/g, " ")
          // Normalize special characters
          .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
          .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
          .replace(/[\u2013\u2014\u2015]/g, "-")
          .replace(/\u2026/g, "...")
          .replace(/\u00A0/g, " ")
          // Clean up paragraph spacing
          .replace(/\n{3,}/g, "\n\n")
          .trim();
      },
    },
  ];

  const stats = useMemo(() => {
    const charCount = result.length;
    const wordCount = result.trim() === "" ? 0 : result.trim().split(/\s+/).length;
    const lineCount = result.trim() === "" ? 0 : result.split(/\n/).filter(l => l.trim()).length;
    const originalCharCount = text.length;
    const saved = originalCharCount - charCount;
    return { charCount, wordCount, lineCount, saved };
  }, [text, result]);

  const applyClean = (transform: (t: string) => string) => {
    if (!text.trim()) {
      toast.error("Please enter some text first");
      return;
    }
    const cleaned = transform(text);
    setResult(cleaned);
    const saved = text.length - cleaned.length;
    if (saved > 0) {
      toast.success(`Cleaned! Removed ${saved} characters`);
    } else {
      toast.success("Text cleaned successfully");
    }
  };

  const copyToClipboard = () => {
    if (!result) {
      toast.error("Nothing to copy");
      return;
    }
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  const clear = () => {
    setText("");
    setResult("");
    toast.success("Cleared");
  };

  const useResult = () => {
    if (!result) {
      toast.error("No result to use");
      return;
    }
    setText(result);
    setResult("");
    toast.success("Result moved to input - apply more cleaners!");
  };

  return (
    <>
      <Helmet>
        <title>Text Cleaner - Remove Spaces, Line Breaks & Duplicates | CaseConvert</title>
        <meta
          name="description"
          content="Free online text cleaner. Remove extra spaces, line breaks, duplicate lines, and clean messy text from PDFs, Word documents, WhatsApp, and ChatGPT. Fast and private."
        />
        <meta
          name="keywords"
          content="text cleaner, remove extra spaces, remove line breaks, remove duplicate lines, clean pdf text, normalize text, trim whitespace, text cleanup tool"
        />
        <link rel="canonical" href="https://caseconvert.online/text-cleaner" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Text <span className="text-gradient">Cleaner</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Clean up messy text from PDFs, Word documents, WhatsApp, and ChatGPT.
                Remove extra spaces, line breaks, duplicate lines, and more.
              </p>
            </div>

            {/* Input Card */}
            <Card className="glass shadow-card p-6 mb-6 animate-fade-in-delay-1">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-foreground">Paste Your Text</label>
                <span className="text-xs text-muted-foreground">{text.length} characters</span>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text from PDF, Word, WhatsApp, ChatGPT, or any source..."
                className="min-h-[150px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </Card>

            {/* Cleaner Buttons */}
            <div className="glass rounded-xl p-4 shadow-card mb-6 animate-fade-in-delay-2">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Choose a cleaning action:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {cleaners.map((cleaner) => (
                  <Button
                    key={cleaner.name}
                    variant="converter"
                    size="converter"
                    onClick={() => applyClean(cleaner.transform)}
                    className="text-xs h-auto py-3 flex-col gap-1"
                    title={cleaner.description}
                  >
                    <cleaner.icon className="w-4 h-4" />
                    <span>{cleaner.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Result Card */}
            <Card className="glass shadow-card p-6 animate-fade-in-delay-3">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-foreground">Cleaned Result</label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={useResult}
                    className="text-xs h-8"
                    title="Move result to input for more cleaning"
                  >
                    Use as Input
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clear}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={result}
                readOnly
                placeholder="Cleaned text will appear here..."
                className="min-h-[150px] font-mono text-sm bg-background/50 border-border/50 resize-none"
              />
            </Card>

            {/* Stats Bar */}
            {result && (
              <div className="glass rounded-xl p-4 shadow-card mt-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Type className="w-4 h-4 text-primary" />
                    <span>{stats.charCount} Characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="w-4 h-4 text-primary" />
                    <span>{stats.wordCount} Words</span>
                  </div>
                  {stats.saved > 0 && (
                    <div className="flex items-center gap-2 text-green-500">
                      <Sparkles className="w-4 h-4" />
                      <span>{stats.saved} chars removed</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12 animate-fade-in-delay-3">
              {/* What is Text Cleaner */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  What is a <span className="text-gradient">Text Cleaner</span>?
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    A <strong>text cleaner</strong> is an online tool that removes unwanted formatting, extra spaces,
                    duplicate lines, and special characters from your text. Whether you've copied text from a
                    <strong> PDF</strong>, <strong>Word document</strong>, <strong>WhatsApp</strong>, or
                    <strong> ChatGPT</strong>, our text cleaner fixes common formatting issues instantly.
                  </p>
                  <p>
                    Common problems include broken words split across lines, multiple spaces, smart quotes that
                    don't display correctly, and unwanted line breaks. Our <strong>Clean PDF Text</strong> feature
                    handles all of these issues in one click.
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-2xl font-bold text-center mb-8">
                  Common <span className="text-gradient">Use Cases</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "📄 PDF Text", desc: "Fix broken words and weird spacing from PDF copies" },
                    { title: "💬 WhatsApp", desc: "Clean forwarded messages with extra line breaks" },
                    { title: "📝 Word Docs", desc: "Normalize smart quotes and special characters" },
                    { title: "🤖 ChatGPT", desc: "Remove duplicate content and clean AI outputs" },
                  ].map((useCase) => (
                    <Card key={useCase.title} className="glass shadow-card p-4">
                      <h3 className="font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TextCleaner;
