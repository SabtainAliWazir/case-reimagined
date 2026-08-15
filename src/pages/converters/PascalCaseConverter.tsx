import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is PascalCase (UpperCamelCase)?",
    answer: "PascalCase is a capitalization convention where compound words are concatenated without spaces, and the very first letter of EVERY word—including the initial word—is capitalized (e.g. 'UserProfileComponent')."
  },
  {
    question: "What is the difference between PascalCase and camelCase?",
    answer: "PascalCase capitalizes the first letter of the first word ('UserProfile'), whereas camelCase leaves the first letter lowercase ('userProfile')."
  },
  {
    question: "Where is PascalCase commonly used?",
    answer: "PascalCase is the primary standard for React components, TypeScript interfaces and types, C# classes/methods, Python classes, and Java classes."
  },
  {
    question: "Can I convert snake_case and kebab-case into PascalCase?",
    answer: "Yes! Simply paste any string like 'user_billing_address' or 'user-billing-address', and it will convert cleanly to 'UserBillingAddress'."
  }
];

const PascalCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>PascalCase Converter - Convert Text to PascalCase Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online PascalCase converter. Convert text, sentences, snake_case, and camelCase into PascalCase (UpperCamelCase) format. Ideal for React components and class naming."
        />
        <meta
          name="keywords"
          content="pascalcase converter, text to pascalcase, pascal case generator, uppercamelcase converter, react component naming tool, string to pascalcase"
        />
        <link rel="canonical" href="https://caseconvert.online/pascal-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="PascalCase Converter - Convert Text to PascalCase Online | CaseConvert" />
        <meta property="og:description" content="Quickly convert sentences and variables into PascalCase / UpperCamelCase for React and TypeScript." />
        <meta property="og:url" content="https://caseconvert.online/pascal-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="PascalCase Converter - UpperCamelCase Tool | CaseConvert" />
        <meta name="twitter:description" content="Generate valid PascalCase class and component names in seconds." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PascalCase Text Converter",
            "description": "Convert plain text, strings, and variable identifiers to PascalCase format online.",
            "applicationCategory": "DeveloperApplication",
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
                "name": "PascalCase Converter",
                "item": "https://caseconvert.online/pascal-case-converter"
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
              Developer & Coding Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              PascalCase <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert plain text, sentences, or snake_case identifiers into clean <strong>PascalCase</strong> (UpperCamelCase) for classes, types, and components.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="pascal" initialPlaceholder="Enter text or variables to convert to PascalCase (e.g. user navigation modal)..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">PascalCase</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>PascalCase</strong> (originally popularized by the Pascal programming language) is a naming convention where all words are capitalized and joined without spaces. It is also commonly called <em>UpperCamelCase</em> or <em>StudlyCaps</em>.
                </p>
                <p>
                  In modern software engineering, PascalCase is the standard convention for defining OOP classes, React component declarations, TypeScript interfaces, and enum types.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">PascalCase Conversion Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    shopping cart checkout modal
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">PascalCase Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    ShoppingCartCheckoutModal
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="PascalCase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/pascal-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PascalCaseConverter;
