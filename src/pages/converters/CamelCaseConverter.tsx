import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextConverter } from "@/components/TextConverter";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "What is camelCase?",
    answer: "camelCase is a programming naming convention where compound words or phrases are written without spaces. The first word starts with a lowercase letter, and every subsequent word starts with a capital letter (e.g. 'getUserProfileData')."
  },
  {
    question: "Which programming languages use camelCase?",
    answer: "camelCase is the primary naming standard for variables, properties, functions, and methods in JavaScript, TypeScript, Java, Swift, Kotlin, Go, and C#."
  },
  {
    question: "How is camelCase different from PascalCase?",
    answer: "camelCase starts with a lowercase letter ('myVariableName'), whereas PascalCase (UpperCamelCase) starts with a capital letter ('MyVariableName')."
  },
  {
    question: "Does this converter remove special characters and spaces?",
    answer: "Yes! It strips out all spaces, hyphens, and special symbols, joining the words into a clean, compliant programming identifier."
  }
];

const CamelCaseConverter = () => {
  return (
    <>
      <Helmet>
        <title>camelCase Converter - Convert Text to camelCase Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online camelCase converter for developers. Convert text, sentences, snake_case, and kebab-case into camelCase format instantly. Fast, private, in-browser tool."
        />
        <meta
          name="keywords"
          content="camelcase converter, text to camelcase, camelcase generator, string to camelcase, javascript variable naming tool, camel case online"
        />
        <link rel="canonical" href="https://caseconvert.online/camelcase-converter" />

        {/* Social Meta */}
        <meta property="og:title" content="camelCase Converter - Convert Text to camelCase Online | CaseConvert" />
        <meta property="og:description" content="Instantly convert plain text, snake_case, or kebab-case into clean camelCase code identifiers." />
        <meta property="og:url" content="https://caseconvert.online/camelcase-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="camelCase Converter - Developer Code Tool | CaseConvert" />
        <meta name="twitter:description" content="Transform sentences and strings to JavaScript-compliant camelCase variables." />

        {/* Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "camelCase Text Converter",
            "description": "Convert plain text and strings to camelCase format online.",
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
                "name": "camelCase Converter",
                "item": "https://caseconvert.online/camelcase-converter"
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
              camelCase <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert plain text, sentences, or snake_case identifiers into JavaScript/TypeScript compliant <strong>camelCase</strong> instantly.
            </p>
          </section>

          {/* Converter Tool */}
          <section className="max-w-[1000px] mx-auto mb-16">
            <TextConverter defaultMode="camel" initialPlaceholder="Enter text or variable names to convert to camelCase (e.g. user account status)..." />
          </section>

          {/* Deep On-Page SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">camelCase</span> in Programming?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>camelCase</strong> (stylized with a lowercase 'c' and uppercase 'C') is a naming standard used heavily in software development. In camelCase, multi-word variable or method names are combined without spaces, with the first word remaining lowercase and each following word starting with a capital letter.
                </p>
                <p>
                  Because spaces are invalid in variable syntax across nearly all modern programming languages, camelCase provides high readability while maintaining valid syntax across languages like JavaScript, TypeScript, Java, and Swift.
                </p>
              </div>
            </div>

            {/* Quick Example Card */}
            <div>
              <h2 className="text-2xl font-bold mb-4">camelCase Conversion Examples</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original Input</div>
                  <div className="text-sm font-mono bg-background/60 p-3 rounded-xl border border-border">
                    fetch user auth token
                  </div>
                </Card>
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">camelCase Output</div>
                  <div className="text-sm font-mono text-primary font-bold bg-primary/5 p-3 rounded-xl border border-primary/20">
                    fetchUserAuthToken
                  </div>
                </Card>
              </div>
            </div>

            {/* Comparison Table */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Programming Case Styles Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-border/50 rounded-2xl overflow-hidden">
                  <thead className="bg-muted/50 text-foreground font-semibold">
                    <tr>
                      <th className="p-3 border-b border-border/50">Style Name</th>
                      <th className="p-3 border-b border-border/50">Example</th>
                      <th className="p-3 border-b border-border/50">Common Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-muted-foreground font-mono text-xs">
                    <tr>
                      <td className="p-3 font-sans font-medium text-foreground">camelCase</td>
                      <td className="p-3 text-primary font-bold">userProfileDetails</td>
                      <td className="p-3 font-sans">JavaScript variables, functions, methods</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-foreground">PascalCase</td>
                      <td className="p-3">UserProfileDetails</td>
                      <td className="p-3 font-sans">React components, Classes, Types</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-foreground">kebab-case</td>
                      <td className="p-3">user-profile-details</td>
                      <td className="p-3 font-sans">URLs, CSS classes, HTML attributes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-foreground">snake_case</td>
                      <td className="p-3">user_profile_details</td>
                      <td className="p-3 font-sans">Python variables, SQL database columns</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="camelCase Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/camelcase-converter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CamelCaseConverter;
