import { Header } from "@/components/Header";
import { TextConverter } from "@/components/TextConverter";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Hash, 
  Binary, 
  Radio, 
  Sparkles, 
  Eraser, 
  Braces, 
  KeyRound, 
  FileText, 
  Code, 
  Link2, 
  Fingerprint, 
  Calculator, 
  FolderArchive, 
  FileArchive, 
  Image as ImageIcon, 
  Clock, 
  Type,
  ArrowRight,
  BookOpen
} from "lucide-react";

import { allCalculators } from "@/pages/CalculatorsIndex";

const tools = [
  // Case Converters
  {
    category: "Case Converters",
    href: "/uppercase-converter",
    icon: Type,
    title: "Uppercase Converter",
    description: "Convert any text into capital letters (ALL CAPS) instantly.",
  },
  {
    category: "Case Converters",
    href: "/lowercase-converter",
    icon: Type,
    title: "Lowercase Converter",
    description: "Convert text and mixed capitals into small letters.",
  },
  {
    category: "Case Converters",
    href: "/title-case-converter",
    icon: Type,
    title: "Title Case Converter",
    description: "Capitalize headlines, books, and articles according to APA/Chicago rules.",
  },
  {
    category: "Case Converters",
    href: "/sentence-case-converter",
    icon: Type,
    title: "Sentence Case Converter",
    description: "Capitalize the first letter of each sentence automatically.",
  },
  {
    category: "Case Converters",
    href: "/capitalized-case-converter",
    icon: Type,
    title: "Capitalized Case Converter",
    description: "Capitalize the first letter of every word (Start Case).",
  },
  {
    category: "Case Converters",
    href: "/camelcase-converter",
    icon: Code,
    title: "camelCase Converter",
    description: "Convert text and variable names to camelCase format.",
  },
  {
    category: "Case Converters",
    href: "/kebab-case-converter",
    icon: Link2,
    title: "kebab-case Converter",
    description: "Convert text and headlines into clean, hyphenated URL slugs.",
  },
  {
    category: "Case Converters",
    href: "/pascal-case-converter",
    icon: Code,
    title: "PascalCase Converter",
    description: "Convert text to PascalCase (UpperCamelCase) for classes and React.",
  },
  {
    category: "Case Converters",
    href: "/camelcase-to-snake-case",
    icon: Code,
    title: "camelCase to snake_case",
    description: "Convert JavaScript variables into Python and SQL snake_case identifiers.",
  },
  {
    category: "Case Converters",
    href: "/snake-case-to-camelcase",
    icon: Code,
    title: "snake_case to camelCase",
    description: "Convert database columns and Python dictionaries into JavaScript camelCase.",
  },
  {
    category: "Case Converters",
    href: "/pascalcase-to-camelcase",
    icon: Code,
    title: "PascalCase to camelCase",
    description: "Convert React component and class names into variable identifiers.",
  },
  {
    category: "Case Converters",
    href: "/kebab-case-to-camelcase",
    icon: Link2,
    title: "kebab-case to camelCase",
    description: "Convert CSS property styles into React inline style camelCase keys.",
  },
  {
    category: "Case Converters",
    href: "/alternating-case-converter",
    icon: Sparkles,
    title: "Alternating Case Converter",
    description: "Generate mocking SpongeBob meme text and sarcasm captions.",
  },
  {
    category: "Case Converters",
    href: "/reverse-text-generator",
    icon: Type,
    title: "Reverse Text Generator",
    description: "Spell text backwards (esreveR) in real-time.",
  },
  // Text & Dev
  {
    category: "Text & Dev",
    href: "/slug-generator",
    icon: Link2,
    title: "SEO Slug Generator",
    description: "Generate clean, search-engine-friendly URL slugs from text.",
  },
  {
    category: "Text & Dev",
    href: "/small-text-generator",
    icon: Sparkles,
    title: "Small Text Generator",
    description: "Generate tiny superscript, subscript, and small caps for bios.",
  },
  {
    category: "Text & Dev",
    href: "/binary-to-hex",
    icon: Binary,
    title: "Binary to Hex",
    description: "Convert Base-2 binary code to Base-16 hexadecimal strings.",
  },
  {
    category: "Text & Dev",
    href: "/binary-to-morse-code",
    icon: Binary,
    title: "Binary to Morse Code",
    description: "Translate binary bits to Morse code dots & dashes with audio beeps.",
  },
  {
    category: "Text & Dev",
    href: "/base64-to-hex",
    icon: Binary,
    title: "Base64 to Hex Converter",
    description: "Decode Base64 strings directly into hexadecimal format.",
  },
  {
    category: "Text & Dev",
    href: "/word-frequency-counter",
    icon: Hash,
    title: "Word Frequency Counter",
    description: "Find the most common words and keyword density in your text.",
  },
  {
    category: "Text & Dev",
    href: "/text-diff-checker",
    icon: FileText,
    title: "Text Diff Checker",
    description: "Compare two text documents and find the exact differences.",
  },
  {
    category: "Text & Dev",
    href: "/caesar-cipher",
    icon: KeyRound,
    title: "Caesar Cipher (ROT13)",
    description: "Encrypt and decrypt text using the classic Roman shift cipher.",
  },
  {
    category: "Text & Dev",
    href: "/word-counter",
    icon: Hash,
    title: "Word Counter",
    description: "Count words, characters, sentences, paragraphs and reading time.",
  },
  {
    category: "Text & Dev",
    href: "/text-formatter",
    icon: Eraser,
    title: "Text Formatter",
    description: "Clean up messy text, remove extra spaces, and standardize formatting.",
  },
  {
    category: "Text & Dev",
    href: "/text-cleaner",
    icon: Eraser,
    title: "Text Cleaner",
    description: "Remove HTML tags, special characters, and numbers from text.",
  },
  {
    category: "Text & Dev",
    href: "/json-formatter",
    icon: Braces,
    title: "JSON Formatter",
    description: "Beautify, validate, and format messy JSON strings into readable code.",
  },
  {
    category: "Text & Dev",
    href: "/base64",
    icon: Binary,
    title: "Base64 Encoder",
    description: "Encode and decode text and data to Base64 format.",
  },
  {
    category: "Text & Dev",
    href: "/url-encoder",
    icon: Link2,
    title: "URL Encoder",
    description: "Safely encode strings for URLs and decode percent-encoded links.",
  },
  {
    category: "Text & Dev",
    href: "/hash-generator",
    icon: Fingerprint,
    title: "Hash Generator",
    description: "Generate MD5, SHA-256, SHA-512 hashes from text.",
  },
  {
    category: "Text & Dev",
    href: "/epoch-converter",
    icon: Clock,
    title: "Epoch Converter",
    description: "Convert Unix timestamps to dates and vice versa.",
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
  ...allCalculators
];

const categories = ["Case Converters", "Text & Dev", "File Tools", ...Array.from(new Set(allCalculators.map(t => t.category)))];

// Motionix category tint surfaces
const categoryTints: Record<string, string> = {
  "Case Converters": "bg-[#faf5ee] dark:bg-card/80",
  "Text & Dev": "bg-[#eef6f1] dark:bg-card/80",
  "File Tools": "bg-[#faefee] dark:bg-card/80",
  "Financial": "bg-[#edf3f8] dark:bg-card/80",
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Case Converter - Free Online Text Case Conversion Tools</title>
        <meta name="description" content="Free online text tools: convert between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and calculate finances. Fast and private." />
        <link rel="canonical" href="https://caseconvert.online/" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative">
        <Header />
        
        <main className="pt-10 pb-24 relative z-10">
          
          {/* Motionix Editorial Hero */}
          <section className="px-4 mb-14 text-center max-w-4xl mx-auto animate-fade-in">
            <p className="eyebrow-mono mb-4 text-primary flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              CASE-REIMAGINED / BROWSER-FIRST TOOLS
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 text-foreground leading-[1.08]">
              Tools that <em className="font-serif italic font-normal text-primary">actually finish</em> the job.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Convert cases, format code, and compute finance — no uploads, no signups, no ads in your face. 
              Your files and text never leave your device.
            </p>
          </section>

          {/* Main Interactive Converter Tool */}
          <section id="converter" className="px-4 max-w-[1000px] mx-auto mb-20 relative">
            <TextConverter />
          </section>

          {/* Motionix 4-Step Process Strip */}
          <section className="border-y border-border/80 bg-muted/40 py-16 px-4 mb-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-10">
                <p className="eyebrow-mono text-primary mb-2">The Process</p>
                <h2 className="font-serif text-3xl md:text-4xl italic text-foreground">Four steps. Zero mystery.</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "Drop your text", desc: "Paste your code, variables, or article draft directly into the editor." },
                  { step: "02", title: "Pick what to do", desc: "Select from 13 case options, JSON formatting, or hash generation in one click." },
                  { step: "03", title: "Processed locally", desc: "Calculations run natively on your device. Zero cloud latency, 100% private." },
                  { step: "04", title: "Copy & Ship", desc: "Instant clipboard export with character counts and zero watermarks." }
                ].map((item) => (
                  <div key={item.step} className="bg-card p-6 rounded-2xl border border-border/80 shadow-sm hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-primary font-semibold">{item.step}</span>
                      <span className="size-6 rounded-full border border-border grid place-items-center text-xs text-muted-foreground">→</span>
                    </div>
                    <h3 className="font-semibold text-base mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Catalog Section with Motionix Soft Tint Cards */}
          <section className="px-4 max-w-6xl mx-auto mb-24">
            <div className="text-center max-w-xl mx-auto mb-14">
              <p className="eyebrow-mono text-primary mb-2">The Catalog</p>
              <h2 className="font-serif text-3xl md:text-4xl italic text-foreground">Over 130+ Utilities.</h2>
              <p className="text-sm text-muted-foreground mt-2">Every tool runs in your browser with zero account required.</p>
            </div>

            <div className="space-y-16">
              {categories.map((category, catIdx) => {
                const categoryTools = tools.filter(t => t.category === category);
                if (categoryTools.length === 0) return null;
                const tintBg = categoryTints[category] || "bg-[#edf3f8] dark:bg-card/80";

                return (
                  <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-xs font-semibold text-primary">0{catIdx + 1} /</span>
                      <h3 className="text-2xl font-bold font-heading">{category}</h3>
                      <div className="h-px bg-border flex-1" />
                      <span className="font-mono text-xs text-muted-foreground">{categoryTools.length} tools</span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {categoryTools.map((tool) => (
                        <Link key={tool.href} to={tool.href} className="no-underline group">
                          <Card className={`${tintBg} border border-border/60 p-5 rounded-2xl h-full flex flex-col transition-all duration-200 hover:-translate-y-1 shadow-card hover:shadow-card-hover`}>
                            <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center mb-3 shadow-sm text-primary group-hover:scale-105 transition-transform">
                              <tool.icon className="w-5 h-5" />
                            </div>
                            <h4 className="font-semibold text-sm mb-1 text-foreground group-hover:text-primary transition-colors">{tool.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">{tool.description}</p>
                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary pt-1">
                              Open tool <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Blog Highlight Strip */}
          <section className="px-4 max-w-6xl mx-auto mb-20">
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow-mono text-primary mb-2">Editorial Guides</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Read our latest <span className="font-serif italic font-normal text-primary">guides & articles</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deep-dives on programming case conventions, SEO slug best practices, and algorithmic financial formulas.
                </p>
              </div>
              <Link to="/blog" className="btn-accent shrink-0">
                <BookOpen className="w-4 h-4" /> Explore Blog
              </Link>
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
