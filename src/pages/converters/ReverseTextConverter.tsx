import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is a Reverse Text generator?",
    answer: "A reverse text generator takes your normal forward text and inverts the order of every single character, spelling everything backwards from right-to-left (e.g. 'CaseConvert' becomes 'trevnoCesaC')."
  },
  {
    question: "Why would someone reverse text?",
    answer: "Common use cases include creating fun puzzles, checking for palindromes, encoding secret puzzle clues, creating unique social media bios, and cybersecurity string obfuscation tests."
  },
  {
    question: "Does it reverse multiline text correctly?",
    answer: "Yes! The tool processes lines and characters accurately, giving you instant backwards text with live character and word counts."
  },
  {
    question: "Can I reverse words instead of individual characters?",
    answer: "Our Text Formatter and Case Converter tools offer multiple transformation modes including full character reversal and word-level transformations."
  }
];

const ReverseTextConverter = () => {
  return (
    <>
      <Helmet>
        <title>Reverse Text Generator - Spell Text Backwards Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online reverse text generator (esreveR). Invert characters and spell words backwards instantly. Fast, private, browser-based backwards text creator."
        />
        <meta
          name="keywords"
          content="reverse text generator, spell backwards online, backwards text generator, reverse string tool, backwards text maker, mirror text generator"
        />
        <link rel="canonical" href="https://caseconvert.online/reverse-text-generator" />

        {/* Social Meta */}
        <meta property="og:title" content="Reverse Text Generator - Spell Text Backwards Online | CaseConvert" />
        <meta property="og:description" content="Flip and spell any piece of text backwards instantly with our free browser utility." />
        <meta property="og:url" content="https://caseconvert.online/reverse-text-generator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Reverse Text Generator - Backwards Text Maker | CaseConvert" />
        <meta name="twitter:description" content="Reverse any string or paragraph backwards in real-time." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Reverse Text Generator",
            "description": "Invert character order and spell text backwards instantly online.",
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
                "name": "Reverse Text Generator",
                "item": "https://caseconvert.online/reverse-text-generator"
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
              Text Fun & Encryption Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Reverse Text <span className="text-transparent bg-clip-text bg-gradient-text">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Spell sentences, words, and full paragraphs <strong>backwards (esreveR)</strong> with real-time character and word counters.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="reverse" initialPlaceholder="Enter any text here to see it spelled backwards in real-time..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is a <span className="text-gradient">Reverse Text Generator</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  A <strong>reverse text generator</strong> is an online string manipulation tool that reverses the chronological sequence of characters in a string. The last character becomes the first, and the first becomes the last.
                </p>
                <p>
                  Whether you are testing whether a word is a palindrome (such as <em>racecar</em> or <em>madam</em>), crafting puzzle clues for an escape room, or styling social media captions, this tool executes clean backwards string transformations in your browser.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Reverse Text Example</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    Antigravity Next Generation Engineering
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Reversed Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    gnireenignE noitareneG txeN ytivargitnA
                  </div>
                </Card>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Reverse Text Generator" />

            {/* Related Tools */}
            <RelatedTools currentPath="/reverse-text-generator" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ReverseTextConverter;
