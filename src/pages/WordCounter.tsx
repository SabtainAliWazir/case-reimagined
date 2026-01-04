import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Hash,
  Type,
  AlignLeft,
  Clock,
  Sparkles,
  BarChart3,
  Copy,
  Trash2
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";
import { toast } from "sonner";

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
    question: "What is keyword density?",
    answer: "Keyword density shows how often words appear in your text as a percentage. It helps SEO writers optimize content without over-using keywords (aim for 1-3%)."
  }
];

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = words.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))).size;

    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: wordCount,
      uniqueWords: text.trim() ? uniqueWords : 0,
      sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
      paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
      lines: text.split(/\n/).filter(l => l.trim()).length,
      readingTime: Math.ceil(wordCount / 200),
      speakingTime: Math.ceil(wordCount / 150),
    };
  }, [text]);

  // Keyword Density - Top 5 words
  const keywordDensity = useMemo(() => {
    if (!text.trim()) return [];

    const words = text.toLowerCase().match(/\b[a-zA-Z]{3,}\b/g) || [];
    const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'were', 'they', 'this', 'that', 'with', 'from', 'will', 'would', 'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'just', 'over', 'such', 'into', 'than', 'them', 'some', 'could']);

    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 2) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / (stats.words || 1)) * 100).toFixed(1)
      }));
  }, [text, stats.words]);

  const copyText = () => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const clearText = () => {
    setText("");
    toast.success("Cleared");
  };

  const mainStats = [
    { label: "Words", value: stats.words, icon: Type, color: "text-blue-500" },
    { label: "Characters", value: stats.characters, icon: Hash, color: "text-green-500" },
    { label: "Sentences", value: stats.sentences, icon: AlignLeft, color: "text-purple-500" },
    { label: "Paragraphs", value: stats.paragraphs, icon: FileText, color: "text-orange-500" },
  ];

  const detailedStats = [
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Unique Words", value: stats.uniqueWords },
    { label: "Lines", value: stats.lines },
  ];

  return (
    <>
      <Helmet>
        <title>Word Counter - Count Words, Characters & Reading Time | CaseConvert</title>
        <meta name="description" content="Free online word counter with keyword density analysis. Count words, characters, sentences, paragraphs. Get reading time, speaking time, and SEO keyword insights." />
        <meta name="keywords" content="word counter, character counter, keyword density, reading time calculator, word count online, SEO word counter, unique word counter" />
        <link rel="canonical" href="https://caseconvert.online/word-counter" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Word <span className="text-gradient">Counter</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Count words, characters, sentences, and analyze keyword density.
                Get instant reading and speaking time estimates.
              </p>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in-delay-1">
              {mainStats.map((stat) => (
                <Card key={stat.label} className="glass shadow-card p-4 text-center group hover:border-primary/50 transition-colors">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Text Area */}
            <Card className="glass shadow-card p-6 mb-6 animate-fade-in-delay-1">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-foreground">Your Text</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyText} className="gap-1 h-8">
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearText} className="gap-1 h-8">
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here to get instant word count, character count, and keyword analysis..."
                className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </Card>

            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-delay-2">
              {/* Time Estimates */}
              <Card className="glass shadow-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Time Estimates</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Reading Time</span>
                      <span className="font-medium">{stats.readingTime} min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${Math.min(stats.readingTime * 10, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Based on 200 words/min</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Speaking Time</span>
                      <span className="font-medium">{stats.speakingTime} min</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${Math.min(stats.speakingTime * 10, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Based on 150 words/min</p>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Detailed Stats
                  </h4>
                  <div className="space-y-2">
                    {detailedStats.map((stat) => (
                      <div key={stat.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Keyword Density */}
              <Card className="glass shadow-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Keyword Density</h3>
                </div>
                {keywordDensity.length > 0 ? (
                  <div className="space-y-3">
                    {keywordDensity.map((item, index) => (
                      <div key={item.word}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium capitalize">{item.word}</span>
                          <span className="text-muted-foreground">
                            {item.count}x ({item.density}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${index === 0 ? 'bg-primary' :
                              index === 1 ? 'bg-blue-500' :
                                index === 2 ? 'bg-green-500' :
                                  index === 3 ? 'bg-yellow-500' : 'bg-purple-500'
                              }`}
                            style={{ width: `${Math.min(parseFloat(item.density) * 20, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-4">
                      💡 Tip: Aim for 1-3% keyword density for optimal SEO
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Start typing to see keyword density analysis</p>
                  </div>
                )}
              </Card>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12 animate-fade-in-delay-3">
              {/* What is Word Counter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  What is a <span className="text-gradient">Word Counter</span>?
                </h2>
                <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                  <p>
                    A <strong>word counter</strong> is an online tool that instantly calculates the number of words,
                    characters, sentences, and paragraphs in your text. Our free word counter also provides
                    <strong> reading time estimates</strong>, <strong>speaking time calculations</strong>, and
                    <strong> keyword density analysis</strong> to help writers, students, and SEO professionals
                    optimize their content.
                  </p>
                  <p>
                    Whether you're writing a blog post, academic essay, social media caption, or SEO content,
                    knowing your exact word count is essential. Many platforms have strict character limits,
                    and our character counter helps you stay within those boundaries while maximizing your message.
                  </p>
                </div>
              </div>

              {/* Why Use Word Counter */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Why Use Our <span className="text-gradient">Word Counter</span>?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "📝 Content Writers", desc: "Meet blog post requirements (300-2000 words) and optimize for SEO." },
                    { title: "🎓 Students", desc: "Track essay and assignment word counts to meet academic requirements." },
                    { title: "📱 Social Media", desc: "Stay within Twitter/X, Instagram, and Facebook character limits." },
                    { title: "🔍 SEO Professionals", desc: "Analyze keyword density to optimize content for search engines." },
                  ].map((item) => (
                    <Card key={item.title} className="glass shadow-card p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Platform Character Limits */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Social Media <span className="text-gradient">Character Limits</span>
                </h2>
                <Card className="glass shadow-card p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { platform: "Twitter/X Post", limit: "280 characters" },
                      { platform: "Instagram Caption", limit: "2,200 characters" },
                      { platform: "Facebook Post", limit: "63,206 characters" },
                      { platform: "LinkedIn Post", limit: "3,000 characters" },
                      { platform: "YouTube Title", limit: "100 characters" },
                      { platform: "TikTok Caption", limit: "2,200 characters" },
                      { platform: "Pinterest Pin", limit: "500 characters" },
                      { platform: "Google Meta Description", limit: "155-160 characters" },
                      { platform: "Email Subject Line", limit: "60 characters" },
                    ].map((item) => (
                      <div key={item.platform} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/50">
                        <span className="text-sm font-medium">{item.platform}</span>
                        <span className="text-sm text-primary font-mono">{item.limit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
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
