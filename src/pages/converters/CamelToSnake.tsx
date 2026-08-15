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
import { Switch } from "@/components/ui/switch";
import { ArrowRightLeft, Copy, Check, Code2, Sparkles } from "lucide-react";
import { toast } from "sonner";

function camelToSnake(str: string): string {
  return str
    // Handle acronyms followed by capital word: "getHTTPResponse" -> "get_http_response"
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    // Handle standard camelCase transitions: "userProfile" -> "user_profile"
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    // Handle hyphens or spaces if present
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

function snakeToCamel(str: string): string {
  return str
    .toLowerCase()
    .replace(/([-_][a-z0-9])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
}

const SAMPLE_CAMEL = `// JavaScript User Object
const userAccountProfile = {
  firstName: "Alex",
  lastName: "Rivera",
  emailAddress: "alex@example.com",
  isAccountVerified: true,
  lastLoginTimestamp: 1773584820
};`;

const faqs = [
  {
    question: "Why convert camelCase to snake_case?",
    answer: "camelCase is the universal standard in JavaScript and TypeScript (e.g. 'userId'), whereas snake_case is the standard in Python (PEP 8), PostgreSQL, MySQL, and REST API database columns (e.g. 'user_id'). When writing API integrations or database queries, converting between these naming conventions is mandatory."
  },
  {
    question: "Does this tool support multi-line JSON or code blocks?",
    answer: "Yes! You can paste entire JavaScript objects, Python dictionaries, SQL schemas, or single variable names, and all lines will be converted line-by-line in real time."
  },
  {
    question: "How does it handle consecutive uppercase acronyms like 'getHTTPResponse'?",
    answer: "Our intelligent regex algorithm splits consecutive uppercase acronyms cleanly into 'get_http_response' rather than creating broken single-letter splits."
  },
  {
    question: "Can I convert back from snake_case to camelCase?",
    answer: "Yes! Click the 'Swap Direction' button to toggle two-way conversion between snake_case and camelCase instantly."
  }
];

const CamelToSnake = () => {
  const [inputText, setInputText] = useState(SAMPLE_CAMEL);
  const [mode, setMode] = useState<"camel2snake" | "snake2camel">("camel2snake");
  const [uppercaseSnake, setUppercaseSnake] = useState(false); // SCREAMING_SNAKE_CASE
  const [copied, setCopied] = useState(false);

  const convertedText = useMemo(() => {
    if (!inputText.trim()) return "";

    const lines = inputText.split("\n");
    const convertedLines = lines.map((line) => {
      // Convert words while preserving symbols and indentation
      return line.replace(/[a-zA-Z0-9_$-]+/g, (match) => {
        if (mode === "camel2snake") {
          const res = camelToSnake(match);
          return uppercaseSnake ? res.toUpperCase() : res;
        } else {
          return snakeToCamel(match);
        }
      });
    });

    return convertedLines.join("\n");
  }, [inputText, mode, uppercaseSnake]);

  const toggleMode = () => {
    setMode(prev => (prev === "camel2snake" ? "snake2camel" : "camel2snake"));
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
        <title>camelCase to snake_case Converter - Two-Way Code Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online camelCase to snake_case converter for developers. Convert JavaScript identifiers to Python and SQL snake_case format with two-way swapping and SCREAMING_SNAKE support."
        />
        <meta
          name="keywords"
          content="camelcase to snake case, camel to snake converter, snake_case converter, convert camelcase to snake_case online, javascript to python naming converter"
        />
        <link rel="canonical" href="https://caseconvert.online/camelcase-to-snake-case" />

        <meta property="og:title" content="camelCase to snake_case Converter - Two-Way Code Tool | CaseConvert" />
        <meta property="og:description" content="Instantly convert camelCase variables to Python/SQL snake_case online." />
        <meta property="og:url" content="https://caseconvert.online/camelcase-to-snake-case" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "camelCase to snake_case Converter",
            "description": "Convert camelCase variable names to snake_case and vice versa online.",
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
              { "@type": "ListItem", "position": 2, "name": "camelCase to snake_case", "item": "https://caseconvert.online/camelcase-to-snake-case" }
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
              <Code2 className="w-4 h-4" /> JavaScript ↔ Python / SQL Code Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              camelCase to <span className="text-transparent bg-clip-text bg-gradient-text">snake_case</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert <strong>camelCase (JavaScript)</strong> variables, objects, and JSON keys to <strong>snake_case (Python / SQL)</strong> with instant two-way swapping.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Current Mode: {mode === "camel2snake" ? "camelCase → snake_case" : "snake_case → camelCase"}
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
                  <Label htmlFor="code-input" className="text-sm font-semibold block">
                    {mode === "camel2snake" ? "Input camelCase Text / Code:" : "Input snake_case Text / Code:"}
                  </Label>
                  <Textarea
                    id="code-input"
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
                      {mode === "camel2snake" ? "Converted snake_case Output:" : "Converted camelCase Output:"}
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

              {/* Extra Controls */}
              {mode === "camel2snake" && (
                <div className="pt-4 mt-4 border-t border-border/50 flex items-center gap-3">
                  <Switch
                    id="screaming-snake"
                    checked={uppercaseSnake}
                    onCheckedChange={setUppercaseSnake}
                  />
                  <Label htmlFor="screaming-snake" className="text-sm cursor-pointer">
                    SCREAMING_SNAKE_CASE (for constants & environment variables)
                  </Label>
                </div>
              )}
            </Card>
          </section>

          {/* Deep SEO Guide & Comparison Table */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Comparing <span className="text-gradient">camelCase vs snake_case</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  In modern software engineering, different language ecosystems mandate different casing conventions:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>camelCase</strong> is standard for JavaScript, TypeScript, Java, and Swift variable and method naming.
                  </li>
                  <li>
                    <strong>snake_case</strong> is the standard for Python (PEP 8), Ruby, Rust, SQL database schema columns, and JSON REST API payloads.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Conversion Cheat Sheet */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Conversion Cheat Sheet</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">JavaScript camelCase</div>
                  <ul className="font-mono text-sm space-y-2 text-foreground">
                    <li>userProfileDetails</li>
                    <li>isAuthenticatedUser</li>
                    <li>getMonthlyInvoiceTotal</li>
                  </ul>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase mb-2">Python / SQL snake_case</div>
                  <ul className="font-mono text-sm space-y-2 text-primary font-bold">
                    <li>user_profile_details</li>
                    <li>is_authenticated_user</li>
                    <li>get_monthly_invoice_total</li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="camelCase to snake_case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/camelcase-to-snake-case" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CamelToSnake;
