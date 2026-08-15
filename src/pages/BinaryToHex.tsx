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
import { Copy, Check, ArrowRightLeft, Binary, Code2 } from "lucide-react";
import { toast } from "sonner";

const faqs = [
  {
    question: "How does Binary to Hex conversion work?",
    answer: "Binary (Base-2) uses only 0s and 1s, while Hexadecimal (Base-16) uses 0-9 and A-F. Each hexadecimal digit represents exactly 4 binary bits (called a nibble). For example, binary '1111' converts to hexadecimal 'F', and '1010' converts to 'A'."
  },
  {
    question: "What is a 4-bit nibble?",
    answer: "A nibble is a four-bit aggregation, or half an octet (half a byte). Since 2^4 = 16, every 4-bit binary sequence directly corresponds to one hexadecimal character."
  },
  {
    question: "Can I convert Hexadecimal back to Binary with this tool?",
    answer: "Yes! Use the 'Swap Direction' button to convert Hex to Binary instantly with custom bit padding and spacing."
  },
  {
    question: "What are the common binary to hex equivalents?",
    answer: "0000=0, 0001=1, 0010=2, 0011=3, 0100=4, 0101=5, 0110=6, 0111=7, 1000=8, 1001=9, 1010=A, 1011=B, 1100=C, 1101=D, 1110=E, 1111=F."
  }
];

