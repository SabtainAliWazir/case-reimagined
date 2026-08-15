import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Check, Sparkles, Link2 } from "lucide-react";
import { toast } from "sonner";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "is", "if", "then", "else", "when",
  "at", "from", "by", "for", "with", "about", "against", "between", "into",
  "through", "during", "before", "after", "above", "below", "to", "of", "in", "on"
]);

const faqs = [
  {
    question: "What is an SEO Slug Generator?",
    answer: "A slug generator is a tool that converts plain text, titles, or headlines into clean, URL-friendly strings (slugs) by replacing spaces with hyphens, stripping out illegal special characters, and converting accented characters into standard Latin letters."
  },
  {
    question: "Why should I use hyphens instead of underscores in URLs?",
    answer: "Google's official search engine guidelines state that search crawlers treat hyphens (-) as word separators, whereas underscores (_) join words together. Using hyphens ensures your keywords are indexed as distinct search terms."
  },
  {
    question: "What does the 'Remove Stop Words' feature do?",
    answer: "Stop words are filler words (like 'a', 'an', 'the', 'in', 'of') that don't add keyword value to a URL. Removing them makes your URL shorter, cleaner, and more impactful for search engine rankings and social sharing."
  },
  {
    question: "How does the tool handle accents and special characters?",
    answer: "It uses Unicode NFD normalization to strip diacritical marks (e.g. converting 'é' to 'e', 'ü' to 'u', 'ñ' to 'n') ensuring universal browser and server compatibility."
  }
];

