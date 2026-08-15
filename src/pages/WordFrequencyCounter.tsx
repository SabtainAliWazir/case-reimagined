import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { BarChart3, Search, Hash, Percent, Layers, Copy } from "lucide-react";
import { toast } from "sonner";

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't",
  "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
  "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's",
  "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll",
  "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself",
  "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not",
  "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
  "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll",
  "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's",
  "the", "their", "theirs", "them", "themselves", "then", "there", "there's",
  "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
  "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we",
  "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when",
  "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why",
  "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

const SAMPLE_TEXT = `Search Engine Optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. High quality content and keyword optimization are essential for ranking in Google search results. Keyword density and word frequency help content creators understand their textual patterns.`;

const faqs = [
  {
    question: "What is a Word Frequency Counter?",
    answer: "A word frequency counter (or keyword density analyzer) scans your text to count how many times each individual word appears, calculating the exact percentage (density) of each word relative to total word count."
  },
  {
    question: "Why is keyword frequency important for SEO?",
    answer: "Analyzing word frequency helps copywriters and SEO professionals avoid keyword stuffing (excessive repetition of words) while ensuring critical target keywords are naturally reinforced throughout the article."
  },
  {
    question: "What is an ideal keyword density percentage?",
    answer: "Most SEO experts recommend maintaining a primary keyword density of between 1% and 2.5% to ensure content reads naturally for human visitors without triggering search engine over-optimization penalties."
  },
  {
    question: "What does the 'Exclude Stop Words' option do?",
    answer: "It filters out common grammatical filler words (like 'the', 'is', 'at', 'which') to highlight your actual substantive topic keywords and content themes."
  }
];

