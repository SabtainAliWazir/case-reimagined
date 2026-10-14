import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is an UPPERCASE text converter?",
    answer: "An uppercase converter transforms all standard letters in your text into capital letters (ALL CAPS). For example, 'hello world' instantly becomes 'HELLO WORLD'."
  },
  {
    question: "When should I use UPPERCASE text?",
    answer: "Uppercase text is typically used for headlines, acronyms (NASA, HTML), legal disclaimers, warning signs, emphasis, and database formatting where case uniformity is required."
  },
  {
    question: "Does converting to uppercase affect punctuation or numbers?",
    answer: "No. Numbers, punctuation marks, emojis, and special symbols are preserved exactly as they are—only alphabetical characters are capitalized."
  },
  {
    question: "Is there a text length limit on CaseConvert?",
    answer: "No! You can convert single words, whole articles, or entire books. All processing happens entirely client-side in your web browser for speed and privacy."
  }
];

const UppercaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>Uppercase Converter - Convert Text to ALL CAPS Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online uppercase converter. Transform any text into capital letters (ALL CAPS) instantly. Fast, private, browser-based formatting with live character and word counter."
        />
        <meta
          name="keywords"
          content="uppercase converter, all caps generator, convert to uppercase, capitalize text, capital letter converter, text to uppercase, case convert"
        />
        <link rel="canonical" href="https://caseconvert.online/uppercase-converter" />

        {/* Social Media Meta */}
        <meta property="og:title" content="Uppercase Converter - Convert Text to ALL CAPS Online | CaseConvert" />
        <meta property="og:description" content="Instantly convert text to UPPERCASE / ALL CAPS with our free browser utility." />
        <meta property="og:url" content="https://caseconvert.online/uppercase-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Uppercase Converter - ALL CAPS Generator | CaseConvert" />
        <meta name="twitter:description" content="Instantly transform your text into capital letters with live word and character counts." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Uppercase Text Converter",
            "description": "Transform plain text into capital letters (ALL CAPS) instantly online.",
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
                "name": "Uppercase Converter",
                "item": "https://caseconvert.online/uppercase-converter"
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
              Uppercase <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert your text, paragraphs, or documents into <strong>ALL CAPS</strong> instantly. Fast, 100% private, and runs directly in your browser.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="upper" initialPlaceholder="Paste or type your text here to convert to UPPERCASE..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is an <span className="text-gradient">Uppercase Converter</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  An <strong>uppercase converter</strong> (also called an <em>ALL CAPS generator</em>) is an online text transformer that changes every lowercase character into its capitalized counterpart. Whether you have accidental mixed-case typing, copied text from a PDF, or need to prepare code identifiers, this tool standardizes your entire message in milliseconds.
                </p>
                <p>
                  Unlike offline word processors where shortcuts can be cumbersome, our web tool runs real-time string transformations locally in your browser. Your data is never uploaded to any remote server or stored in a database.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Uppercase Examples</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    The quick brown fox jumps over the lazy dog.
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Uppercase Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
                  </div>
                </Card>
              </div>
            </div>

            {/* Common Use Cases */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Best Uses for <span className="text-gradient">ALL CAPS</span>
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Headlines & Banners",
                    desc: "Creating bold visual hierarchy for marketing graphics, posters, and YouTube thumbnails."
                  },
                  {
                    title: "Legal & Contracts",
                    desc: "Formatting mandatory disclaimers, liability waivers, and indemnity clauses."
                  },
                  {
                    title: "Coding Constants",
                    desc: "Formatting global constants and environment variables (e.g. API_KEY, MAX_RETRIES)."
                  }
                ].map((item) => (
                  <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <h3 className="font-semibold text-base mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Excel & Google Sheets Formulas Table */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                How to Uppercase in <span className="text-gradient">Excel &amp; Google Sheets</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Need to capitalize thousands of rows in a spreadsheet? Use these exact native formulas without needing any plugins or macros:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/20 dark:border-white/5 bg-card/60 backdrop-blur-xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr>
                      <th className="p-4">Application</th>
                      <th className="p-4">Formula</th>
                      <th className="p-4">Sample Input</th>
                      <th className="p-4">Output</th>
                      <th className="p-4">How to Apply</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-foreground/90 font-mono text-xs md:text-sm">
                    <tr>
                      <td className="p-4 font-sans font-medium">Microsoft Excel</td>
                      <td className="p-4 text-primary font-bold">=UPPER(A2)</td>
                      <td className="p-4 text-muted-foreground">john doe</td>
                      <td className="p-4 text-emerald-400 font-bold">JOHN DOE</td>
                      <td className="p-4 font-sans text-xs text-muted-foreground">Type in B2, double-click fill handle down.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-sans font-medium">Google Sheets</td>
                      <td className="p-4 text-primary font-bold">=UPPER(A2)</td>
                      <td className="p-4 text-muted-foreground">sales lead</td>
                      <td className="p-4 text-emerald-400 font-bold">SALES LEAD</td>
                      <td className="p-4 font-sans text-xs text-muted-foreground">Drag cell down or press Ctrl+Enter.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-sans font-medium">Sheets (Entire Column)</td>
                      <td className="p-4 text-primary font-bold">=ARRAYFORMULA(UPPER(A2:A))</td>
                      <td className="p-4 text-muted-foreground">Multiple rows</td>
                      <td className="p-4 text-emerald-400 font-bold">ALL UPPERCASE</td>
                      <td className="p-4 font-sans text-xs text-muted-foreground">Put in cell B2 to convert the entire column automatically.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-sans font-medium">Excel Flash Fill</td>
                      <td className="p-4 text-primary font-bold">Ctrl + E</td>
                      <td className="p-4 text-muted-foreground">mixed text</td>
                      <td className="p-4 text-emerald-400 font-bold">MIXED TEXT</td>
                      <td className="p-4 font-sans text-xs text-muted-foreground">Type uppercase once in B2, press Ctrl+E in B3.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Keyboard Shortcuts Cheat Sheet */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Keyboard Shortcuts to <span className="text-gradient">Uppercase Text</span>
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">MS Word / Outlook</div>
                  <div className="text-lg font-mono font-bold my-2 text-foreground">Shift + F3</div>
                  <p className="text-xs text-muted-foreground">Highlight text and press Shift+F3 to toggle lowercase &rarr; Title Case &rarr; UPPERCASE.</p>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Google Docs</div>
                  <div className="text-sm font-mono font-bold my-2 text-foreground">Format &rarr; Text</div>
                  <p className="text-xs text-muted-foreground">Go to Menu: Format &gt; Text &gt; Capitalization &gt; UPPERCASE.</p>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">VS Code</div>
                  <div className="text-sm font-mono font-bold my-2 text-foreground">Ctrl + Shift + P</div>
                  <p className="text-xs text-muted-foreground">Open Command Palette and search for "Transform to Uppercase".</p>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">macOS Universal</div>
                  <div className="text-sm font-mono font-bold my-2 text-foreground">Edit &rarr; Transform</div>
                  <p className="text-xs text-muted-foreground">In any native Mac app: Edit &gt; Transformations &gt; Make Upper Case.</p>
                </Card>
              </div>
            </div>

            {/* Developer Code Reference */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Developer Cheat Sheet: <span className="text-gradient">Uppercase in Code</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">JavaScript / TypeScript</span>
                    <span className="text-xs font-mono text-muted-foreground">.toUpperCase()</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                    <code>{`const text = "hello world";\nconst upper = text.toUpperCase();\n// Output: "HELLO WORLD"`}</code>
                  </pre>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Python</span>
                    <span className="text-xs font-mono text-muted-foreground">.upper()</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                    <code>{`text = "hello world"\nupper = text.upper()\n# Output: "HELLO WORLD"`}</code>
                  </pre>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">SQL (PostgreSQL, MySQL)</span>
                    <span className="text-xs font-mono text-muted-foreground">UPPER()</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                    <code>{`SELECT UPPER(email) AS normalized_email\nFROM users\nWHERE status = 'ACTIVE';`}</code>
                  </pre>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">PHP</span>
                    <span className="text-xs font-mono text-muted-foreground">strtoupper()</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-background/80 font-mono text-xs text-foreground overflow-x-auto border border-border">
                    <code>{`$text = "hello world";\n$upper = strtoupper($text);\n// Output: "HELLO WORLD"`}</code>
                  </pre>
                </Card>
              </div>
            </div>

            {/* Readability & Typographical Rule */}
            <Card className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
              <h3 className="font-semibold text-base mb-2 text-primary">Typography Best Practice: When to Avoid ALL CAPS</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While uppercase text is ideal for short headlines, badges, and warnings, scientific readability studies show that reading speed drops by <strong>14% to 20%</strong> when reading entire paragraphs in ALL CAPS. This occurs because lowercase text provides distinct vertical ascenders (d, b, t, h) and descenders (p, q, y, g) that human eyes use to rapidly recognize word shapes. For body paragraphs, use <strong>Sentence Case</strong> or <strong>Title Case</strong> instead.
              </p>
            </Card>
            <FAQSection faqs={faqs} toolName="Uppercase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/uppercase-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default UppercaseConverter;
