import { useState, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Binary, Volume2, ArrowRightLeft, Copy, Check, Sparkles, Play, Square } from "lucide-react";
import { toast } from "sonner";

// Standard International Morse Code Table
const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  "\"": ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/"
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_MAP).reduce(
  (acc, [char, code]) => {
    acc[code] = char;
    return acc;
  },
  {} as Record<string, string>
);

function binaryToText(bin: string): string {
  const cleaned = bin.replace(/[^01]/g, "");
  let text = "";
  for (let i = 0; i < cleaned.length; i += 8) {
    const byte = cleaned.slice(i, i + 8);
    if (byte.length === 8) {
      text += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return text;
}

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_MAP[char] || "")
    .filter(Boolean)
    .join(" ");
}

function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s+/)
    .map((code) => REVERSE_MORSE[code] || "")
    .join("");
}

function textToBinary(text: string): string {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

const faqs = [
  {
    question: "How does Binary to Morse Code translation work?",
    answer: "Our tool converts 8-bit binary ASCII byte streams (e.g. '01010011' for 'S', '01001111' for 'O') into English text characters, and then maps each character to its international Morse code dots and dashes (... --- ... for SOS)."
  },
  {
    question: "Can I listen to the Morse code audio beeps?",
    answer: "Yes! Click the 'Play Morse Audio' button to trigger a browser-synthesized 600Hz Web Audio oscillator playing real-time Morse code dots and dashes."
  },
  {
    question: "Can I convert Morse code back to binary?",
    answer: "Yes! Use the 'Swap Direction' button to convert any Morse code string back into binary 8-bit bytes instantly."
  },
  {
    question: "Is there a text size limit?",
    answer: "No! All conversions run entirely inside your browser using client-side JavaScript."
  }
];

const BinaryToMorse = () => {
  const [inputText, setInputText] = useState("01010011 01001111 01010011"); // 'SOS' in binary
  const [mode, setMode] = useState<"bin2morse" | "morse2bin">("bin2morse");
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const convertedResult = useMemo(() => {
    if (!inputText.trim()) return "";

    try {
      if (mode === "bin2morse") {
        const text = binaryToText(inputText);
        return textToMorse(text);
      } else {
        const text = morseToText(inputText);
        return textToBinary(text);
      }
    } catch {
      return "Conversion error - check input syntax";
    }
  }, [inputText, mode]);

  const toggleMode = () => {
    setMode(prev => (prev === "bin2morse" ? "morse2bin" : "bin2morse"));
    setInputText(convertedResult || "");
  };

  const playMorseSound = async () => {
    const morseCode = mode === "bin2morse" ? convertedResult : inputText;
    if (!morseCode || isPlaying) return;

    setIsPlaying(true);
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const dotDuration = 80; // ms
    let time = ctx.currentTime + 0.05;

    for (const char of morseCode) {
      if (char === ".") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dotDuration / 1000);
        time += (dotDuration * 2) / 1000;
      } else if (char === "-") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + (dotDuration * 3) / 1000);
        time += (dotDuration * 4) / 1000;
      } else if (char === " ") {
        time += (dotDuration * 3) / 1000;
      } else if (char === "/") {
        time += (dotDuration * 7) / 1000;
      }
    }

    const totalDuration = (time - ctx.currentTime) * 1000;
    setTimeout(() => {
      setIsPlaying(false);
      ctx.close();
    }, totalDuration);
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      setIsPlaying(false);
    }
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
        <title>Binary to Morse Code Translator with Audio | CaseConvert</title>
        <meta
          name="description"
          content="Free online Binary to Morse Code translator with real audio beeping playback. Convert binary 0s and 1s to Morse dots and dashes (. -) and vice-versa instantly."
        />
        <meta
          name="keywords"
          content="binary to morse code, morse code to binary, binary morse translator, binary to morse sound, bits to morse converter"
        />
        <link rel="canonical" href="https://caseconvert.online/binary-to-morse-code" />

        <meta property="og:title" content="Binary to Morse Code Translator with Audio | CaseConvert" />
        <meta property="og:description" content="Translate binary bits to Morse code dots and dashes with live audio beeping." />
        <meta property="og:url" content="https://caseconvert.online/binary-to-morse-code" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Binary to Morse Code Translator",
            "description": "Translate binary code to Morse dots & dashes with audio playback.",
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
              { "@type": "ListItem", "position": 2, "name": "Binary to Morse Code", "item": "https://caseconvert.online/binary-to-morse-code" }
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
              <Binary className="w-4 h-4" /> Telecommunication & Signal Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Binary to <span className="text-transparent bg-clip-text bg-gradient-text">Morse Code</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Translate <strong>binary bytes</strong> directly to <strong>Morse code dots & dashes (. -)</strong> with real-time audio sound playback.
            </p>
          </section>

          {/* Interactive Tool Card */}
          <section className="max-w-[1000px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>
                    Mode: {mode === "bin2morse" ? "Binary → Morse Code" : "Morse Code → Binary"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={toggleMode}
                    variant="outline"
                    size="sm"
                    className="rounded-xl gap-2 font-medium"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-primary" />
                    Swap Direction
                  </Button>
                  {isPlaying ? (
                    <Button onClick={stopAudio} variant="destructive" size="sm" className="rounded-xl gap-1.5">
                      <Square className="w-4 h-4" /> Stop Audio
                    </Button>
                  ) : (
                    <Button onClick={playMorseSound} size="sm" className="rounded-xl gap-1.5 shadow-button">
                      <Play className="w-4 h-4" /> Play Morse Sound
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="space-y-2">
                  <Label htmlFor="bin-input" className="text-sm font-semibold block">
                    {mode === "bin2morse" ? "Enter Binary (8-bit bytes):" : "Enter Morse Code (. and -):"}
                  </Label>
                  <Textarea
                    id="bin-input"
                    rows={6}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={mode === "bin2morse" ? "01010011 01001111..." : "... --- ..."}
                    className="font-mono text-base bg-background/60 rounded-2xl border-border resize-y p-4"
                  />
                </div>

                {/* Output Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold block text-primary">
                      {mode === "bin2morse" ? "Morse Code Output:" : "Binary Output:"}
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
                    className="font-mono text-lg bg-primary/5 border border-primary/20 text-primary font-bold rounded-2xl resize-y p-4 select-all"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Deep SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                How Binary Relates to <span className="text-gradient">Morse Code</span>
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  Both Binary code and Morse code are fundamental binary encoding systems in telecommunications history:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Morse code</strong> uses short (dot) and long (dash) voltage pulses over telegraph wires.</li>
                  <li><strong>Binary code</strong> uses low (0) and high (1) transistor voltages to represent discrete bits in computing architectures.</li>
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Binary to Morse Code Translator" />

            {/* Related Tools */}
            <RelatedTools currentPath="/binary-to-morse-code" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BinaryToMorse;
