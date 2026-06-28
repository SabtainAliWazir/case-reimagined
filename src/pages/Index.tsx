import { Header } from "@/components/Header";
import { TextConverter } from "@/components/TextConverter";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Hash, Binary, Radio, Sparkles, Eraser, Braces, KeyRound, FileText, Code, Link2, Fingerprint, Calculator, Wallet, TrendingUp, FolderArchive, FileArchive, Image as ImageIcon } from "lucide-react";

import { allCalculators } from "@/pages/CalculatorsIndex";

const tools = [
  // Text & Dev
  {
    category: "Text & Dev",
    href: "/word-counter",
    icon: Hash,
    title: "Word Counter",
    description: "Count words, characters, sentences, and estimate reading time.",
  },
  {
    category: "Text & Dev",
    href: "/text-formatter",
    icon: Sparkles,
    title: "Text Formatter",
    description: "Create strikethrough, underline, upside down, and fancy text styles.",
  },
  {
    category: "Text & Dev",
    href: "/binary-translator",
    icon: Binary,
    title: "Binary Translator",
    description: "Convert text to binary code and binary back to text.",
  },
  {
    category: "Text & Dev",
    href: "/morse-translator",
    icon: Radio,
    title: "Morse Translator",
    description: "Translate text to morse code with audio playback.",
  },
  {
    category: "Text & Dev",
    href: "/text-cleaner",
    icon: Eraser,
    title: "Text Cleaner",
    description: "Remove extra spaces, duplicate lines, and clean messy text from PDFs.",
  },
  {
    category: "Text & Dev",
    href: "/json-formatter",
    icon: Braces,
    title: "JSON Formatter",
    description: "Beautify, minify, and validate JSON data online.",
  },
  {
    category: "Text & Dev",
    href: "/password-generator",
    icon: KeyRound,
    title: "Password Generator",
    description: "Generate strong, secure random passwords instantly.",
  },
  {
    category: "Text & Dev",
    href: "/lorem-ipsum",
    icon: FileText,
    title: "Lorem Ipsum",
    description: "Generate placeholder text for designs and mockups.",
  },
  {
    category: "Text & Dev",
    href: "/base64",
    icon: Code,
    title: "Base64 Encoder",
    description: "Encode and decode Base64 strings online.",
  },
  {
    category: "Text & Dev",
    href: "/url-encoder",
    icon: Link2,
    title: "URL Encoder",
    description: "Encode and decode URLs with special characters.",
  },
  {
    category: "Text & Dev",
    href: "/hash-generator",
    icon: Fingerprint,
    title: "Hash Generator",
    description: "Generate MD5, SHA-256, SHA-512 hashes from text.",
  },
  // File Tools
  {
    category: "File Tools",
    href: "/zip-creator",
    icon: FileArchive,
    title: "ZIP Creator",
    description: "Securely compress and bundle multiple files into a ZIP archive.",
  },
  {
    category: "File Tools",
    href: "/zip-extractor",
    icon: FolderArchive,
    title: "ZIP Extractor",
    description: "Extract files from a ZIP archive directly in your browser.",
  },
  {
    category: "File Tools",
    href: "/image-converter",
    icon: ImageIcon,
    title: "Image Converter",
    description: "Convert images between PNG, JPEG, and WebP formats instantly.",
  },
  // We append all 76 financial calculators dynamically to pass root domain PageRank directly to them
  ...allCalculators
];

const categories = ["Text & Dev", "File Tools", ...Array.from(new Set(allCalculators.map(t => t.category)))];


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
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        
        {/* Global Ambient Background */}
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        <Header />
        <main className="pt-12 pb-24 relative z-10">
          
          {/* Dribbble Style Hero Intro */}
          <section className="px-4 mb-16 text-center max-w-3xl mx-auto animate-fade-in relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              The Ultimate Text Toolkit
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm">
              Transform Text <span className="text-transparent bg-clip-text bg-gradient-text">Naturally.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Convert between formats, generate secure passwords, and beautify code. 
              A purely browser-based suite crafted for precision and privacy.
            </p>
          </section>

          {/* Core Utility Section */}
          <section id="converter" className="px-4 max-w-[1000px] mx-auto relative">
            {/* Decorative background leaf/blob behind converter */}
            <div className="absolute top-0 right-10 w-72 h-72 bg-secondary/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-blob" />
            <div className="absolute -bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-blob animation-delay-2000" />
            
            <TextConverter />
          </section>

          {/* Other Tools Section */}
          <section className="px-4 mt-32 relative">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Explore More Tools
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Explore our collection of free text utilities to enhance your workflow.
                </p>
              </div>
              <div className="space-y-16">
                {categories.map((category) => {
                  const categoryTools = tools.filter(t => t.category === category);
                  if (categoryTools.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
                        {category}
                        <div className="h-px bg-border flex-1" />
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categoryTools.map((tool) => (
                          <Link key={tool.href} to={tool.href}>
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 h-full rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow group">
                              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <tool.icon className="w-6 h-6 text-primary" />
                              </div>
                              <h3 className="font-heading font-semibold text-lg mb-2">{tool.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
                    <Card key={item.type} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
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
                    <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4 text-center">
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
