import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Copy,
    Trash2,
    RefreshCw,
    Download,
    Type,
    Hash
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

type GenerationType = "paragraphs" | "sentences" | "words";

const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
    "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
    "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
    "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
    "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
    "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
    "nesciunt", "neque", "porro", "quisquam", "nihil", "impedit", "quo", "minus",
    "quod", "maxime", "placeat", "facere", "possimus", "assumenda", "repellendus",
    "temporibus", "autem", "quibusdam", "officiis", "debitis", "rerum",
    "necessitatibus", "saepe", "eveniet", "voluptates", "repudiandae", "recusandae",
    "itaque", "earum", "hic", "tenetur", "sapiente", "delectus", "reiciendis",
    "maiores", "alias", "perferendis", "doloribus", "asperiores", "repellat"
];

const LoremIpsumGenerator = () => {
    const [type, setType] = useState<GenerationType>("paragraphs");
    const [amount, setAmount] = useState(3);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [result, setResult] = useState("");

    const getRandomWord = (): string => {
        return loremWords[Math.floor(Math.random() * loremWords.length)];
    };

    const generateSentence = (length?: number): string => {
        const sentenceLength = length || Math.floor(Math.random() * 10) + 5;
        const words = Array.from({ length: sentenceLength }, () => getRandomWord());
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(" ") + ".";
    };

    const generateParagraph = (): string => {
        const sentenceCount = Math.floor(Math.random() * 4) + 4;
        const sentences = Array.from({ length: sentenceCount }, () => generateSentence());
        return sentences.join(" ");
    };

    const generate = () => {
        if (amount < 1) {
            toast.error("Please enter a valid amount");
            return;
        }

        let generated = "";
        const loremStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";

        switch (type) {
            case "words":
                const words = Array.from({ length: amount }, () => getRandomWord());
                if (startWithLorem && amount >= 2) {
                    words[0] = "lorem";
                    words[1] = "ipsum";
                }
                generated = words.join(" ");
                break;

            case "sentences":
                const sentences = Array.from({ length: amount }, () => generateSentence());
                if (startWithLorem) {
                    sentences[0] = loremStart.trim();
                }
                generated = sentences.join(" ");
                break;

            case "paragraphs":
                const paragraphs = Array.from({ length: amount }, () => generateParagraph());
                if (startWithLorem) {
                    paragraphs[0] = loremStart + paragraphs[0].slice(paragraphs[0].indexOf(" ", 50) + 1);
                }
                generated = paragraphs.join("\n\n");
                break;
        }

        setResult(generated);
        toast.success(`Generated ${amount} ${type}!`);
    };

    const copyToClipboard = () => {
        if (!result) {
            toast.error("Nothing to copy");
            return;
        }
        navigator.clipboard.writeText(result);
        toast.success("Copied to clipboard!");
    };

    const download = () => {
        if (!result) {
            toast.error("Nothing to download");
            return;
        }
        const blob = new Blob([result], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "lorem-ipsum.txt";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded!");
    };

    const clear = () => {
        setResult("");
        toast.success("Cleared");
    };

    const wordCount = result ? result.trim().split(/\s+/).length : 0;
    const charCount = result.length;

    return (
        <>
            <Helmet>
                <title>Lorem Ipsum Generator - Placeholder Text Generator | CaseConvert</title>
                <meta
                    name="description"
                    content="Free online Lorem Ipsum generator. Create placeholder text for your designs, mockups, and layouts. Generate paragraphs, sentences, or words instantly."
                />
                <meta
                    name="keywords"
                    content="lorem ipsum generator, placeholder text, dummy text, filler text, lorem ipsum copy paste, text generator, mockup text"
                />
                <link rel="canonical" href="https://caseconvert.online/lorem-ipsum" />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content="Lorem Ipsum Generator - Placeholder Text | CaseConvert" />
                <meta property="og:description" content="Generate high-quality placeholder text for your designs. Simple, fast, and customizable lorem ipsum." />
                <meta property="og:url" content="https://caseconvert.online/lorem-ipsum" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Lorem Ipsum Generator - Placeholder Text | CaseConvert" />
                <meta name="twitter:description" content="Create custom placeholder text for your next project instantly." />

                {/* Lorem Ipsum Specific Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Lorem Ipsum Generator",
                        "description": "Generate placeholder text for designs and layouts instantly.",
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
                                "name": "Lorem Ipsum Generator",
                                "item": "https://caseconvert.online/lorem-ipsum"
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
                        {/* Hero Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Lorem Ipsum <span className="text-gradient">Generator</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Generate placeholder text for your designs, mockups, and layouts.
                                Perfect for web developers and designers.
                            </p>
                        </div>

                        {/* Options Card */}
                        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 mb-6 animate-fade-in-delay-1">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {/* Type Selection */}
                                <div>
                                    <Label className="mb-2 block">Generate</Label>
                                    <div className="flex rounded-lg border border-border overflow-hidden">
                                        {(["paragraphs", "sentences", "words"] as GenerationType[]).map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setType(t)}
                                                className={`flex-1 py-2 px-3 text-sm capitalize transition-colors ${type === t
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-background hover:bg-accent"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Amount */}
                                <div>
                                    <Label htmlFor="amount" className="mb-2 block">Amount</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                                        min={1}
                                        max={100}
                                        className="bg-background"
                                    />
                                </div>

                                {/* Start with Lorem */}
                                <div className="flex items-end">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50 w-full">
                                        <Switch
                                            id="startLorem"
                                            checked={startWithLorem}
                                            onCheckedChange={setStartWithLorem}
                                        />
                                        <Label htmlFor="startLorem" className="cursor-pointer text-sm">
                                            Start with "Lorem ipsum"
                                        </Label>
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <div className="flex items-end">
                                    <Button onClick={generate} className="w-full gap-2">
                                        <RefreshCw className="w-4 h-4" />
                                        Generate
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Result Card */}
                        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 animate-fade-in-delay-2">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-foreground">Generated Text</label>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={download}>
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clear}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <Textarea value={result}
                                readOnly
                                placeholder="Click 'Generate' to create Lorem Ipsum text..."
                                className="min-h-[250px] font-sans text-lg resize-y"
                            />
                        </Card>

                        {/* Stats */}
                        {result && (
                            <div className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4 mt-6 animate-fade-in">
                                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Type className="w-4 h-4 text-primary" />
                                        <span>{charCount} Characters</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hash className="w-4 h-4 text-primary" />
                                        <span>{wordCount} Words</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Use Cases Section */}
                        <div className="mt-16 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                Perfect For <span className="text-gradient">Designers</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { title: "Web Mockups", desc: "Fill your website designs with realistic placeholder text" },
                                    { title: "App Designs", desc: "Test layouts and typography in mobile app mockups" },
                                    { title: "Print Layouts", desc: "Preview magazine, brochure, and poster designs" },
                                    { title: "Presentations", desc: "Create polished slides with placeholder content" },
                                ].map((item) => (
                                    <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default LoremIpsumGenerator;
