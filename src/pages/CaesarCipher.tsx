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
import { Slider } from "@/components/ui/slider";
import { KeyRound, Shield, Copy, Check, Sparkles, RefreshCw } from "lucide-react";
import { toast } from "sonner";

function caesarCipher(str: string, shift: number): string {
  // Normalize shift to 0-25
  const normalizedShift = ((shift % 26) + 26) % 26;

  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      // Uppercase A-Z (65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
      }
      // Lowercase a-z (97-122)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
      }
      return char;
    })
    .join("");
}

const faqs = [
  {
    question: "What is a Caesar Cipher?",
    answer: "The Caesar Cipher (or shift cipher) is one of the oldest known encryption techniques, attributed to Julius Caesar. It operates by substituting each letter in the plaintext with a letter a fixed number of positions down the alphabet."
  },
  {
    question: "What is ROT13?",
    answer: "ROT13 (Rotate by 13 places) is a special case of the Caesar cipher with a shift key of 13. Because the English alphabet has 26 letters, applying ROT13 twice restores the original text, making encryption and decryption identical."
  },
  {
    question: "How does the Brute-Force view work?",
    answer: "Because a Caesar cipher only has 25 possible keys, our solver displays all 25 shift variations simultaneously, allowing you to instantly crack and read any Caesar-encrypted ciphertext without knowing the original shift key."
  },
  {
    question: "Does the Caesar cipher encrypt numbers and punctuation?",
    answer: "Standard classical Caesar ciphers only rotate alphabetical characters (A-Z and a-z). Numbers, whitespace, emojis, and punctuation marks remain unaltered."
  }
];

