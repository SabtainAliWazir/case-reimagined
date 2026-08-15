import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, Copy, Check, Code2, Sparkles } from "lucide-react";
import { toast } from "sonner";

function snakeToCamel(str: string): string {
  return str
    .toLowerCase()
    .replace(/([-_][a-z0-9])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
}

function camelToSnake(str: string): string {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

const SAMPLE_SNAKE = `# Python Database Schema / Model
user_account_profile = {
    "first_name": "Alex",
    "last_name": "Rivera",
    "email_address": "alex@example.com",
    "is_account_verified": True,
    "last_login_timestamp": 1773584820
}`;

const faqs = [
  {
    question: "Why convert snake_case to camelCase?",
    answer: "When consuming API responses from Python backends (Django, FastAPI, Flask) or SQL databases in a React or Node.js frontend, backend keys formatted in snake_case (like 'user_id', 'created_at') must be normalized into frontend camelCase ('userId', 'createdAt')."
  },
  {
    question: "Does this tool preserve code structure and formatting?",
    answer: "Yes! Our engine scans tokens while preserving indentation, line breaks, punctuation, quotation marks, and comments."
  },
  {
    question: "Can I convert large JSON payloads?",
    answer: "Yes, you can paste thousands of lines of JSON, and the keys will be transformed instantaneously in your browser with zero latency."
  },
  {
    question: "How do I switch back to snake_case?",
    answer: "Click the 'Swap Direction' button to toggle two-way conversion immediately."
  }
];

const SnakeToCamel = () => {
  const [inputText, setInputText] = useState(SAMPLE_SNAKE);
  const [mode, setMode] = useState<"snake2camel" | "camel2snake">("snake2camel");
  const [copied, setCopied] = useState(false);

  const convertedText = useMemo(() => {
    if (!inputText.trim()) return "";

    const lines = inputText.split("\n");
    const convertedLines = lines.map((line) => {
      return line.replace(/[a-zA-Z0-9_$-]+/g, (match) => {
        if (mode === "snake2camel") {
          return snakeToCamel(match);
        } else {
          return camelToSnake(match);
        }
      });
    });

    return convertedLines.join("\n");
  }, [inputText, mode]);

  const toggleMode = () => {
    setMode(prev => (prev === "snake2camel" ? "camel2snake" : "snake2camel"));
    setInputText(convertedText || "");
  };

  const copyToClipboard = () => {
    if (!convertedText) return;
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    toast.success("Converted code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>snake_case to camelCase Converter - Two-Way Code Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online snake_case to camelCase converter for developers. Convert Python and SQL database names into clean JavaScript camelCase variables instantly."
        />
        <meta
          name="keywords"
          content="snake case to camel case, snake to camel converter, convert snake_case to camelcase, python to javascript naming tool"
        />
        <link rel="canonical" href="https://caseconvert.online/snake-case-to-camelcase" />

        <meta property="og:title" content="snake_case to camelCase Converter - Two-Way Code Tool | CaseConvert" />
        <meta property="og:description" content="Convert snake_case database columns into JavaScript camelCase variables in real-time." />
        <meta property="og:url" content="https://caseconvert.online/snake-case-to-camelcase" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "snake_case to camelCase Converter",
            "description": "Convert snake_case variable names to camelCase and vice versa online.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://caseconvert.online/" },
              { "@type": "ListItem", "position": 2, "name": "snake_case to camelCase", "item": "https://caseconvert.online/snake-case-to-camelcase" }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />

        <main className="pt-12 pb-24 relative z-10 px-4">
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 backdrop-blur-md">
              <Code2 className="w-4 h-4" /> Python / SQL ↔ JavaScript Code Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              snake_case to <span className="text-transparent bg-clip-text bg-gradient-text">camelCase</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert <strong>snake_case (Python / SQL)</strong> identifiers and database columns into <strong>camelCase (JavaScript / TypeScript)</strong> with one click.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Current Mode: {mode === "snake2camel" ? "snake_case → camelCase" : "camelCase → snake_case"}
                  </span>
                </div>
                <Button
                  onClick={toggleMode}
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 font-medium"
                >
                  <ArrowRightLeft className="w-4 h-4 text-primary" />
                  Swap Direction
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="space-y-2">
                  <Label htmlFor="snake-input" className="text-sm font-semibold block">
                    {mode === "snake2camel" ? "Input snake_case Text / Code:" : "Input camelCase Text / Code:"}
                  </Label>
                  <Textarea
                    id="snake-input"
                    rows={8}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter variable names or code blocks..."
                    className="font-mono text-sm bg-background/60 rounded-2xl border-border resize-y p-4"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "snake2camel" ? "Converted camelCase Output:" : "Converted snake_case Output:"}
                    </Label>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="rounded-xl gap-1.5 h-8 font-semibold shadow-button hover:shadow-glow"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Code"}
                    </Button>
                  </div>
                  <Textarea
                    readOnly
                    rows={8}
                    value={convertedText}
                    placeholder="Converted result will appear here..."
                    className="font-mono text-sm bg-primary/5 border border-primary/20 text-primary font-medium rounded-2xl resize-y p-4 select-all"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Deep SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                API Normalization: <span className="text-gradient">snake_case to camelCase</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  Full-stack developers regularly interface between backends (written in Python, Ruby, or SQL) that produce <code>snake_case</code> data models, and frontends (built in React, Vue, or Angular) that require idiomatic <code>camelCase</code> state objects.
                </p>
                <p>
                  This utility handles automated casing transitions across single variables, arrays, and multiline dictionaries without breaking syntax structure.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="snake_case to camelCase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/snake-case-to-camelcase" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SnakeToCamel;
