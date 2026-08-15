import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is kebab-case?",
    answer: "kebab-case (also known as dash-case or slug-case) is a naming convention where all words are written in lowercase and separated by hyphens (e.g. 'my-awesome-blog-post')."
  },
  {
    question: "Why is kebab-case recommended for SEO URLs?",
    answer: "Google search engines explicitly recommend using hyphens (-) rather than underscores (_) to separate words in web URLs, making kebab-case the universal standard for SEO-friendly slugs."
  },
  {
    question: "Where is kebab-case used in web development?",
    answer: "kebab-case is standard for web URLs, CSS class names (e.g. 'bg-primary-500'), HTML custom data attributes, npm package names, and Git branch names."
  },
  {
    question: "Does this tool strip out punctuation and special symbols?",
    answer: "Yes! It removes commas, apostrophes, quotation marks, and special symbols, replacing any multiple spaces or illegal characters with clean single hyphens."
  }
];

const KebabCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>kebab-case Converter - Convert Text to URL Slugs Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online kebab-case converter. Transform headlines, titles, and text into clean, SEO-friendly kebab-case slugs with hyphens. Fast and 100% private."
        />
        <meta
          name="keywords"
          content="kebab-case converter, text to kebab-case, slug generator, dash case converter, url slug generator, seo slug creator"
        />
        <link rel="canonical" href="https://caseconvert.online/kebab-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="kebab-case Converter - Convert Text to URL Slugs Online | CaseConvert" />
        <meta property="og:description" content="Generate clean, SEO-friendly kebab-case strings and URL slugs instantly." />
        <meta property="og:url" content="https://caseconvert.online/kebab-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="kebab-case Converter - SEO Slug Generator | CaseConvert" />
        <meta name="twitter:description" content="Turn headlines into hyphenated kebab-case slugs for blogs and CSS classes." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "kebab-case Text Converter",
            "description": "Convert plain text, titles, and strings to kebab-case format online.",
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
                "name": "kebab-case Converter",
                "item": "https://caseconvert.online/kebab-case-converter"
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
              SEO & Web Development Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              kebab-case <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert any headline, article title, or variable name into a clean, hyphen-separated <strong>kebab-case</strong> slug.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="kebab" initialPlaceholder="Enter article titles or strings to convert to kebab-case (e.g. 10 Best SEO Strategies in 2026)..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">kebab-case</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>kebab-case</strong> (resembling words skewered together by hyphens) is a naming convention where all alphabetical letters are lowercase and individual words are joined by dashes (<code>-</code>).
                </p>
                <p>
                  Because web browsers and search engine crawlers interpret hyphens as distinct word boundaries, kebab-case is the gold-standard recommendation by Google for authoring website URLs, permalinks, and directory structures.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">kebab-case Conversion Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    How to Optimize React Apps for Google SEO in 2026!
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">kebab-case Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    how-to-optimize-react-apps-for-google-seo-in-2026
                  </div>
                </Card>
              </div>
            </div>

            {/* Common Use Cases */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Primary Uses for <span className="text-gradient">kebab-case</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "SEO Blog URLs & Slugs",
                    desc: "Creating readable permalinks that Googlebot indexes cleanly for organic rankings."
                  },
                  {
                    title: "CSS Styles & Classes",
                    desc: "Writing standard BEM or utility CSS class names (e.g. card-header-title)."
                  },
                  {
                    title: "Git Branches & NPM",
                    desc: "Naming software packages and git feature branches (e.g. feature-user-auth)."
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
            <FAQSection faqs={faqs} toolName="kebab-case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/kebab-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default KebabCaseConverter;