const SlugGenerator = () => {
  const [inputText, setInputText] = useState("How to Build a High-Ranking React Website in 2026!");
  const [separator, setSeparator] = useState<"-" | "_" | "/">("-");
  const [toLowerCase, setToLowerCase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedSlug = useMemo(() => {
    if (!inputText.trim()) return "";

    let text = inputText;

    // 1. Normalize diacritics / accents (e.g. é -> e)
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 2. Remove numbers if option enabled
    if (removeNumbers) {
      text = text.replace(/[0-9]/g, "");
    }

    // 3. Remove punctuation and symbols except alphanumerics & whitespace
    text = text.replace(/[^a-zA-Z0-9\s-_]/g, "");

    // 4. Split into words
    let words = text.trim().split(/\s+/).filter(Boolean);

    // 5. Remove stop words if enabled
    if (removeStopWords) {
      words = words.filter(w => !STOP_WORDS.has(w.toLowerCase()));
      // If all words were stop words, revert to original to prevent empty slug
      if (words.length === 0) words = text.trim().split(/\s+/).filter(Boolean);
    }

    let result = words.join(separator);

    if (toLowerCase) {
      result = result.toLowerCase();
    }

    return result;
  }, [inputText, separator, toLowerCase, removeStopWords, removeNumbers]);

  const copyToClipboard = () => {
    if (!generatedSlug) return;
    navigator.clipboard.writeText(generatedSlug);
    setCopied(true);
    toast.success("Slug copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>URL Slug Generator - Create Clean SEO Friendly Slugs | CaseConvert</title>
        <meta
          name="description"
          content="Free online SEO slug generator. Convert headlines and text into clean, URL-friendly slugs with custom separators, stop word removal, and accent stripping."
        />
        <meta
          name="keywords"
          content="slug generator, url slug generator, seo slug creator, clean url maker, string to slug, slugify online"
        />
        <link rel="canonical" href="https://caseconvert.online/slug-generator" />

        <meta property="og:title" content="URL Slug Generator - Create Clean SEO Friendly Slugs | CaseConvert" />
        <meta property="og:description" content="Convert any headline or title into a Google-optimized, clean URL slug instantly." />
        <meta property="og:url" content="https://caseconvert.online/slug-generator" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SEO URL Slug Generator",
            "description": "Generate clean, search-engine-friendly URL slugs from text online.",
            "applicationCategory": "UtilitiesApplication",
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
              { "@type": "ListItem", "position": 2, "name": "Slug Generator", "item": "https://caseconvert.online/slug-generator" }
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
              <Link2 className="w-4 h-4" /> SEO & Webmaster Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              SEO URL <span className="text-transparent bg-clip-text bg-gradient-text">Slug Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform titles, articles, and product names into clean, search-engine-optimized <strong>URL slugs</strong> instantly.
            </p>
          </section>

          {/* Interactive Tool */}
          <section className="max-w-[900px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="slug-input" className="text-sm font-semibold mb-2 block">
                    Enter Title or Headline:
                  </Label>
                  <Input
                    id="slug-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your headline here..."
                    className="p-4 text-lg bg-background/60 rounded-2xl h-14 border-border"
                  />
                </div>

                {/* Options Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-border/50">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Separator</Label>
                    <div className="flex gap-2">
                      {(["-", "_", "/"] as const).map((sep) => (
                        <Button
                          key={sep}
                          type="button"
                          variant={separator === sep ? "default" : "outline"}
                          size="sm"
                          className="flex-1 rounded-xl font-mono text-base"
                          onClick={() => setSeparator(sep)}
                        >
                          {sep === "-" ? "Hyphen (-)" : sep === "_" ? "Underscore (_)" : "Slash (/)"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 pt-6">
                    <Switch id="lower-toggle" checked={toLowerCase} onCheckedChange={setToLowerCase} />
                    <Label htmlFor="lower-toggle" className="text-sm cursor-pointer">Lowercase</Label>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 pt-6">
                    <Switch id="stop-words-toggle" checked={removeStopWords} onCheckedChange={setRemoveStopWords} />
                    <Label htmlFor="stop-words-toggle" className="text-sm cursor-pointer">Remove Stop Words</Label>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-3 pt-6">
                    <Switch id="numbers-toggle" checked={removeNumbers} onCheckedChange={setRemoveNumbers} />
                    <Label htmlFor="numbers-toggle" className="text-sm cursor-pointer">Strip Numbers</Label>
                  </div>
                </div>

                {/* Generated Result */}
                <div className="pt-4 border-t border-border/50">
                  <Label className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                    Generated URL Slug:
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-4 rounded-2xl bg-primary/5 border border-primary/20 font-mono text-primary font-bold text-base md:text-lg break-all">
                      {generatedSlug || "your-slug-will-appear-here"}
                    </div>
                    <Button
                      onClick={copyToClipboard}
                      className="h-14 px-6 rounded-2xl gap-2 font-semibold shadow-button hover:shadow-glow"
                    >
                      {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                      {copied ? "Copied" : "Copy Slug"}
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground font-mono">
                    Preview URL: <span className="text-foreground">https://example.com/blog/{generatedSlug || "your-slug"}</span>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Deep SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What Makes a <span className="text-gradient">Good SEO URL Slug</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  A <strong>URL slug</strong> is the exact alphanumeric portion of a web address that identifies a specific page in human-readable language. A well-crafted slug signals topic relevance to search engines like Google and increases organic click-through rates (CTR) from search engine results pages (SERPs).
                </p>
                <p>
                  Search engines favor slugs that are concise, descriptive, and free of redundant parameters. Using hyphens instead of spaces and removing unnecessary stop words helps prioritize high-value ranking keywords.
                </p>
              </div>
            </div>

            {/* Quick Rules Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Best Practices for URL Slugs</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "1. Use Hyphens (-)",
                    desc: "Always separate words with hyphens. Google explicitly recommends dashes over underscores."
                  },
                  {
                    title: "2. Keep It Short & Sweet",
                    desc: "Aim for 3 to 5 words. Shorter slugs are easier to remember, tweet, and display on mobile SERPs."
                  },
                  {
                    title: "3. Strip Accents & Special Characters",
                    desc: "Avoid symbols like '?', '%', '&', or emoji that can cause broken URL encodings on older servers."
                  }
                ].map((item) => (
                  <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <h3 className="font-semibold text-base mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Slug Generator" />

            {/* Related Tools */}
            <RelatedTools currentPath="/slug-generator" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SlugGenerator;
