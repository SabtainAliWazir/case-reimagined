import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TextConverter } from "@/components/TextConverter";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Hash, Binary, Radio, Sparkles, Eraser, Braces, KeyRound, FileText, Code, Link2, Fingerprint } from "lucide-react";

const tools = [
  {
    href: "/word-counter",
    icon: Hash,
    title: "Word Counter",
    description: "Count words, characters, sentences, and estimate reading time.",
  },
  {
    href: "/text-formatter",
    icon: Sparkles,
    title: "Text Formatter",
    description: "Create strikethrough, underline, upside down, and fancy text styles.",
  },
  {
    href: "/binary-translator",
    icon: Binary,
    title: "Binary Translator",
    description: "Convert text to binary code and binary back to text.",
  },
  {
    href: "/morse-translator",
    icon: Radio,
    title: "Morse Translator",
    description: "Translate text to morse code with audio playback.",
  },
  {
    href: "/text-cleaner",
    icon: Eraser,
    title: "Text Cleaner",
    description: "Remove extra spaces, duplicate lines, and clean messy text from PDFs.",
  },
  {
    href: "/json-formatter",
    icon: Braces,
    title: "JSON Formatter",
    description: "Beautify, minify, and validate JSON data online.",
  },
  {
    href: "/password-generator",
    icon: KeyRound,
    title: "Password Generator",
    description: "Generate strong, secure random passwords instantly.",
  },
  {
    href: "/lorem-ipsum",
    icon: FileText,
    title: "Lorem Ipsum",
    description: "Generate placeholder text for designs and mockups.",
  },
  {
    href: "/base64",
    icon: Code,
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings online.",
  },
  {
    href: "/url-encoder",
    icon: Link2,
    title: "URL Encoder",
    description: "Encode and decode URLs with special characters.",
  },
  {
    href: "/hash-generator",
    icon: Fingerprint,
    title: "Hash Generator",
    description: "Generate MD5, SHA-256, SHA-512 hashes from text.",
  },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>CaseConvert - Free Online Text Case Converter Tool</title>
        <meta name="description" content="Convert text between UPPERCASE, lowercase, Title Case, Sentence case and more. Free online text case converter - fast, private, and works in your browser." />
        <link rel="canonical" href="https://caseconvert.online/" />

        {/* Home Page Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CaseConvert",
            "description": "Free online text case converter tool. Convert between uppercase, lowercase, title case, sentence case, and more.",
            "url": "https://caseconvert.online",
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
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://caseconvert.online/"
            }]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <section id="converter" className="px-4 pb-16">
            <TextConverter />
          </section>

          {/* Other Tools Section */}
          <section className="px-4 py-16 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  More Text <span className="text-gradient">Tools</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Explore our collection of free text utilities to enhance your workflow.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => (
                  <Link key={tool.href} to={tool.href}>
                    <Card className="glass shadow-card p-5 h-full hover:border-primary/50 transition-all hover:-translate-y-1">
                      <tool.icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* What is Case Converter */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  What is a <span className="text-gradient">Case Converter</span>?
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    A <strong>case converter</strong> is an online tool that transforms your text between different
                    capitalization styles instantly. Whether you need to convert text to <strong>UPPERCASE</strong>,
                    <strong> lowercase</strong>, <strong>Title Case</strong>, or <strong>Sentence case</strong>,
                    our free case converter handles it all with a single click.
                  </p>
                  <p>
                    Perfect for fixing text copied from PDFs, formatting titles and headings, preparing content
                    for social media, or simply correcting accidentally typed text in caps lock. All processing
                    happens in your browser - your text is never sent to any server.
                  </p>
                </div>
              </div>

              {/* Case Types Explained */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Text Case <span className="text-gradient">Types Explained</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { type: "UPPERCASE", example: "HELLO WORLD", desc: "All letters are capitalized. Used for emphasis, headings, and acronyms." },
                    { type: "lowercase", example: "hello world", desc: "All letters are small. Common for usernames, URLs, and casual text." },
                    { type: "Title Case", example: "Hello World", desc: "First letter of each major word is capitalized. Used for titles and headlines." },
                    { type: "Sentence case", example: "Hello world", desc: "First letter of sentences capitalized. Standard for paragraphs and content." },
                    { type: "aLtErNaTiNg cAsE", example: "hElLo WoRlD", desc: "Alternating caps for memes, sarcasm, or stylized text." },
                    { type: "slug-case", example: "hello-world", desc: "URL-friendly format with hyphens. Essential for blog post URLs." },
                  ].map((item) => (
                    <Card key={item.type} className="glass shadow-card p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{item.type}</h3>
                        <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{item.example}</code>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Who Uses <span className="text-gradient">Case Converters</span>?
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { emoji: "✍️", title: "Writers & Bloggers", desc: "Format titles and fix pasted text from PDFs instantly." },
                    { emoji: "💻", title: "Developers", desc: "Convert variable names between camelCase and slug-case formats." },
                    { emoji: "📱", title: "Social Media", desc: "Create eye-catching posts with alternating or uppercase text." },
                  ].map((item) => (
                    <Card key={item.title} className="glass shadow-card p-4 text-center">
                      <div className="text-3xl mb-3">{item.emoji}</div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Features />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
