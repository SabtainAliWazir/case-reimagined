import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Title Case?",
    answer: "Title Case is a headline capitalization standard where major words (nouns, verbs, adjectives, adverbs) start with a capital letter, while minor words (articles, short prepositions, coordinating conjunctions like 'and', 'the', 'of', 'in') remain lowercase unless they appear as the first word."
  },
  {
    question: "Which style guides does this Title Case converter follow?",
    answer: "Our converter follows standard English headline conventions consistent with APA, Chicago, MLA, and AP style guides, ensuring articles like 'a', 'an', 'the' and prepositions like 'in', 'on', 'at' remain lowercase appropriately."
  },
  {
    question: "What is the difference between Title Case and Capitalized Case?",
    answer: "In Capitalized Case (Start Case), literally EVERY single word is capitalized without exception ('The Man In The Moon'). In Title Case, minor words remain lowercase ('The Man in the Moon')."
  },
  {
    question: "Is Title Case conversion free?",
    answer: "Yes, 100% free with unlimited usage and no account required. All calculations run in your browser."
  }
];

const TitleCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Title Case Converter - Capitalize Headlines & Titles Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online Title Case converter. Capitalize headlines, book titles, blog posts, and articles according to modern style guidelines (APA, Chicago, MLA). Fast and private."
        />
        <meta
          name="keywords"
          content="title case converter, headline capitalization tool, title case generator, capitalize title online, apa title case, chicago title case, title converter"
        />
        <link rel="canonical" href="https://caseconvert.online/title-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="Title Case Converter - Capitalize Headlines & Titles Online | CaseConvert" />
        <meta property="og:description" content="Format headlines and book titles effortlessly with intelligent grammatical Title Case rules." />
        <meta property="og:url" content="https://caseconvert.online/title-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Title Case Converter - Headline Capitalization | CaseConvert" />
        <meta name="twitter:description" content="Intelligent Title Case capitalization tool following APA, MLA, and Chicago standards." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Title Case Converter",
            "description": "Capitalize headlines, titles, and articles adhering to modern grammar guidelines.",
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
                "name": "Title Case Converter",
                "item": "https://caseconvert.online/title-case-converter"
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
              Grammar & Headline Formatting
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Title Case <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Format blog headlines, essays, academic papers, and YouTube titles automatically with accurate <strong>Title Case</strong> rules.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="title" initialPlaceholder="Paste or type your headline here to convert to Title Case..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">Title Case Capitalization</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Title Case</strong> is the standard style used for titles of books, movies, songs, essays, and articles. While standard sentence formatting only capitalizes the first letter of a sentence, Title Case emphasizes major words while intelligently keeping minor connecting words in lowercase.
                </p>
                <p>
                  Major style guides such as <em>The Chicago Manual of Style</em>, <em>APA Publication Manual</em>, and <em>MLA Handbook</em> enforce Title Case rules for publication headings. CaseConvert applies these grammatical rules automatically so you never have to memorize which conjunctions or prepositions need lowercase treatment.
                </p>
              </div>
            </div>

            {/* Rules Comparison Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Title Case Grammar Rules Summary</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <h3 className="font-semibold text-emerald-400 mb-2">Always Capitalized:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>The first and last word of the title</li>
                    <li>All Nouns (e.g. <em>Cat, Future, Design</em>)</li>
                    <li>All Verbs (including short verbs like <em>Is, Be, Are</em>)</li>
                    <li>All Adjectives and Adverbs (e.g. <em>Quick, Fast, Very</em>)</li>
                    <li>All Pronouns (e.g. <em>He, She, Their, It</em>)</li>
                  </ul>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <h3 className="font-semibold text-amber-400 mb-2">Kept Lowercase (Unless First Word):</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Articles (<em>a, an, the</em>)</li>
                    <li>Coordinating Conjunctions (<em>and, but, for, nor, or, so, yet</em>)</li>
                    <li>Short Prepositions (<em>in, on, at, by, to, of, up, as</em>)</li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Title Case Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    the art of war in the modern world and beyond
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Title Case Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    The Art of War in the Modern World and Beyond
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Title Case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/title-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TitleCaseConverter;
