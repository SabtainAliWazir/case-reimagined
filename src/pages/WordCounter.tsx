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

        {/* Social Media Meta Tags */}
        <meta property="og:title" content="Word Counter - Count Words & Characters Online | CaseConvert" />
        <meta property="og:description" content="Free online tool to count words, characters, sentences, and analyze keyword density. Get instant reading and speaking time estimates." />
        <meta property="og:url" content="https://caseconvert.online/word-counter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Word Counter - Count Words & Characters Online | CaseConvert" />
        <meta name="twitter:description" content="Analyze your text with our free online word counter. Keyword density, reading time, and more." />

        {/* Word Counter Specific Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Online Word Counter Tool",
            "description": "Calculate word count, character count, and analyze keyword density in real-time.",
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
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
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
                "name": "Word Counter",
                "item": "https://caseconvert.online/word-counter"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in-delay-1 relative z-10">
              {mainStats.map((stat) => (
                <Card key={stat.label} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-glow rounded-3xl">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Text Area */}
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 md:p-6 mb-6 animate-fade-in-delay-1 rounded-3xl relative z-10">
              <div className="flex justify-between items-center mb-4 px-2">
                <label className="text-sm font-heading font-semibold text-foreground">Your Text</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyText} className="gap-2 rounded-xl">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={clearText} className="gap-2 rounded-xl hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here to get instant word count, character count, and keyword analysis..."
                className="min-h-[250px] font-sans text-lg bg-card dark:bg-black/40 border border-border shadow-sm focus:border-primary/50 resize-y rounded-2xl p-6"
              />
            </Card>

            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-delay-2 relative z-10">
              {/* Time Estimates */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Time Estimates</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground font-medium">Reading Time</span>
                      <span className="font-bold">{stats.readingTime} min</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(stats.readingTime * 10, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Based on 200 words/min</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground font-medium">Speaking Time</span>
                      <span className="font-bold">{stats.speakingTime} min</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-primary/60 transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(stats.speakingTime * 10, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Based on 150 words/min</p>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h4 className="text-sm font-heading font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Detailed Stats
                  </h4>
                  <div className="space-y-3">
                    {detailedStats.map((stat) => (
                      <div key={stat.label} className="flex justify-between text-sm bg-background/50 p-3 rounded-xl border border-border/30">
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Keyword Density */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Keyword Density</h3>
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
                    <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
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
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
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

              {/* Excel & Google Sheets Word & Character Count Formulas */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  How to Count Words in <span className="text-gradient">Excel &amp; Google Sheets</span>
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Need to calculate length, word count, or character counts directly in your spreadsheets? Use these exact formulas:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-white/20 dark:border-white/5 bg-card/60 backdrop-blur-xl mb-4">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
                      <tr>
                        <th className="p-4">Calculation</th>
                        <th className="p-4">Excel &amp; Sheets Formula</th>
                        <th className="p-4">How It Works</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 text-foreground/90 font-mono text-xs md:text-sm">
                      <tr>
                        <td className="p-4 font-sans font-medium">Character Count</td>
                        <td className="p-4 text-primary font-bold">=LEN(A2)</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Returns total character count including spaces and punctuation.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Characters (No Spaces)</td>
                        <td className="p-4 text-primary font-bold">=LEN(SUBSTITUTE(A2, " ", ""))</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Calculates length after stripping out all whitespace characters.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Excel Word Count</td>
                        <td className="p-4 text-primary font-bold">=IF(LEN(TRIM(A2))=0, 0, LEN(TRIM(A2))-LEN(SUBSTITUTE(A2," ",""))+1)</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Standard formula: counts spaces between words plus one, handling empty cells safely.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium">Google Sheets Word Count</td>
                        <td className="p-4 text-primary font-bold">=IF(ISBLANK(A2), 0, COUNTA(SPLIT(A2, " ")))</td>
                        <td className="p-4 font-sans text-xs text-muted-foreground">Splits cell text by spaces and counts the resulting array elements.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
