import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is a lowercase text converter?",
    answer: "A lowercase converter turns every uppercase character in a piece of text into its small-letter equivalent. For instance, 'HELLO WORLD' becomes 'hello world'."
  },
  {
    question: "Why convert text to lowercase?",
    answer: "Lowercase formatting is standard for URLs, email addresses, database keys, coding identifiers, search queries, and fixing text mistakenly typed with Caps Lock on."
  },
  {
    question: "Does lowercase conversion remove punctuation or spaces?",
    answer: "No. All numbers, special characters, whitespaces, and line breaks remain intact. Only capitalized letters (A-Z) are transformed to lowercase (a-z)."
  },
  {
    question: "Is my text data stored or sent to a server?",
    answer: "Never. All transformations run 100% locally in your client's web browser using JavaScript string methods. Your text is private and never leaves your computer."
  }
];

const LowercaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Lowercase Converter - Convert Text to Small Letters Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online lowercase converter. Transform capitalized or mixed-case text into clean small letters instantly. Fast, private, and works directly in your browser."
        />
        <meta
          name="keywords"
          content="lowercase converter, small text generator, convert to lowercase, text to lowercase, uncapitalize text, lower case tool, small letters converter"
        />
        <link rel="canonical" href="https://caseconvert.online/lowercase-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="Lowercase Converter - Convert Text to Small Letters Online | CaseConvert" />
        <meta property="og:description" content="Convert all letters into lowercase in one click with real-time character and word count statistics." />
        <meta property="og:url" content="https://caseconvert.online/lowercase-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Lowercase Converter - Small Text Generator | CaseConvert" />
        <meta name="twitter:description" content="Quickly uncapitalize and format your text into clean lowercase letters." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Lowercase Text Converter",
            "description": "Convert all text characters to lowercase instantly online.",
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
                "name": "Lowercase Converter",
                "item": "https://caseconvert.online/lowercase-converter"
              }
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
              Free Text Formatting Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Lowercase <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert your text, titles, or entire paragraphs into clean <strong>lowercase (small letters)</strong> with one click.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="lower" initialPlaceholder="Paste or type your text here to convert to lowercase..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is a <span className="text-gradient">Lowercase Converter</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  A <strong>lowercase converter</strong> is an essential online productivity tool that standardizes all uppercase letters into small letters. Whether you accidentally typed with Caps Lock enabled, need to sanitize emails for a database, or are preparing URL slugs, this utility performs instant conversions with 100% accuracy.
                </p>
                <p>
                  Built with high-performance browser JavaScript, CaseConvert handles massive strings with zero lag, displaying instant character, word, and sentence counts alongside the converted result.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Lowercase Conversion Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    ACCIDENTAL CAPS LOCK AND Mixed CaSe Text!
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Lowercase Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    accidental caps lock and mixed case text!
                  </div>
                </Card>
              </div>
            </div>

            {/* Common Use Cases */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Popular Use Cases for <span className="text-gradient">Lowercase Text</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "URL & Slugs",
                    desc: "Web search engines prefer lowercase URLs for canonical consistency and SEO indexing."
                  },
                  {
                    title: "Database Normalization",
                    desc: "Cleaning usernames and emails to prevent case-sensitive authentication mismatches."
                  },
                  {
                    title: "Fixing Caps Lock",
                    desc: "Instantly fixing long messages typed with accidental Caps Lock on without rewriting."
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
            <FAQSection faqs={faqs} toolName="Lowercase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/lowercase-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LowercaseConverter;
