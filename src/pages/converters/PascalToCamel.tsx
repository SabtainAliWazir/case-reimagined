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

function pascalToCamel(str: string): string {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function camelToPascal(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const SAMPLE_PASCAL = `// React Component Declarations to Variable Hooks
UserProfileCard
AuthenticationProvider
ShoppingCartModal
NavigationDrawerMenu
PaymentMethodSelector`;

const faqs = [
  {
    question: "What is the difference between PascalCase and camelCase?",
    answer: "Both PascalCase and camelCase join compound words without spaces and capitalize subsequent words. However, PascalCase capitalizes the initial letter (e.g. 'UserProfile'), while camelCase leaves the initial letter in lowercase (e.g. 'userProfile')."
  },
  {
    question: "Why convert PascalCase to camelCase?",
    answer: "In React and TypeScript, components, classes, and types are declared in PascalCase ('UserProfileCard'), while instances, state variables, props, and hooks are declared in camelCase ('userProfileCard')."
  },
  {
    question: "Can I convert whole lists of React components?",
    answer: "Yes! Paste single names, multi-line lists, or full component export statements, and our tool will transform every identifier instantly."
  },
  {
    question: "How do I reverse the conversion?",
    answer: "Click 'Swap Direction' to convert camelCase variables back to PascalCase component names."
  }
];

const PascalToCamel = () => {
  const [inputText, setInputText] = useState(SAMPLE_PASCAL);
  const [mode, setMode] = useState<"pascal2camel" | "camel2pascal">("pascal2camel");
  const [copied, setCopied] = useState(false);

  const convertedText = useMemo(() => {
    if (!inputText.trim()) return "";

    const lines = inputText.split("\n");
    const convertedLines = lines.map((line) => {
      return line.replace(/[a-zA-Z0-9_$-]+/g, (match) => {
        if (mode === "pascal2camel") {
          return pascalToCamel(match);
        } else {
          return camelToPascal(match);
        }
      });
    });

    return convertedLines.join("\n");
  }, [inputText, mode]);

  const toggleMode = () => {
    setMode(prev => (prev === "pascal2camel" ? "camel2pascal" : "pascal2camel"));
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
        <title>PascalCase to camelCase Converter - React & Developer Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online PascalCase to camelCase converter for developers. Convert React component names, classes, and types into camelCase variable names instantly."
        />
        <meta
          name="keywords"
          content="pascalcase to camelcase, pascal to camel converter, uppercamelcase to camelcase, react component to variable converter"
        />
        <link rel="canonical" href="https://caseconvert.online/pascalcase-to-camelcase" />

        <meta property="og:title" content="PascalCase to camelCase Converter - React & Developer Tool | CaseConvert" />
        <meta property="og:description" content="Convert PascalCase component names into camelCase variables in one click." />
        <meta property="og:url" content="https://caseconvert.online/pascalcase-to-camelcase" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PascalCase to camelCase Converter",
            "description": "Convert PascalCase identifiers to camelCase and vice versa online.",
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
              { "@type": "ListItem", "position": 2, "name": "PascalCase to camelCase", "item": "https://caseconvert.online/pascalcase-to-camelcase" }
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
              <Code2 className="w-4 h-4" /> React & TypeScript Identifier Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              PascalCase to <span className="text-transparent bg-clip-text bg-gradient-text">camelCase</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert <strong>PascalCase (UpperCamelCase)</strong> React components, types, and classes into <strong>camelCase</strong> variables and instance hooks.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Current Mode: {mode === "pascal2camel" ? "PascalCase → camelCase" : "camelCase → PascalCase"}
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
                  <Label htmlFor="pascal-input" className="text-sm font-semibold block">
                    {mode === "pascal2camel" ? "Input PascalCase Component / Class Names:" : "Input camelCase Variable Names:"}
                  </Label>
                  <Textarea
                    id="pascal-input"
                    rows={8}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter PascalCase component names..."
                    className="font-mono text-sm bg-background/60 rounded-2xl border-border resize-y p-4"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "pascal2camel" ? "Converted camelCase Result:" : "Converted PascalCase Result:"}
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

          {/* Deep SEO Guide */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                React & TypeScript: <span className="text-gradient">PascalCase vs camelCase</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  In modern React architectures:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>PascalCase</strong> is strictly enforced for JSX / TSX Component tags (e.g. <code>&lt;NavigationBar /&gt;</code>) and TypeScript type definitions (<code>interface UserAccount</code>).</li>
                  <li><strong>camelCase</strong> is used for props (<code>isActive</code>), useState hooks (<code>const [userAccount, setUserAccount] = useState()</code>), and helper functions.</li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="PascalCase to camelCase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/pascalcase-to-camelcase" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PascalToCamel;
