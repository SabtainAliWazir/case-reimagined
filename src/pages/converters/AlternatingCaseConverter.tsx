import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Alternating Case (sPoNgEbOb cAsE)?",
    answer: "Alternating case (or Mocking Spongebob case) alternates between lowercase and uppercase letters throughout a string of text (e.g. 'yOu cAnNoT dO tHaT')."
  },
  {
    question: "Why is alternating case so popular?",
    answer: "It became universally famous through the viral Mocking SpongeBob meme and internet culture to convey sarcasm, satire, parody, and humorous disbelief across Twitter/X, TikTok, Reddit, and Discord."
  },
  {
    question: "How does this generator alternate the letters?",
    answer: "Our tool alternates letters character-by-character while maintaining spacing and punctuation so the mocking cadence looks visually balanced."
  },
  {
    question: "Can I copy the meme text with one click?",
    answer: "Yes! Click the 'Copy to Clipboard' button or use the auto-select box to copy directly to your clipboard for instant pasting into Discord, social media, or gaming chats."
  }
];

const AlternatingCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Alternating Case Converter - Mocking SpongeBob Text Generator | CaseConvert</title>
        <meta
          name="description"
          content="Free online alternating case converter (aLtErNaTiNg cAsE). Generate mocking SpongeBob meme text, sarcasm text, and stylized social media captions instantly."
        />
        <meta
          name="keywords"
          content="alternating case converter, spongebob text generator, mocking text generator, sarcastic text converter, meme text generator, alternating caps online"
        />
        <link rel="canonical" href="https://caseconvert.online/alternating-case-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="Alternating Case Converter - Mocking SpongeBob Text Generator | CaseConvert" />
        <meta property="og:description" content="Generate sarcastic aLtErNaTiNg cAsE and SpongeBob meme text in one click." />
        <meta property="og:url" content="https://caseconvert.online/alternating-case-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Alternating Case Converter - Meme Text Generator | CaseConvert" />
        <meta name="twitter:description" content="Transform regular text into hilarious mocking alternating case text." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Alternating Case Meme Generator",
            "description": "Convert text into alternating lowercase and uppercase SpongeBob meme text online.",
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
                "name": "Alternating Case Converter",
                "item": "https://caseconvert.online/alternating-case-converter"
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
              Meme & Social Media Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              aLtErNaTiNg <span className="text-transparent bg-clip-text bg-gradient-text">cAsE</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Generate <strong>mocking SpongeBob sarcasm text</strong> and alternating case captions for Discord, Twitter/X, and social media.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="alternating" initialPlaceholder="Type what someone said to generate mocking sarcasm meme text..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">Alternating Case (SpongeBob Mocking Text)</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Alternating case</strong> (frequently called <em>Mocking SpongeBob text</em> or <em>sarcasm font</em>) toggles every consecutive letter between lowercase and uppercase. It gained massive cultural popularity as a way to visually represent a mocking tone of voice in written digital communication without needing tone indicators.
                </p>
                <p>
                  Typing out alternating caps manually on a keyboard or smartphone screen is slow and tedious. CaseConvert instantly transforms entire paragraphs of text into mocking case with live copy-to-clipboard support.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Alternating Case Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    You cannot rank in Google without paying for backlinks.
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Alternating Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    yOu cAnNoT rAnK iN gOoGlE wItHoUt pAyInG fOr bAcKlInKs.
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Alternating Case Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/alternating-case-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlternatingCaseConverter;
