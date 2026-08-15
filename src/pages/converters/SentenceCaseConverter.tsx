import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Sentence Case?",
    answer: "Sentence case is the standard grammatical writing style where only the initial letter of the first word in a sentence is capitalized, along with proper nouns (such as names, places, and brands). Everything else is written in lowercase."
  },
  {
    question: "How does this Sentence Case tool recognize new sentences?",
    answer: "Our intelligent algorithm scans for common terminal punctuation marks (periods, exclamation marks, question marks) followed by whitespace, and automatically capitalizes the first character of the subsequent sentence."
  },
  {
    question: "Can I convert text copied from PDFs with awkward line breaks?",
    answer: "Yes! The sentence case converter cleans up awkward caps and formats sentences smoothly. You can also pair it with our Text Cleaner tool to eliminate extraneous line breaks."
  },
  {
    question: "Is sentence case suitable for formal essays?",
    answer: "Yes. Sentence case is the standard writing format for body paragraphs across English academic papers, business reports, news articles, and general communication."
  }
];

const SentenceCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Sentence Case Converter - Capitalize Sentences Automatically | CaseConvert</title>
        <meta
          name="description"
          content="Free online Sentence Case converter. Automatically capitalize the first letter of each sentence in your text, essays, and paragraphs. Fast, free, and private."
        />
        <meta
          name="keywords"
          content="sentence case converter, sentence case tool, capitalize sentences, text to sentence case, sentence case online, sentence capitalization tool"
        />
        <link rel="canonical" href="https://caseconvert.online/sentence-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="Sentence Case Converter - Capitalize Sentences Automatically | CaseConvert" />
        <meta property="og:description" content="Effortlessly format all sentences in your text with standard grammatical sentence capitalization." />
        <meta property="og:url" content="https://caseconvert.online/sentence-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Sentence Case Converter - Auto Capitalize Sentences | CaseConvert" />
        <meta name="twitter:description" content="Fix grammar and capitalization across full paragraphs in one click." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Sentence Case Converter",
            "description": "Automatically capitalize the first letter of every sentence online.",
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
                "name": "Sentence Case Converter",
                "item": "https://caseconvert.online/sentence-case-converter"
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
              Grammar & Paragraph Formatting
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Sentence Case <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Format entire essays and paragraphs so that every sentence begins with a proper <strong>capital letter</strong> automatically.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="sentence" initialPlaceholder="Paste or type your paragraphs here to format into Sentence case..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">Sentence Case</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Sentence case</strong> is the universal standard for body copy in the English language. In sentence case, only the first word of a sentence is capitalized, with all subsequent common words rendered in lowercase.
                </p>
                <p>
                  When drafting quick notes, dictating via voice-to-text, or transcribing audio recordings, sentence punctuation and capitalization can frequently become disorganized. This tool restores proper sentence structures across thousands of words in a fraction of a second.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Sentence Case Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    this is the first sentence. HERE IS THE SECOND ONE! and the third? yes.
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Sentence Case Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    This is the first sentence. Here is the second one! And the third? Yes.
                  </div>
                </Card>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Key Benefits of <span className="text-gradient">Sentence Case Conversion</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Essays & Assignments",
                    desc: "Ensure all paragraph lines and citations conform to standard English grammar rules."
                  },
                  {
                    title: "Clean Copied Text",
                    desc: "Instantly fix all-caps or all-lowercase text pasted from PDF documents or scans."
                  },
                  {
                    title: "Email Drafts",
                    desc: "Polish quick informal drafts into professional, client-ready emails effortlessly."
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
            <FAQSection faqs={faqs} toolName="Sentence Case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/sentence-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SentenceCaseConverter;
