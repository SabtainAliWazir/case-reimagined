import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

// Mapping tables for Unicode small text variations
const SUPERSCRIPT_MAP: Record<string, string> = {
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ",
  k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "۹", r: "ʳ", s: "ˢ", t: "ᵗ",
  u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
  A: "ᴬ", B: "ᴮ", C: "ᶜ", D: "ᴰ", E: "ᴱ", F: "ᶠ", G: "ᴳ", H: "ᴴ", I: "ᴵ", J: "ᴶ",
  K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ", Q: "ᑫ", R: "ᴿ", S: "ˢ", T: "ᵀ",
  U: "ᵁ", V: "ⱽ", W: "ᵂ", X: "ˣ", Y: "ʸ", Z: "ᶻ",
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾"
};

const SUBSCRIPT_MAP: Record<string, string> = {
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ",
  p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ",
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎"
};

const SMALL_CAPS_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ",
  k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "ꜱ", t: "ᴛ",
  u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
  A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ꜰ", G: "ɢ", H: "ʜ", I: "ɪ", J: "ᴊ",
  K: "ᴋ", L: "ʟ", M: "ᴹ", N: "ɴ", O: "ᴏ", P: "ᴘ", Q: "ǫ", R: "ʀ", S: "ꜱ", T: "ᴛ",
  U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "x", Y: "ʏ", Z: "ᴢ"
};

function convertText(text: string, map: Record<string, string>): string {
  return text
    .split("")
    .map(char => map[char] || map[char.toLowerCase()] || char)
    .join("");
}

const faqs = [
  {
    question: "How does the Small Text Generator work?",
    answer: "This generator replaces standard ASCII letters with specialized Unicode symbols that look like tiny superscript, subscript, or small capital letters. Because they are valid Unicode characters, you can copy and paste them anywhere on the web."
  },
  {
    question: "Where can I paste tiny small text?",
    answer: "You can paste small text in Instagram bios, TikTok captions, Discord usernames, Twitter/X tweets, WhatsApp messages, Tumblr posts, and video game player names (Roblox, Fortnite, Minecraft)."
  },
  {
    question: "What is the difference between Superscript, Subscript, and Small Caps?",
    answer: "Superscript (ˢᵐᵃˡˡ) places tiny letters at the top of the line; Subscript (ₛₘₐₗₗ) places them along the bottom baseline; Small Caps (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ) creates compact uppercase letters sized to match lowercase heights."
  },
  {
    question: "Why do some letters look missing in Subscript?",
    answer: "The official Unicode standard does not define subscript symbols for every single English letter (such as 'b', 'c', 'd', 'f', 'g'). In those few cases, standard fallback characters are displayed."
  }
];

