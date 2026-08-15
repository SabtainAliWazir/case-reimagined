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
import { Binary, ArrowRightLeft, Copy, Check, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

function base64ToHex(b64: string): string {
  const binStr = atob(b64.replace(/\s+/g, ""));
  const hexArr: string[] = [];
  for (let i = 0; i < binStr.length; i++) {
    const hex = binStr.charCodeAt(i).toString(16).padStart(2, "0");
    hexArr.push(hex);
  }
  return hexArr.join("");
}

function hexToBase64(hex: string): string {
  const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
  let binStr = "";
  for (let i = 0; i < cleanHex.length; i += 2) {
    const byte = parseInt(cleanHex.substr(i, 2), 16);
    binStr += String.fromCharCode(byte);
  }
  return btoa(binStr);
}

const faqs = [
  {
    question: "What is Base64 to Hex conversion?",
    answer: "Base64 encodes binary data into 64 ASCII characters (A-Z, a-z, 0-9, +, /). Hexadecimal encodes binary bytes into base-16 strings (0-9, A-F). Converting Base64 to Hex allows cryptographers and developers to inspect raw byte values of encoded keys, certificates, or tokens."
  },
  {
    question: "Where is Base64 to Hex used?",
    answer: "Common use cases include SSL/TLS certificate analysis, JWT signature verification, Ethereum/Bitcoin private keys, WebAuthn payloads, and low-level network packet debugging."
  },
  {
    question: "Can I convert Hex back to Base64?",
    answer: "Yes! Use the 'Swap Direction' button to convert Hex strings into Base64 format instantly."
  },
  {
    question: "Is data transmission safe?",
    answer: "100% safe. All conversions execute locally inside your browser's JavaScript environment; no data or keys are ever sent to any remote server."
  }
];

const Base64ToHex = () => {
  const [inputText, setInputText] = useState("SGVsbG8gV29ybGQh"); // 'Hello World!' in Base64
  const [mode, setMode] = useState<"b64tohex" | "hextob64">("b64tohex");
  const [byteSpacing, setByteSpacing] = useState(true);
  const [uppercaseHex, setUppercaseHex] = useState(true);
  const [copied, setCopied] = useState(false);

  const convertedResult = useMemo(() => {
    if (!inputText.trim()) return "";

    try {
      if (mode === "b64tohex") {
        let hex = base64ToHex(inputText);
        if (uppercaseHex) hex = hex.toUpperCase();
        else hex = hex.toLowerCase();

        if (byteSpacing) {
          const bytes = hex.match(/.{1,2}/g) || [];
          return bytes.join(" ");
        }
        return hex;
      } else {
        return hexToBase64(inputText);
      }
    } catch {
      return "Invalid input syntax for conversion";
    }
  }, [inputText, mode, byteSpacing, uppercaseHex]);

  const toggleMode = () => {
    setMode(prev => (prev === "b64tohex" ? "hextob64" : "b64tohex"));
    setInputText(convertedResult || "");
  };

  const copyToClipboard = () => {
    if (!convertedResult) return;
    navigator.clipboard.writeText(convertedResult);
    setCopied(true);
    toast.success("Converted result copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Base64 to Hex Converter - Two-Way Binary Encoding Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online Base64 to Hex converter. Convert Base64 strings into Hexadecimal byte sequences (Base-16) and Hex to Base64 with byte spacing and uppercase options."
        />
        <meta
          name="keywords"
          content="base64 to hex, hex to base64, base64 to hexadecimal, convert base64 to hex online, b64 to hex converter"
        />
        <link rel="canonical" href="https://caseconvert.online/base64-to-hex" />

        <meta property="og:title" content="Base64 to Hex Converter - Two-Way Binary Tool | CaseConvert" />
        <meta property="og:description" content="Convert Base64 to Hexadecimal byte sequences and vice versa in real time." />
        <meta property="og:url" content="https://caseconvert.online/base64-to-hex" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Base64 to Hex Converter",
            "description": "Convert Base64 strings to Hexadecimal bytes and vice versa online.",
            "applicationCategory": "DeveloperApplication",
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
              { "@type": "ListItem", "position": 2, "name": "Base64 to Hex", "item": "https://caseconvert.online/base64-to-hex" }
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
              <ShieldCheck className="w-4 h-4" /> Cryptography & Binary Encoding Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Base64 to <span className="text-transparent bg-clip-text bg-gradient-text">Hex Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert <strong>Base64 strings</strong> into <strong>Hexadecimal bytes (Base-16)</strong> and Hex into Base64 with custom formatting.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Mode: {mode === "b64tohex" ? "Base64 → Hexadecimal" : "Hexadecimal → Base64"}
                  </span>
                </div>
                <Button
                  onClick={toggleMode}
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2 font-medium"
                >
                  <ArrowRightLeft className="w-4 h-4 text-primary" />
                  Swap Direction
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="space-y-2">
                  <Label htmlFor="b64-input" className="text-sm font-semibold block">
                    {mode === "b64tohex" ? "Enter Base64 String:" : "Enter Hexadecimal Bytes:"}
                  </Label>
                  <Textarea
                    id="b64-input"
                    rows={6}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={mode === "b64tohex" ? "SGVsbG8gV29ybGQh" : "48 65 6C 6C 6F..."}
                    className="font-mono text-base bg-background/60 rounded-2xl border-border resize-y p-4"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "b64tohex" ? "Hexadecimal Output:" : "Base64 Output:"}
                    </Label>
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      className="rounded-xl gap-1.5 h-8 font-semibold shadow-button hover:shadow-glow"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <Textarea
                    readOnly
                    rows={6}
                    value={convertedResult}
                    placeholder="Converted result will appear here..."
                    className="font-mono text-base bg-primary/5 border border-primary/20 text-primary font-bold rounded-2xl resize-y p-4 select-all"
                  />
                </div>
              </div>

              {/* Extra Controls */}
              {mode === "b64tohex" && (
                <div className="grid sm:grid-cols-2 gap-4 pt-4 mt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <Switch id="spacing-toggle" checked={byteSpacing} onCheckedChange={setByteSpacing} />
                    <Label htmlFor="spacing-toggle" className="text-sm cursor-pointer">Space Between Bytes (e.g. 48 65)</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="hex-case-toggle" checked={uppercaseHex} onCheckedChange={setUppercaseHex} />
                    <Label htmlFor="hex-case-toggle" className="text-sm cursor-pointer">UPPERCASE Hex (A-F)</Label>
                  </div>
                </div>
              )}
            </Card>
          </section>

          {/* Deep SEO Guide */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Understanding <span className="text-gradient">Base64 and Hexadecimal Encodings</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Base64</strong> and <strong>Hexadecimal (Base-16)</strong> are both binary-to-text encoding schemes designed to represent binary data in an ASCII string format suitable for HTTP transmission, JSON serialization, and cryptographic hashing.
                </p>
                <p>
                  While Base64 achieves higher data density (33% size overhead vs 100% overhead for Hex), Hexadecimal provides human-readable byte-for-byte transparency.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Base64 to Hex Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/base64-to-hex" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Base64ToHex;
