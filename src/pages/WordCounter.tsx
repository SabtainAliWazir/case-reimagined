import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, Hash, Type, AlignLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";

const faqs = [
  {
    question: "How accurate is the word count?",
    answer: "Our word counter uses the same algorithm as Microsoft Word - splitting text by whitespace. It's 100% accurate for standard text and handles multiple spaces correctly."
  },
  {
    question: "Does word counter work offline?",
    answer: "Yes! Once loaded, the tool works entirely in your browser with no internet required. Your text never leaves your device."
  },
  {
    question: "How is reading time calculated?",
    answer: "Reading time is based on the average reading speed of 200 words per minute. Speaking time uses 150 words per minute, which is typical for presentations."
  },
  {
    question: "Can I count words in a PDF or Word document?",
    answer: "Copy the text from your document and paste it here. The counter will instantly show all statistics. For best results, use our Text Cleaner first to remove any formatting issues."
  }
];

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
    lines: text.split(/\n/).filter(l => l.trim()).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 150),
  };

  const statCards = [
    { label: "Characters", value: stats.characters, icon: Hash },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: Hash },
    { label: "Words", value: stats.words, icon: Type },
    { label: "Sentences", value: stats.sentences, icon: AlignLeft },
    { label: "Paragraphs", value: stats.paragraphs, icon: FileText },
    { label: "Lines", value: stats.lines, icon: AlignLeft },
    { label: "Reading Time", value: `${stats.readingTime} min`, icon: Clock },
    { label: "Speaking Time", value: `${stats.speakingTime} min`, icon: Clock },
  ];

  return (
    <>
      <Helmet>
        <title>Word Counter - Count Words, Characters & Sentences |CaseConvert</title>
        <meta name="description" content="Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators." />
        <meta name="keywords" content="word counter, character counter, sentence counter, paragraph counter, reading time calculator, word count online" />
        <link rel="canonical" href="https://caseconvert.online/word-counter" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Word <span className="text-gradient">Counter</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Count words, characters, sentences, and more. Get reading and speaking time estimates.
              </p>
            </div>

            <Card className="glass shadow-card p-6 mb-8 animate-fade-in-delay-1">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-delay-2">
              {statCards.map((stat) => (
                <Card key={stat.label} className="glass shadow-card p-4 text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <FAQSection faqs={faqs} toolName="Word Counter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/word-counter" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WordCounter;
