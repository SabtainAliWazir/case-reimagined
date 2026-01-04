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
        <title>ConvertCase - Free Online Text Case Converter Tool</title>
        <meta name="description" content="Convert text between UPPERCASE, lowercase, Title Case, Sentence case and more. Free online text case converter - fast, private, and works in your browser." />
        <link rel="canonical" href="https://caseconvert.online/" />
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

          <Features />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
