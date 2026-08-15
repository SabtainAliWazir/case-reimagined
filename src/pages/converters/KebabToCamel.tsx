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

function kebabToCamel(str: string): string {
  return str
    .toLowerCase()
    .replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/^-/, "");
}

const SAMPLE_KEBAB = `/* CSS Styles to React Inline JS Styles */
background-color: #1a1a2e;
font-size: 16px;
margin-top: 24px;
border-top-left-radius: 12px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
z-index: 100;`;

const faqs = [
  {
    question: "Why convert kebab-case to camelCase?",
    answer: "CSS stylesheet properties are written in kebab-case (e.g. 'background-color', 'font-size', 'border-radius'). However, React inline style objects and the DOM style property in JavaScript require camelCase ('backgroundColor', 'fontSize', 'borderRadius')."
  },
  {
    question: "Can I paste complete CSS blocks?",
    answer: "Yes! Paste raw CSS stylesheets, and our converter will transform the property keys into valid React inline JavaScript style keys."
  },
  {
    question: "How do I convert camelCase back to kebab-case?",
    answer: "Click 'Swap Direction' to convert JavaScript style properties back into standard CSS kebab-case declarations."
  },
  {
    question: "Does it work with URL slugs and HTML attributes?",
    answer: "Yes! Any hyphenated string like 'my-blog-post' or 'data-user-id' converts into 'myBlogPost' and 'dataUserId'."
  }
];

const KebabToCamel = () => {
  const [inputText, setInputText] = useState(SAMPLE_KEBAB);
  const [mode, setMode] = useState<"kebab2camel" | "camel2kebab">("kebab2camel");
  const [copied, setCopied] = useState(false);

  const convertedText = useMemo(() => {
    if (!inputText.trim()) return "";

    const lines = inputText.split("\n");
    const convertedLines = lines.map((line) => {
      // If CSS declaration line like "background-color: #fff;"
      if (line.includes(":")) {
        const [prop, ...valParts] = line.split(":");
        const val = valParts.join(":");
        const convertedProp = mode === "kebab2camel" ? kebabToCamel(prop.trim()) : camelToKebab(prop.trim());
        return `${convertedProp}: ${val.trim()}`;
      }

      // Standard token replacement
      return line.replace(/[a-zA-Z0-9_-]+/g, (match) => {
        if (mode === "kebab2camel") {
          return kebabToCamel(match);
        } else {
          return camelToKebab(match);
        }
      });
    });

    return convertedLines.join("\n");
  }, [inputText, mode]);

  const toggleMode = () => {
    setMode(prev => (prev === "kebab2camel" ? "camel2kebab" : "kebab2camel"));
    setInputText(convertedText || "");
  };

  const copyToClipboard = () => {
    if (!convertedText) return;
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    toast.success("Converted styles copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>kebab-case to camelCase Converter - CSS to React Style Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online kebab-case to camelCase converter for web developers. Convert CSS properties into React inline style camelCase properties and URL slugs into variable names."
        />
        <meta
          name="keywords"
          content="kebab case to camelcase, kebab to camel converter, css to react style converter, dash case to camelcase online"
        />
        <link rel="canonical" href="https://caseconvert.online/kebab-case-to-camelcase" />

        <meta property="og:title" content="kebab-case to camelCase Converter - CSS to React Tool | CaseConvert" />
        <meta property="og:description" content="Convert CSS kebab-case styles into React camelCase objects in real time." />
        <meta property="og:url" content="https://caseconvert.online/kebab-case-to-camelcase" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "kebab-case to camelCase Converter",
            "description": "Convert CSS properties and kebab-case strings to camelCase format online.",
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
              { "@type": "ListItem", "position": 2, "name": "kebab-case to camelCase", "item": "https://caseconvert.online/kebab-case-to-camelcase" }
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
              <Code2 className="w-4 h-4" /> CSS ↔ React & JavaScript Style Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              kebab-case to <span className="text-transparent bg-clip-text bg-gradient-text">camelCase</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert <strong>CSS styles (kebab-case)</strong> into <strong>React inline style objects (camelCase)</strong> and URL slugs into variables.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Current Mode: {mode === "kebab2camel" ? "kebab-case (CSS) → camelCase (React)" : "camelCase (React) → kebab-case (CSS)"}
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
                  <Label htmlFor="kebab-input" className="text-sm font-semibold block">
                    {mode === "kebab2camel" ? "Input kebab-case CSS Properties:" : "Input camelCase Style Objects:"}
                  </Label>
                  <Textarea
                    id="kebab-input"
                    rows={8}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter CSS properties or slugs..."
                    className="font-mono text-sm bg-background/60 rounded-2xl border-border resize-y p-4"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "kebab2camel" ? "Converted React camelCase Styles:" : "Converted CSS kebab-case Styles:"}
                    </Label>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="rounded-xl gap-1.5 h-8 font-semibold shadow-button hover:shadow-glow"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Styles"}
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
                CSS to React Stylesheet Conversion
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  In traditional CSS files, multi-word property names are separated by hyphens (<code>border-radius</code>, <code>font-weight</code>). When writing inline styles in React, React uses the DOM <code>style</code> property syntax, requiring camelCase (<code>borderRadius</code>, <code>fontWeight</code>).
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="kebab-case to camelCase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/kebab-case-to-camelcase" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default KebabToCamel;
