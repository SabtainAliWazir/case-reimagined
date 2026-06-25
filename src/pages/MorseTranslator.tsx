import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Copy, Trash2, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const MORSE_CODE: { [key: string]: string } = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.",
  "$": "...-..-", "@": ".--.-.", " ": "/",
};

const REVERSE_MORSE: { [key: string]: string } = Object.entries(MORSE_CODE).reduce(
  (acc, [char, morse]) => ({ ...acc, [morse]: char }),
  {}
);

const MorseTranslator = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [mode, setMode] = useState<"textToMorse" | "morseToText">("textToMorse");

  const textToMorse = (input: string): string => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => MORSE_CODE[char] || char)
      .join(" ");
  };

  const morseToText = (input: string): string => {
    return input
      .split(" / ")
      .map((word) =>
        word
          .split(" ")
          .map((code) => REVERSE_MORSE[code] || code)
          .join("")
      )
      .join(" ");
  };

  const handleTextChange = (value: string) => {
    setText(value);
    if (mode === "textToMorse") {
      setMorse(textToMorse(value));
    }
  };

  const handleMorseChange = (value: string) => {
    setMorse(value);
    if (mode === "morseToText") {
      setText(morseToText(value));
    }
  };

  const toggleMode = () => {
    setMode(mode === "textToMorse" ? "morseToText" : "textToMorse");
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    toast.success(`${type} copied to clipboard!`);
  };

  const clear = () => {
    setText("");
    setMorse("");
  };

  const playMorse = () => {
    if (!morse) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 0.1;
    const dashDuration = 0.3;
    const pauseDuration = 0.1;

    let currentTime = audioContext.currentTime;

    morse.split("").forEach((char) => {
      if (char === "." || char === "-") {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = "sine";

        const duration = char === "." ? dotDuration : dashDuration;

        gainNode.gain.setValueAtTime(0.3, currentTime);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);

        currentTime += duration + pauseDuration;
      } else if (char === " ") {
        currentTime += pauseDuration * 2;
      } else if (char === "/") {
        currentTime += pauseDuration * 4;
      }
    });

    toast.success("Playing morse code...");
  };

  return (
    <>
      <Helmet>
        <title>Morse Code Translator - Convert Text to Morse Code | CaseConvert</title>
        <meta name="description" content="Free online morse code translator. Convert text to morse code and morse code to text. Listen to morse code audio and learn morse code easily." />
        <meta name="keywords" content="morse code translator, text to morse, morse to text, morse code converter, learn morse code, morse code audio" />
        <link rel="canonical" href="https://caseconvert.online/morse-translator" />

        {/* Social Media Meta Tags */}
        <meta property="og:title" content="Morse Code Translator - Text to Morse Converter | CaseConvert" />
        <meta property="og:description" content="Translate text to morse code and listen to the audio playback. Free, fast, and works in your browser." />
        <meta property="og:url" content="https://caseconvert.online/morse-translator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Morse Code Translator - Text to Morse Converter | CaseConvert" />
        <meta name="twitter:description" content="Convert text to morse code with audio playback. Learn morse code online for free." />

        {/* Morse Translator Specific Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Morse Code Translator",
            "description": "Convert text to morse code and morse code to text with audio playback feature.",
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
                "name": "Morse Code Translator",
                "item": "https://caseconvert.online/morse-translator"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Morse Code <span className="text-gradient">Translator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Convert text to morse code and back. Listen to the audio playback.
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-6 animate-fade-in-delay-1">
              <Button onClick={toggleMode} variant="outline" className="gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                {mode === "textToMorse" ? "Text → Morse" : "Morse → Text"}
              </Button>
              <Button onClick={playMorse} variant="outline" className="gap-2" disabled={!morse}>
                <Volume2 className="w-4 h-4" />
                Play Audio
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-delay-2">
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Text</label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(text, "Text")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Enter text here..."
                  className="min-h-[250px] font-mono text-base resize-y"
                  disabled={mode === "morseToText"}
                />
              </Card>

              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-foreground">Morse Code</label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(morse, "Morse")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={morse}
                  onChange={(e) => handleMorseChange(e.target.value)}
                  placeholder="Morse code will appear here..."
                  className="min-h-[250px] font-mono text-base resize-y"
                  disabled={mode === "textToMorse"}
                />
              </Card>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={clear} variant="outline" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            </div>

            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 mt-8 animate-fade-in-delay-3">
              <h2 className="text-lg font-semibold mb-4">Morse Code Reference</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 text-xs font-mono">
                {Object.entries(MORSE_CODE).slice(0, 36).map(([char, code]) => (
                  <div key={char} className="bg-background/50 rounded p-2 text-center">
                    <div className="font-bold text-foreground">{char}</div>
                    <div className="text-muted-foreground">{code}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MorseTranslator;