const WordFrequencyCounter = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [minWordLength, setMinWordLength] = useState(3);
  const [searchFilter, setSearchFilter] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return { totalWords: 0, uniqueWords: 0, frequencyList: [] };
    }

    const rawWords = text
      .replace(/[^\w\s'-]/g, " ")
      .split(/\s+/)
      .filter(w => w.length >= minWordLength);

    const counts: Record<string, number> = {};
    let totalCount = 0;

    rawWords.forEach((word) => {
      const cleanWord = caseSensitive ? word : word.toLowerCase();
      if (filterStopWords && STOP_WORDS.has(cleanWord.toLowerCase())) {
        return;
      }
      counts[cleanWord] = (counts[cleanWord] || 0) + 1;
      totalCount++;
    });

    const frequencyList = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        density: totalCount > 0 ? ((count / totalCount) * 100).toFixed(2) : "0"
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalWords: rawWords.length,
      uniqueWords: Object.keys(counts).length,
      frequencyList
    };
  }, [text, filterStopWords, caseSensitive, minWordLength]);

  const filteredList = useMemo(() => {
    if (!searchFilter.trim()) return analysis.frequencyList;
    return analysis.frequencyList.filter(item =>
      item.word.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [analysis.frequencyList, searchFilter]);

  const copyStats = () => {
    if (filteredList.length === 0) return;
    const summary = filteredList
      .slice(0, 20)
      .map(item => `${item.word}: ${item.count} (${item.density}%)`)
      .join("\n");
    navigator.clipboard.writeText(summary);
    toast.success("Top 20 keyword stats copied!");
  };

  return (
    <>
      <Helmet>
        <title>Word Frequency Counter - Keyword Density & Repetition Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online word frequency counter and keyword density checker. Analyze word repetition, top keywords, and textual density for SEO writing and essays."
        />
        <meta
          name="keywords"
          content="word frequency counter, keyword density checker, word repetition counter, count word frequency online, text frequency analyzer"
        />
        <link rel="canonical" href="https://caseconvert.online/word-frequency-counter" />

        <meta property="og:title" content="Word Frequency Counter - Keyword Density Tool | CaseConvert" />
        <meta property="og:description" content="Instantly analyze word frequency, repetitions, and keyword densities online." />
        <meta property="og:url" content="https://caseconvert.online/word-frequency-counter" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Word Frequency Counter",
            "description": "Analyze word frequencies, keyword repetitions, and densities in text.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://caseconvert.online/" },
              { "@type": "ListItem", "position": 2, "name": "Word Frequency Counter", "item": "https://caseconvert.online/word-frequency-counter" }
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
              <BarChart3 className="w-4 h-4" /> SEO & Text Analysis Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Word Frequency <span className="text-transparent bg-clip-text bg-gradient-text">Counter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Analyze <strong>word repetition</strong>, calculate <strong>keyword density percentages</strong>, and detect overused words in your writing.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="space-y-4">
                <Label htmlFor="freq-input" className="text-sm font-semibold block">
                  Paste or Type Text to Analyze:
                </Label>
                <Textarea
                  id="freq-input"
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your essay, article, or transcript here..."
                  className="font-sans text-base bg-background/60 rounded-2xl border-border resize-y p-4"
                />
              </div>

              {/* Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Total Words</span>
                  <span className="text-2xl font-bold font-heading text-primary">{analysis.totalWords}</span>
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Unique Keywords</span>
                  <span className="text-2xl font-bold font-heading text-primary">{analysis.uniqueWords}</span>
                </div>
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center col-span-2 sm:col-span-1">
                  <span className="text-xs text-muted-foreground block mb-1">Top Keyword</span>
                  <span className="text-xl font-bold font-heading text-foreground truncate block">
                    {analysis.frequencyList[0]?.word || "N/A"}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Switch id="stopword-toggle" checked={filterStopWords} onCheckedChange={setFilterStopWords} />
                  <Label htmlFor="stopword-toggle" className="text-sm cursor-pointer">Exclude Stop Words</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="casesens-toggle" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                  <Label htmlFor="casesens-toggle" className="text-sm cursor-pointer">Case Sensitive</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-muted-foreground whitespace-nowrap">Min Length:</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={minWordLength}
                    onChange={(e) => setMinWordLength(parseInt(e.target.value) || 1)}
                    className="w-20 bg-background/50 rounded-xl h-9"
                  />
                </div>
              </div>
            </Card>

            {/* Frequency Analysis Table Card */}
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search words..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-9 bg-background/50 rounded-xl"
                  />
                </div>
                <Button onClick={copyStats} variant="outline" size="sm" className="rounded-xl gap-2">
                  <Copy className="w-4 h-4" /> Copy Top 20 Stats
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto border border-border/50 rounded-2xl">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/60 text-foreground sticky top-0 backdrop-blur-md">
                    <tr>
                      <th className="p-3 font-semibold">Rank</th>
                      <th className="p-3 font-semibold">Word / Keyword</th>
                      <th className="p-3 font-semibold text-center">Occurrences</th>
                      <th className="p-3 font-semibold text-right">Keyword Density</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {filteredList.length > 0 ? (
                      filteredList.map((item, idx) => (
                        <tr key={item.word} className="hover:bg-accent/40 transition-colors">
                          <td className="p-3 text-muted-foreground font-mono text-xs">#{idx + 1}</td>
                          <td className="p-3 font-medium text-foreground">{item.word}</td>
                          <td className="p-3 text-center font-mono font-bold text-primary">{item.count}</td>
                          <td className="p-3 text-right font-mono text-muted-foreground">{item.density}%</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                          No matching words found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Deep SEO Guide */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Understanding <span className="text-gradient">Word Frequency & Keyword Density</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Word frequency</strong> measures the occurrence count of each term across a passage of text. In professional copywriting, academic writing, and Search Engine Optimization, monitoring keyword density ensures content maintains strong topical relevance without crossing into unnatural keyword repetition.
                </p>
                <p>
                  By filtering out ubiquitous stop words like <em>the, is, and</em>, our analyzer surfaces your dominant themes, allowing you to identify synonyms and optimize vocabulary variety.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Word Frequency Counter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/word-frequency-counter" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WordFrequencyCounter;
