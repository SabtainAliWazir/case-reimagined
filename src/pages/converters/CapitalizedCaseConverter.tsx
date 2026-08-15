import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Capitalized Case (Start Case)?",
    answer: "Capitalized Case (also referred to as Start Case or Initial Caps) capitalizes the first letter of every single word in a piece of text without exception, while setting the remaining letters of each word to lowercase."
  },
  {
    question: "How is Capitalized Case different from Title Case?",
    answer: "Capitalized Case capitalizes literally every single word (e.g. 'A Day In The Life Of A Developer'). Title Case follows grammar rules by leaving minor articles and prepositions in lowercase (e.g. 'A Day in the Life of a Developer')."
  },
  {
    question: "When should I use Capitalized Case?",
    answer: "It is widely used for capitalizing names, postal addresses, product SKUs, database column headers, table titles, and list items."
  },
  {
    question: "Does this tool work on long multi-line lists?",
    answer: "Yes! You can paste lists with thousands of lines, and each line's words will have their first letter capitalized instantly."
  }
];

const CapitalizedCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Capitalized Case Converter - Capitalize First Letter of Every Word | CaseConvert</title>
        <meta
          name="description"
          content="Free online Capitalized Case converter. Capitalize the first letter of each word (Start Case) instantly. Clean formatting for names, lists, headings, and addresses."
        />
        <meta
          name="keywords"
          content="capitalized case converter, capitalize every word, start case generator, capitalize each word online, initial caps tool, capitalize names"
        />
        <link rel="canonical" href="https://caseconvert.online/capitalized-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="Capitalized Case Converter - Capitalize Every Word | CaseConvert" />
        <meta property="og:description" content="Quickly capitalize the first letter of every word with our instant browser converter." />
        <meta property="og:url" content="https://caseconvert.online/capitalized-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Capitalized Case Converter - Start Case Tool | CaseConvert" />
        <meta name="twitter:description" content="Transform your text to Start Case / Capitalized Case with live word and letter counters." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Capitalized Case Converter",
            "description": "Capitalize the initial letter of every single word in your text online.",
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
                "name": "Capitalized Case Converter",
                "item": "https://caseconvert.online/capitalized-case-converter"
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
              Text & String Formatting
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Capitalized Case <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Capitalize the <strong>first letter of every word</strong> (Start Case) across names, titles, lists, and tables with one click.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="capitalized" initialPlaceholder="Paste or type your text here to Capitalize Every Word..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">Capitalized Case (Start Case)</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Capitalized Case</strong> (also known as <em>Start Case</em> or <em>Initial Caps</em>) is a style of typography where the initial letter of every single word begins with an uppercase letter, regardless of whether the word is a noun, article, or preposition.
                </p>
                <p>
                  It is particularly popular in spreadsheets, CRM contact imports, name formatting, catalog item names, and database normalization where visual uniformity across every token is critical.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Capitalized Case Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    john doe 123 main street springfield
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Capitalized Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    John Doe 123 Main Street Springfield
                  </div>
                </Card>
              </div>
            </div>

            {/* Common Use Cases */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                When to Use <span className="text-gradient">Capitalized Case</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Contact & Client Lists",
                    desc: "Fixing messy CRM data to ensure every customer first and last name is properly capitalized."
                  },
                  {
                    title: "E-Commerce Product Titles",
                    desc: "Standardizing product catalog titles across Amazon, Shopify, and eBay listings."
                  },
                  {
                    title: "Addresses & Locations",
                    desc: "Formatting street names, city titles, and country headings for clean postal accuracy."
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
            <FAQSection faqs={faqs} toolName="Capitalized Case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/capitalized-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CapitalizedCaseConverter;
