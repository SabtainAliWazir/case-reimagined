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
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";

const faqs = [
  {
    question: "How do I remove extra spaces and empty lines from text?",
    answer: "Paste your text into the Text Cleaner box and click 'Remove Extra Spaces' or 'Remove Empty Lines'. Our tool instantly collapses consecutive spaces and removes unnecessary whitespace."
  },
  {
    question: "Can I fix text copied from a PDF with broken line breaks?",
    answer: "Yes! Use the 'Clean PDF Text' or 'Remove Line Breaks' button. It reconnects sentences broken across multiple lines and removes hyphenated line wraps."
  },
  {
    question: "How do I remove duplicate lines from a list?",
    answer: "Click the 'Remove Duplicate Lines' button. The cleaner scans your input line-by-line, eliminates identical repeated entries, and returns a unique, deduplicated list."
  },
  {
    question: "Is my text private and secure when using this tool?",
    answer: "Yes. All text cleaning operations execute client-side inside your browser via JavaScript. Your text is never transmitted, logged, or saved to any external server."
  }
];

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

        {/* Social Media Meta Tags */}
        <meta property="og:title" content="Text Cleaner - Remove Spaces & Duplicate Lines | CaseConvert" />
        <meta property="og:description" content="Clean your text instantly. Remove extra spaces, line breaks, and duplicate lines for cleaner documents and code." />
        <meta property="og:url" content="https://caseconvert.online/text-cleaner" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Text Cleaner - Remove Spaces & Duplicate Lines | CaseConvert" />
        <meta name="twitter:description" content="Instant text cleanup tool to remove formatting, spaces, and duplicate lines." />

        {/* Text Cleaner Specific Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Online Text Cleaner Tool",
            "description": "Clean messy text by removing extra spaces, line breaks, and duplicates instantly.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://caseconvert.online/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Text Cleaner",
                "item": "https://caseconvert.online/text-cleaner"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
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
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 mb-6 animate-fade-in-delay-1">
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
            <div className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4 mb-6 animate-fade-in-delay-2">
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
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 animate-fade-in-delay-3">
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
              <Textarea value={result}
                readOnly
                placeholder="Cleaned text will appear here..."
                className="min-h-[250px] font-sans text-lg resize-y"
              />
            </Card>

            {/* Stats Bar */}
            {result && (
              <div className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4 mt-6 animate-fade-in">
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
                    <Card key={useCase.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
                      <h3 className="font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Spreadsheet Text Cleaning Formulas Table */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  How to Clean Text in <span className="text-gradient">Excel &amp; Google Sheets</span>
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Cleaning raw exports, messy CSVs, or customer databases? Use these native spreadsheet functions:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-white/20 dark:border-white/5 bg-card/60 backdrop-blur-xl mb-4">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                      <tr>
                        <th className="p-4">Cleanup Task</th>
                        <th className="p-4">Excel &amp; Sheets Formula</th>
                        <th className="p-4">What It Does</th>
                        <th className="p-4">Sample Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 text-foreground/90 font-mono text-xs md:text-sm">
                      <tr>
                        <td className="p-4 font-sans font-medium">Remove Extra Spaces</td>
                        <td className="p-4 text-primary font-bold">=TRIM(A2)</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Strips leading/trailing spaces and reduces multiple spaces between words to 1.</td>
                        <td className="p-4 text-emerald-400 font-bold">"Clean Text"</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Remove Non-Printable Chars</td>
                        <td className="p-4 text-primary font-bold">=CLEAN(A2)</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Deletes low-level ASCII characters and invisible control codes copied from old databases.</td>
                        <td className="p-4 text-emerald-400 font-bold">"Clean Data"</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Remove Line Breaks (Alt+Enter)</td>
                        <td className="p-4 text-primary font-bold">=SUBSTITUTE(A2, CHAR(10), " ")</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Replaces embedded line feed characters (CHAR 10) with single spaces.</td>
                        <td className="p-4 text-emerald-400 font-bold">"Single Line Text"</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Combined Super Cleaner</td>
                        <td className="p-4 text-primary font-bold">=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " ")))</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Removes non-breaking web spaces (&amp;nbsp; / CHAR 160), control chars, and extra spaces in one shot.</td>
                        <td className="p-4 text-emerald-400 font-bold">"Fully Sanitized"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Developer Regex Cleaning Snippets */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Developer Regex Snippets: <span className="text-gradient">Text Sanitation</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Collapse Multiple Spaces (JS)</div>
                    <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                      <code>{`// Replace multiple spaces with single space\nconst clean = text.replace(/\\s+/g, ' ').trim();`}</code>
                    </pre>
                  </Card>
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Remove Blank Lines (Python)</div>
                    <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                      <code>{`# Filter out empty or whitespace-only lines\nclean = "\\n".join([l for l in text.splitlines() if l.strip()])`}</code>
                    </pre>
                  </Card>
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Strip HTML Tags (JS)</div>
                    <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                      <code>{`// Strip all HTML elements from copied text\nconst plainText = html.replace(/<[^>]*>/g, '');`}</code>
                    </pre>
                  </Card>
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Normalize Unicode Accents</div>
                    <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                      <code>{`// Convert accented letters (é, ñ, ü) to ASCII equivalents\nconst ascii = text.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");`}</code>
                    </pre>
                  </Card>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <FAQSection faqs={faqs} toolName="Text Cleaner" />
            </div>

            {/* Related Tools */}
            <RelatedTools currentPath="/text-cleaner" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TextCleaner;
