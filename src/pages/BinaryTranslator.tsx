import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const BinaryTranslator = () => {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [mode, setMode] = useState<"textToBinary" | "binaryToText">("textToBinary");

  const textToBinary = (input: string): string => {
    return input
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const binaryToText = (input: string): string => {
    const bytes = input.trim().split(/\s+/);
    return bytes
      .map((byte) => {
        const num = parseInt(byte, 2);
        return isNaN(num) ? "" : String.fromCharCode(num);
      })
      .join("");
  };

  const handleTextChange = (value: string) => {
    setText(value);
    if (mode === "textToBinary") {
      setBinary(textToBinary(value));
    }
  };

  const handleBinaryChange = (value: string) => {
    setBinary(value);
    if (mode === "binaryToText") {
      setText(binaryToText(value));
    }
  };

  const toggleMode = () => {
    setMode(mode === "textToBinary" ? "binaryToText" : "textToBinary");
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${type} copied to clipboard!`);
  };

  const clear = () => {
    setText("");
    setBinary("");
  };

  return (
    <>
      <Helmet>
        <title>Binary Translator - Convert Text to Binary Code | CaseConvert</title>
        <meta name="description" content="Free online binary translator. Convert text to binary code and binary to text instantly. Perfect for learning binary, coding projects, and data encoding." />
        <meta name="keywords" content="binary translator, text to binary, binary to text, binary converter, binary code translator, ascii to binary" />
        <link rel="canonical" href="https://caseconvert.online/binary-translator" />

        {/* Binary Translator Specific Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Binary Translator & Converter",
            "description": "Convert text to binary and binary to text instantly. Supports ASCII encoding.",
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
                "name": "Binary Translator",
                "item": "https://caseconvert.online/binary-translator"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Binary <span className="text-gradient">Translator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert text to binary code and vice versa. Supports all ASCII characters.
              </p>
            </div>

            <div className="flex justify-center mb-6 animate-fade-in-delay-1">
              <Button onClick={toggleMode} variant="outline" className="gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                {mode === "textToBinary" ? "Text → Binary" : "Binary → Text"}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-delay-2">
              <Card className="glass shadow-card p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Text</label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(text, "Text")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Enter text here..."
                  className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                  disabled={mode === "binaryToText"}
                />
              </Card>

              <Card className="glass shadow-card p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Binary</label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(binary, "Binary")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={binary}
                  onChange={(e) => handleBinaryChange(e.target.value)}
                  placeholder="Binary code will appear here..."
                  className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                  disabled={mode === "textToBinary"}
                />
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={clear} variant="outline" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12 animate-fade-in-delay-3">
              {/* What is Binary */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  What is <span className="text-gradient">Binary Code</span>?
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong>Binary code</strong> is the fundamental language of computers, using only two digits:
                    <strong> 0</strong> and <strong>1</strong>. Every letter, number, and character on your computer
                    is represented as a sequence of these binary digits (bits). Our <strong>binary translator</strong>
                    converts text to binary and binary back to text instantly.
                  </p>
                  <p>
                    Each character in the ASCII standard is represented by 8 bits (1 byte). For example,
                    the letter "A" is <code className="bg-primary/10 text-primary px-1 rounded">01000001</code> in binary,
                    while "a" is <code className="bg-primary/10 text-primary px-1 rounded">01100001</code>.
                  </p>
                </div>
              </div>

              {/* Common Binary Codes */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Common <span className="text-gradient">Binary Codes</span>
                </h2>
                <Card className="glass shadow-card p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { char: "A", binary: "01000001" },
                      { char: "Z", binary: "01011010" },
                      { char: "a", binary: "01100001" },
                      { char: "z", binary: "01111010" },
                      { char: "0", binary: "00110000" },
                      { char: "9", binary: "00111001" },
                      { char: "Space", binary: "00100000" },
                      { char: "@", binary: "01000000" },
                    ].map((item) => (
                      <div key={item.char} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/50">
                        <span className="font-medium">{item.char}</span>
                        <code className="text-xs text-primary font-mono">{item.binary}</code>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Why Use a <span className="text-gradient">Binary Translator</span>?
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { emoji: "🎓", title: "Computer Science", desc: "Learn how computers store and process data at the binary level." },
                    { emoji: "🔐", title: "Encoding Messages", desc: "Create encoded messages that only binary-literate readers understand." },
                    { emoji: "👨‍💻", title: "Programming", desc: "Debug low-level code and understand byte-level data representation." },
                  ].map((item) => (
                    <Card key={item.title} className="glass shadow-card p-4">
                      <div className="text-2xl mb-2">{item.emoji}</div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BinaryTranslator;
