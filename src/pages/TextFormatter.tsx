import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Strikethrough, Underline, Superscript, FlipHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const TextFormatter = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const formatters = [
    {
      name: "Strikethrough",
      icon: Strikethrough,
      transform: (t: string) => t.split("").map((c) => c + "\u0336").join(""),
    },
    {
      name: "Underline",
      icon: Underline,
      transform: (t: string) => t.split("").map((c) => c + "\u0332").join(""),
    },
    {
      name: "Upside Down",
      icon: FlipHorizontal,
      transform: (t: string) => {
        const flipMap: { [key: string]: string } = {
          a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
          i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
          q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
          y: "ʎ", z: "z", A: "∀", B: "q", C: "Ɔ", D: "p", E: "Ǝ", F: "Ⅎ",
          G: "פ", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N",
          O: "O", P: "Ԁ", Q: "Q", R: "ɹ", S: "S", T: "┴", U: "∩", V: "Λ",
          W: "M", X: "X", Y: "⅄", Z: "Z", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ",
          "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0",
          ".": "˙", ",": "'", "'": ",", '"': "„", "!": "¡", "?": "¿",
          "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
        };
        return t.split("").reverse().map((c) => flipMap[c] || c).join("");
      },
    },
    {
      name: "Superscript",
      icon: Superscript,
      transform: (t: string) => {
        const superMap: { [key: string]: string } = {
          a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ",
          i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ",
          r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ",
          z: "ᶻ", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
          "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
        };
        return t.split("").map((c) => superMap[c.toLowerCase()] || c).join("");
      },
    },
    {
      name: "Wide Text",
      icon: null,
      transform: (t: string) => t.split("").join(" "),
    },
    {
      name: "Bubble Text",
      icon: null,
      transform: (t: string) => {
        const bubbleMap: { [key: string]: string } = {
          a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ",
          i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ",
          q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ",
          y: "ⓨ", z: "ⓩ", "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④",
          "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨",
        };
        return t.split("").map((c) => bubbleMap[c.toLowerCase()] || c).join("");
      },
    },
    {
      name: "Square Text",
      icon: null,
      transform: (t: string) => {
        const squareMap: { [key: string]: string } = {
          a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷",
          i: "🄸", j: "🄹", k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿",
          q: "🅀", r: "🅁", s: "🅂", t: "🅃", u: "🅄", v: "🅅", w: "🅆", x: "🅇",
          y: "🅈", z: "🅉",
        };
        return t.split("").map((c) => squareMap[c.toLowerCase()] || c).join("");
      },
    },
    {
      name: "Remove Extra Spaces",
      icon: null,
      transform: (t: string) => t.replace(/\s+/g, " ").trim(),
    },
    {
      name: "Remove Line Breaks",
      icon: null,
      transform: (t: string) => t.replace(/[\r\n]+/g, " ").trim(),
    },
  ];

  const applyFormat = (transform: (t: string) => string) => {
    setResult(transform(text));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  const clear = () => {
    setText("");
    setResult("");
  };

  return (
    <>
      <Helmet>
        <title>Text Formatter - Strikethrough, Underline & Fancy Text |CaseConvert</title>
        <meta name="description" content="Free online text formatter. Create strikethrough, underline, upside down, superscript, bubble text, and more. Perfect for social media and unique text styles." />
        <meta name="keywords" content="text formatter, strikethrough text, underline text, upside down text, superscript text, bubble text, fancy text generator" />
        <link rel="canonical" href="https://caseconvert.online/text-formatter" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Text <span className="text-gradient">Formatter</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Apply special formatting to your text. Create unique text styles for social media.
              </p>
            </div>

            <Card className="glass shadow-card p-6 mb-6 animate-fade-in-delay-1">
              <label className="text-sm font-medium text-foreground mb-3 block">Input Text</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[120px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 animate-fade-in-delay-2">
              {formatters.map((formatter) => (
                <Button
                  key={formatter.name}
                  variant="converter"
                  size="converter"
                  onClick={() => applyFormat(formatter.transform)}
                  className="text-xs"
                >
                  {formatter.icon && <formatter.icon className="w-3 h-3 mr-1" />}
                  {formatter.name}
                </Button>
              ))}
            </div>

            <Card className="glass shadow-card p-6 animate-fade-in-delay-3">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-foreground">Result</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clear}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                value={result}
                readOnly
                placeholder="Formatted text will appear here..."
                className="min-h-[120px] font-mono text-sm bg-background/50 border-border/50 resize-none"
              />
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TextFormatter;
