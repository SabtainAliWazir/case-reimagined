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
import { GitCompare, ArrowRightLeft, Sparkles, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const ORIGINAL_SAMPLE = `React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.`;

const MODIFIED_SAMPLE = `React is a popular open-source JavaScript library for creating modern user interfaces based on reusable components. It is maintained by Meta and an active global community of developers.`;

// Simple Word-level LCS Diff Algorithm
interface DiffChunk {
  type: "same" | "added" | "removed";
  value: string;
}

function computeWordDiff(oldStr: string, newStr: string, ignoreCase = false): DiffChunk[] {
  const words1 = oldStr.split(/(\s+)/);
  const words2 = newStr.split(/(\s+)/);

  const n = words1.length;
  const m = words2.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const w1 = ignoreCase ? words1[i - 1].toLowerCase() : words1[i - 1];
      const w2 = ignoreCase ? words2[j - 1].toLowerCase() : words2[j - 1];
      if (w1 === w2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = n;
  let j = m;
  const result: DiffChunk[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && (ignoreCase ? words1[i - 1].toLowerCase() === words2[j - 1].toLowerCase() : words1[i - 1] === words2[j - 1])) {
      result.unshift({ type: "same", value: words1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "added", value: words2[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({ type: "removed", value: words1[i - 1] });
      i--;
    }
  }

  return result;
}

const faqs = [
  {
    question: "What is an online Text Diff Checker?",
    answer: "A Text Diff Checker compares two versions of text side-by-side or inline, highlighting character and word changes so you can immediately see what was added, removed, or modified."
  },
  {
    question: "Is my comparison data kept private?",
    answer: "Yes! 100% of the diff computation runs client-side in your web browser using JavaScript. No text is ever transmitted over the network or saved to any server."
  },
  {
    question: "What do the green and red highlights represent?",
    answer: "Green highlighted text represents additions (content present in the modified version but absent from the original). Red highlighted text represents deletions (content removed from the original text)."
  },
  {
    question: "Can I compare code snippets as well as articles?",
    answer: "Absolutely! You can compare HTML, CSS, JSON, JavaScript, Markdown, or standard essay paragraphs."
  }
];

const TextDiffChecker = () => {
  const [originalText, setOriginalText] = useState(ORIGINAL_SAMPLE);
  const [modifiedText, setModifiedText] = useState(MODIFIED_SAMPLE);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [viewMode, setViewMode] = useState<"inline" | "sideBySide">("inline");

  const diffResult = useMemo(() => {
    return computeWordDiff(originalText, modifiedText, ignoreCase);
  }, [originalText, modifiedText, ignoreCase]);

  const stats = useMemo(() => {
    let additions = 0;
    let deletions = 0;
    diffResult.forEach(chunk => {
      if (chunk.type === "added" && chunk.value.trim()) additions++;
      if (chunk.type === "removed" && chunk.value.trim()) deletions++;
    });
    return { additions, deletions };
  }, [diffResult]);

  const swapTexts = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const copyDiffSummary = () => {
    const summary = `Diff Summary: +${stats.additions} added words, -${stats.deletions} removed words.`;
    navigator.clipboard.writeText(summary);
    toast.success("Diff summary copied!");
  };

  return (
    <>
      <Helmet>
        <title>Text Diff Checker - Compare Text & Find Differences Online | CaseConvert</title>
        <meta
          name="description"
          content="Free online text diff checker. Compare two text files or documents side-by-side or inline to highlight additions, deletions, and modifications instantly."
        />
        <meta
          name="keywords"
          content="text diff checker, compare text online, text difference finder, diff tool online, compare two texts, string diff checker"
        />
        <link rel="canonical" href="https://caseconvert.online/text-diff-checker" />

        <meta property="og:title" content="Text Diff Checker - Compare Text & Find Differences | CaseConvert" />
        <meta property="og:description" content="Compare two versions of text side-by-side or inline with visual difference highlighting." />
        <meta property="og:url" content="https://caseconvert.online/text-diff-checker" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Text Diff Checker",
            "description": "Compare two blocks of text and highlight differences online.",
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
              { "@type": "ListItem", "position": 2, "name": "Text Diff Checker", "item": "https://caseconvert.online/text-diff-checker" }
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
              <GitCompare className="w-4 h-4" /> Text Comparison Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Text Diff <span className="text-transparent bg-clip-text bg-gradient-text">Checker</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Compare two blocks of text or code to instantly identify <strong>added</strong>, <strong>removed</strong>, and <strong>edited</strong> words.
            </p>
          </section>

          {/* Input Comparison Cards */}
          <section className="max-w-[1050px] mx-auto mb-16 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Box */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-card space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="orig-text" className="text-sm font-semibold">Original Text (Old)</Label>
                  <Button variant="ghost" size="sm" onClick={() => setOriginalText("")} className="text-xs">Clear</Button>
                </div>
                <Textarea
                  id="orig-text"
                  rows={6}
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Paste original text here..."
                  className="bg-background/60 rounded-2xl border-border resize-y font-sans text-sm p-4"
                />
              </Card>

              {/* Modified Box */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-card space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="mod-text" className="text-sm font-semibold">Modified Text (New)</Label>
                  <Button variant="ghost" size="sm" onClick={() => setModifiedText("")} className="text-xs">Clear</Button>
                </div>
                <Textarea
                  id="mod-text"
                  rows={6}
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="bg-background/60 rounded-2xl border-border resize-y font-sans text-sm p-4"
                />
              </Card>
            </div>

            {/* Middle Bar Controls & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card/60 border border-white/20 dark:border-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="diff-case" checked={ignoreCase} onCheckedChange={setIgnoreCase} />
                  <Label htmlFor="diff-case" className="text-sm cursor-pointer">Ignore Case</Label>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">+{stats.additions} added</span>
                  <span className="px-2 py-1 rounded-md bg-rose-500/20 text-rose-400 font-bold">-{stats.deletions} removed</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={swapTexts} variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Swap
                </Button>
                <Button onClick={copyDiffSummary} size="sm" className="rounded-xl gap-1.5 shadow-button">
                  <Copy className="w-3.5 h-3.5" /> Copy Summary
                </Button>
              </div>
            </div>

            {/* Visual Highlighted Diff Result Card */}
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2 text-foreground">
                <Sparkles className="w-5 h-5 text-primary" /> Visual Comparison Result:
              </h3>
              <div className="p-6 rounded-2xl bg-background/50 border border-border leading-relaxed font-sans text-base whitespace-pre-wrap select-text">
                {diffResult.map((chunk, idx) => {
                  if (chunk.type === "added") {
                    return (
                      <span key={idx} className="bg-emerald-500/20 text-emerald-400 font-medium px-1 py-0.5 rounded mx-0.5 border border-emerald-500/30">
                        {chunk.value}
                      </span>
                    );
                  }
                  if (chunk.type === "removed") {
                    return (
                      <span key={idx} className="bg-rose-500/20 text-rose-400 line-through px-1 py-0.5 rounded mx-0.5 border border-rose-500/30">
                        {chunk.value}
                      </span>
                    );
                  }
                  return <span key={idx}>{chunk.value}</span>;
                })}
              </div>
            </Card>
          </section>

          {/* Deep SEO Guide */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How to <span className="text-gradient">Compare Text for Differences</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  A <strong>text diff tool</strong> calculates the differences between two sequences of strings using longest common subsequence algorithms. It allows editors, authors, students, and programmers to quickly track edits, proofread changes across draft revisions, and merge contradictory text blocks.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Text Diff Checker" />

            {/* Related Tools */}
            <RelatedTools currentPath="/text-diff-checker" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TextDiffChecker;