const BinaryToHex = () => {
  const [mode, setMode] = useState<"bin2hex" | "hex2bin">("bin2hex");
  const [inputVal, setInputVal] = useState("01001000 01100101 01111000"); // 'Hex' in binary
  const [grouping, setGrouping] = useState(true);
  const [prefix0x, setPrefix0x] = useState(false);
  const [uppercaseHex, setUppercaseHex] = useState(true);
  const [copied, setCopied] = useState(false);

  const convertedResult = useMemo(() => {
    if (!inputVal.trim()) return "";

    try {
      if (mode === "bin2hex") {
        // Remove whitespaces and validate binary
        const cleaned = inputVal.replace(/[^01]/g, "");
        if (!cleaned) return "";

        // Pad to multiples of 4
        const remainder = cleaned.length % 4;
        const padded = remainder === 0 ? cleaned : "0".repeat(4 - remainder) + cleaned;

        const hexChunks: string[] = [];
        for (let i = 0; i < padded.length; i += 4) {
          const nibble = padded.substring(i, i + 4);
          const hexDigit = parseInt(nibble, 2).toString(16);
          hexChunks.push(uppercaseHex ? hexDigit.toUpperCase() : hexDigit.toLowerCase());
        }

        let out = "";
        if (grouping) {
          // Group by bytes (2 hex chars) or nibbles
          const bytes: string[] = [];
          for (let i = 0; i < hexChunks.length; i += 2) {
            bytes.push(hexChunks.slice(i, i + 2).join(""));
          }
          out = bytes.join(" ");
        } else {
          out = hexChunks.join("");
        }

        return prefix0x ? (grouping ? out.split(" ").map(b => "0x" + b).join(" ") : "0x" + out) : out;
      } else {
        // Hex to Binary
        const cleaned = inputVal.replace(/[^0-9a-fA-F]/g, "");
        if (!cleaned) return "";

        const binChunks: string[] = [];
        for (let i = 0; i < cleaned.length; i++) {
          const char = cleaned[i];
          const bin = parseInt(char, 16).toString(2).padStart(4, "0");
          binChunks.push(bin);
        }

        if (grouping) {
          // Group into 8-bit bytes
          const bytes: string[] = [];
          for (let i = 0; i < binChunks.length; i += 2) {
            bytes.push(binChunks.slice(i, i + 2).join(""));
          }
          return bytes.join(" ");
        } else {
          return binChunks.join("");
        }
      }
    } catch {
      return "Conversion error - check input syntax";
    }
  }, [inputVal, mode, grouping, prefix0x, uppercaseHex]);

  const toggleMode = () => {
    setMode(prev => (prev === "bin2hex" ? "hex2bin" : "bin2hex"));
    setInputVal(convertedResult || "");
  };

  const copyToClipboard = () => {
    if (!convertedResult) return;
    navigator.clipboard.writeText(convertedResult);
    setCopied(true);
    toast.success("Result copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Binary to Hex Converter - Fast Two-Way Hexadecimal Tool | CaseConvert</title>
        <meta
          name="description"
          content="Free online Binary to Hex converter. Convert binary code (Base-2) to hexadecimal (Base-16) and Hex to Binary with bit grouping, 0x prefixes, and instant copying."
        />
        <meta
          name="keywords"
          content="binary to hex, hex to binary, binary to hexadecimal converter, bin to hex online, base 2 to base 16, bit to hex tool"
        />
        <link rel="canonical" href="https://caseconvert.online/binary-to-hex" />

        <meta property="og:title" content="Binary to Hex Converter - Fast Two-Way Hex Tool | CaseConvert" />
        <meta property="og:description" content="Convert binary 4-bit nibbles and bytes to hexadecimal format in real time." />
        <meta property="og:url" content="https://caseconvert.online/binary-to-hex" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Binary to Hexadecimal Converter",
            "description": "Convert binary code to hexadecimal strings and vice-versa online.",
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
              { "@type": "ListItem", "position": 2, "name": "Binary to Hex", "item": "https://caseconvert.online/binary-to-hex" }
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
              <Binary className="w-4 h-4" /> Base-2 to Base-16 Engineering Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Binary to Hex <span className="text-transparent bg-clip-text bg-gradient-text">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Convert between <strong>Binary (0s and 1s)</strong> and <strong>Hexadecimal (0-9, A-F)</strong> with custom nibble/byte grouping and instant copy.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[950px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span>Mode: {mode === "bin2hex" ? "Binary → Hexadecimal" : "Hexadecimal → Binary"}</span>
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
                  <Label htmlFor="bin-input" className="text-sm font-semibold block">
                    {mode === "bin2hex" ? "Enter Binary Code (0 & 1):" : "Enter Hexadecimal String (0-9, A-F):"}
                  </Label>
                  <Textarea
                    id="bin-input"
                    rows={6}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={mode === "bin2hex" ? "01001000 01100101..." : "48 65 78..."}
                    className="font-mono text-base bg-background/60 rounded-2xl border-border resize-y"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "bin2hex" ? "Hexadecimal Result:" : "Binary Result:"}
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
                  <div className="h-[156px] p-4 rounded-2xl bg-primary/5 border border-primary/20 font-mono text-primary font-bold text-base overflow-y-auto break-all select-all">
                    {convertedResult || "Output will appear here..."}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="grid sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Switch id="grouping-toggle" checked={grouping} onCheckedChange={setGrouping} />
                  <Label htmlFor="grouping-toggle" className="text-sm cursor-pointer">Byte / Nibble Spacing</Label>
                </div>
                {mode === "bin2hex" && (
                  <>
                    <div className="flex items-center gap-3">
                      <Switch id="prefix-toggle" checked={prefix0x} onCheckedChange={setPrefix0x} />
                      <Label htmlFor="prefix-toggle" className="text-sm cursor-pointer">Add 0x Prefix</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="case-toggle" checked={uppercaseHex} onCheckedChange={setUppercaseHex} />
                      <Label htmlFor="case-toggle" className="text-sm cursor-pointer">UPPERCASE Hex (A-F)</Label>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </section>

          {/* Deep SEO Guide & Nibble Conversion Table */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How to Convert <span className="text-gradient">Binary to Hexadecimal</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  Converting binary numbers to hexadecimal is an essential operation in computer architecture, memory addressing, networking (IP/MAC addresses), and cryptography. Because 16 is a power of 2 (\(2^4 = 16\)), each hexadecimal character maps directly to a 4-bit binary group (nibble).
                </p>
                <p>
                  To convert manually: divide your binary number into groups of 4 bits from right to left, pad with leading zeros if necessary, and replace each group with its hexadecimal equivalent.
                </p>
              </div>
            </div>

            {/* Quick Reference Table */}
            <div>
              <h2 className="text-2xl font-bold mb-4">4-Bit Binary to Hex Conversion Table</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { bin: "0000", hex: "0", dec: "0" },
                  { bin: "0001", hex: "1", dec: "1" },
                  { bin: "0010", hex: "2", dec: "2" },
                  { bin: "0011", hex: "3", dec: "3" },
                  { bin: "0100", hex: "4", dec: "4" },
                  { bin: "0101", hex: "5", dec: "5" },
                  { bin: "0110", hex: "6", dec: "6" },
                  { bin: "0111", hex: "7", dec: "7" },
                  { bin: "1000", hex: "8", dec: "8" },
                  { bin: "1001", hex: "9", dec: "9" },
                  { bin: "1010", hex: "A", dec: "10" },
                  { bin: "1011", hex: "B", dec: "11" },
                  { bin: "1100", hex: "C", dec: "12" },
                  { bin: "1101", hex: "D", dec: "13" },
                  { bin: "1110", hex: "E", dec: "14" },
                  { bin: "1111", hex: "F", dec: "15" },
                ].map((item) => (
                  <Card key={item.bin} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-3 rounded-xl flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{item.bin}</span>
                    <span className="font-mono font-bold text-sm text-primary">0x{item.hex}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Binary to Hex Converter" />

            {/* Related Tools */}
            <RelatedTools currentPath="/binary-to-hex" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BinaryToHex;