const CaesarCipher = () => {
  const [inputText, setInputText] = useState("The quick brown fox jumps over the lazy dog!");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [showAllShifts, setShowAllShifts] = useState(false);
  const [copied, setCopied] = useState(false);

  const effectiveShift = mode === "encode" ? shift : -shift;

  const resultText = useMemo(() => {
    return caesarCipher(inputText, effectiveShift);
  }, [inputText, effectiveShift]);

  const allPossibleShifts = useMemo(() => {
    if (!showAllShifts) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      shift: i + 1,
      decoded: caesarCipher(inputText, -(i + 1))
    }));
  }, [inputText, showAllShifts]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Caesar Cipher Decoder & Encoder - ROT13 Shift Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online Caesar Cipher decoder and encoder. Encrypt or decrypt messages using any shift key (1-25) or ROT13. Features an instant 25-key brute force solver."
        />
        <meta
          name="keywords"
          content="caesar cipher decoder, caesar cipher encoder, rot13 cipher tool, shift cipher online, caesar cipher solver, brute force caesar cipher"
        />
        <link rel="canonical" href="https://caseconvert.online/caesar-cipher" />

        <meta property="og:title" content="Caesar Cipher Decoder & Encoder - ROT13 Shift Tool | CaseConvert" />
        <meta property="og:description" content="Encrypt and decode Caesar ciphers, ROT13, and solve unknown shift keys instantly." />
        <meta property="og:url" content="https://caseconvert.online/caesar-cipher" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Caesar Cipher Decoder & Encoder",
            "description": "Encode, decode, and solve Caesar shift ciphers and ROT13 online.",
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
              { "@type": "ListItem", "position": 2, "name": "Caesar Cipher", "item": "https://caseconvert.online/caesar-cipher" }
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
              <Shield className="w-4 h-4" /> Classical Cryptography Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Caesar Cipher <span className="text-transparent bg-clip-text bg-gradient-text">Decoder & Encoder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Encrypt or decrypt text with any <strong>alphabet shift key (1-25)</strong>, use <strong>ROT13</strong>, or crack unknown ciphers with all 25 brute-force keys.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[950px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="space-y-6">
                {/* Input Field */}
                <div>
                  <Label htmlFor="caesar-input" className="text-sm font-semibold mb-2 block">
                    Enter Text to {mode === "encode" ? "Encrypt" : "Decrypt"}:
                  </Label>
                  <Textarea
                    id="caesar-input"
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your message here..."
                    className="p-4 text-base bg-background/60 rounded-2xl border-border resize-y font-mono"
                  />
                </div>

                {/* Shift Slider & Quick Presets */}
                <div className="p-5 rounded-2xl bg-background/40 border border-border/50 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Alphabet Shift Key:</span>
                      <span className="px-3 py-1 rounded-xl bg-primary text-primary-foreground font-mono font-bold text-sm">
                        {shift}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={mode === "encode" ? "default" : "outline"}
                        onClick={() => setMode("encode")}
                        className="rounded-xl"
                      >
                        Encode
                      </Button>
                      <Button
                        size="sm"
                        variant={mode === "decode" ? "default" : "outline"}
                        onClick={() => setMode("decode")}
                        className="rounded-xl"
                      >
                        Decode
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShift(13)}
                        className="rounded-xl border-primary/30 text-primary font-bold"
                      >
                        ROT13 Preset
                      </Button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Slider
                      value={[shift]}
                      min={1}
                      max={25}
                      step={1}
                      onValueChange={(val) => setShift(val[0])}
                      className="cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
                      <span>Shift 1 (A→B)</span>
                      <span>Shift 13 (ROT13)</span>
                      <span>Shift 25 (A→Z)</span>
                    </div>
                  </div>
                </div>

                {/* Result Area */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs font-semibold text-primary uppercase tracking-wider block">
                      {mode === "encode" ? "Ciphertext Output:" : "Plaintext Decrypted:"}
                    </Label>
                    <Button
                      onClick={() => copyToClipboard(resultText)}
                      size="sm"
                      className="h-8 rounded-xl gap-1.5 shadow-button"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Result"}
                    </Button>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 font-mono text-primary font-bold text-base md:text-lg break-all select-all">
                    {resultText || "Output will appear here..."}
                  </div>
                </div>

                {/* Toggle Brute-Force View */}
                <div className="pt-2">
                  <Button
                    onClick={() => setShowAllShifts(!showAllShifts)}
                    variant="outline"
                    className="w-full rounded-2xl gap-2 font-medium"
                  >
                    <RefreshCw className="w-4 h-4 text-primary" />
                    {showAllShifts ? "Hide 25 Shift Brute-Force Table" : "Show All 25 Possible Shifts (Brute Force Decoder)"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Brute Force Solved Shifts Table */}
            {showAllShifts && (
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-card animate-fade-in">
                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-primary" /> All 25 Shift Decryptions:
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {allPossibleShifts.map((item) => (
                    <div
                      key={item.shift}
                      className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/40 transition-colors"
                    >
                      <span className="font-mono text-xs font-bold text-primary w-20">Shift -{item.shift}:</span>
                      <span className="font-mono text-sm text-foreground flex-1 truncate px-2">{item.decoded}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(item.decoded)}
                        className="text-xs h-7"
                      >
                        Copy
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </section>

          {/* Deep SEO Guide */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How the <span className="text-gradient">Caesar Shift Cipher Works</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  The <strong>Caesar Cipher</strong> is a monoalphabetic substitution cipher. For a given shift integer \(k\), every character \(x\) is transformed by shifting its alphabetical index:
                </p>
                <div className="p-4 rounded-xl bg-card border border-border font-mono text-center text-sm text-primary">
                  \(E_n(x) = (x + n) \pmod{26}\) &nbsp;&nbsp;|&nbsp;&nbsp; \(D_n(x) = (x - n) \pmod{26}\)
                </div>
                <p>
                  Because the shift key space is limited to 25 possibilities, Caesar ciphers are easily solved via exhaustive frequency analysis or brute-force decryption.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Caesar Cipher Decoder" />

            {/* Related Tools */}
            <RelatedTools currentPath="/caesar-cipher" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CaesarCipher;
