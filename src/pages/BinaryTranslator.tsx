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
        <title>Binary Translator - Convert Text to Binary Code |CaseConvert</title>
        <meta name="description" content="Free online binary translator. Convert text to binary code and binary to text instantly. Perfect for learning binary, coding projects, and data encoding." />
        <meta name="keywords" content="binary translator, text to binary, binary to text, binary converter, binary code translator, ascii to binary" />
        <link rel="canonical" href="https://convertcase.net/binary-translator" />
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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BinaryTranslator;