const SmallTextGenerator = () => {
  const [inputText, setInputText] = useState("Hello World - Welcome to CaseConvert!");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const variations = [
    {
      id: "small-caps",
      name: "Small Caps",
      description: "Miniature stylized capital letters",
      converted: convertText(inputText, SMALL_CAPS_MAP),
      example: "ʜᴇʟʟᴏ ᴡᴏʀʟᴅ"
    },
    {
      id: "superscript",
      name: "Superscript (Tiny High)",
      description: "Tiny text elevated above the baseline",
      converted: convertText(inputText, SUPERSCRIPT_MAP),
      example: "ʰᵉˡˡᵒ ʷᵒʳˡᵈ"
    },
    {
      id: "subscript",
      name: "Subscript (Tiny Low)",
      description: "Tiny text lowered below the baseline",
      converted: convertText(inputText, SUBSCRIPT_MAP),
      example: "ₕₑₗₗₒ 𝓌ₒᵣₗ𝒹"
    }
  ];

  const handleCopy = (id: string, textToCopy: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(id);
    toast.success("Tiny text copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Small Text Generator - Tiny Superscript, Subscript & Small Caps | CaseConvert</title>
        <meta
          name="description"
          content="Free online small text generator (ᵗᶦⁿʸ ᵗᵉˣᵗ). Convert text into tiny superscript, subscript, and small caps for Instagram bios, TikTok, Discord, and Twitter."
        />
        <meta
          name="keywords"
          content="small text generator, tiny text maker, superscript generator, subscript generator, small caps generator, mini font generator, tiny font copy paste"
        />
        <link rel="canonical" href="https://caseconvert.online/small-text-generator" />

        <meta property="og:title" content="Small Text Generator - Tiny Superscript & Small Caps | CaseConvert" />
        <meta property="og:description" content="Generate tiny copy-pasteable small text for Instagram, Discord, and TikTok bios." />
        <meta property="og:url" content="https://caseconvert.online/small-text-generator" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Small Text Generator",
            "description": "Convert text into tiny Unicode superscript, subscript, and small caps.",
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
              { "@type": "ListItem", "position": 2, "name": "Small Text Generator", "item": "https://caseconvert.online/small-text-generator" }
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
              <Sparkles className="w-4 h-4" /> Social Media & Bio Formatting
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-4 text-foreground">
              Small Text <span className="text-transparent bg-clip-text bg-gradient-text">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Generate <strong>tiny superscript (ᵗᶦⁿʸ)</strong>, <strong>subscript (ₜᵢₙᵧ)</strong>, and <strong>small caps (ᴛɪɴʏ)</strong> font styles for Instagram, TikTok, and Discord.
            </p>
          </section>

          {/* Input & Live Results Section */}
          <section className="max-w-[900px] mx-auto mb-16 space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-6 md:p-8 rounded-3xl shadow-card">
              <div className="space-y-4">
                <Label htmlFor="tiny-input" className="text-sm font-semibold block">
                  Type or Paste Text Below:
                </Label>
                <Textarea
                  id="tiny-input"
                  rows={3}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type anything here to generate small text..."
                  className="p-4 text-lg bg-background/60 rounded-2xl border-border resize-y"
                />
              </div>
            </Card>

            {/* Generated Variation Cards */}
            <div className="space-y-4">
              {variations.map((v) => (
                <Card
                  key={v.id}
                  className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl shadow-card transition-all duration-300 hover:border-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{v.name}</span>
                      <span className="text-xs text-muted-foreground">({v.description})</span>
                    </div>
                    <div className="text-lg md:text-xl font-medium text-primary font-mono select-all bg-background/50 p-3 rounded-xl border border-border/50 break-all">
                      {v.converted || "your text will show here"}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCopy(v.id, v.converted)}
                    className="self-end sm:self-center h-12 px-5 rounded-xl gap-2 font-semibold shadow-button hover:shadow-glow shrink-0"
                  >
                    {copiedKey === v.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedKey === v.id ? "Copied" : "Copy"}
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Deep SEO Content */}
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in-delay-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is <span className="text-gradient">Unicode Small Text</span>?
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  <strong>Small text</strong> (or tiny font) is created using Unicode character symbols designed for mathematical notations, phonetics, and linguistic studies. Because these symbols are standard Unicode code points rather than proprietary fonts, they can be copied and pasted directly into social platforms like Instagram, TikTok, Discord, Twitter, and Facebook without losing their appearance.
                </p>
                <p>
                  Our tool automatically maps your normal letters to three distinct small text variants: <strong>Small Caps (ꜱᴍᴀʟʟ)</strong>, <strong>Superscript (ˢᵐᵃˡˡ)</strong>, and <strong>Subscript (ₛₘₐₗₗ)</strong> in real time.
                </p>
              </div>
            </div>

            {/* Popular Platforms */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Top Uses for Tiny Fonts</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Instagram & TikTok Bios",
                    desc: "Add aesthetic tiny text subtitles, aesthetic names, or cute bio quotes to stand out."
                  },
                  {
                    title: "Discord & Gaming Nicknames",
                    desc: "Format unique gamer handles on Steam, Roblox, Discord servers, and Fortnite."
                  },
                  {
                    title: "Twitter / X Post Formatting",
                    desc: "Add footnote citations, witty commentary, or whispered side-remarks inside tweets."
                  }
                ].map((item) => (
                  <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 p-5 rounded-2xl">
                    <h3 className="font-semibold text-base mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <FAQSection faqs={faqs} toolName="Small Text Generator" />

            {/* Related Tools */}
            <RelatedTools currentPath="/small-text-generator" />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SmallTextGenerator;
