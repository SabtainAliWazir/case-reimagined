import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Trash2,
    ArrowRightLeft,
    Download,
    Type,
    Hash
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";

const Base64Encoder = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const encode = () => {
        if (!input.trim()) {
            toast.error("Please enter some text first");
            return;
        }
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            setResult(encoded);
            toast.success("Encoded to Base64!");
        } catch (e) {
            toast.error("Failed to encode: " + (e as Error).message);
        }
    };

    const decode = () => {
        if (!input.trim()) {
            toast.error("Please enter some Base64 first");
            return;
        }
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            setResult(decoded);
            toast.success("Decoded from Base64!");
        } catch (e) {
            toast.error("Invalid Base64 string");
        }
    };

    const handleAction = () => {
        if (mode === "encode") {
            encode();
        } else {
            decode();
        }
    };

    const swap = () => {
        setInput(result);
        setResult("");
        setMode(mode === "encode" ? "decode" : "encode");
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
        a.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded!");
    };

    const clear = () => {
        setInput("");
        setResult("");
        toast.success("Cleared");
    };

    return (
        <>
            <Helmet>
                <title>Base64 Encoder & Decoder - Encode/Decode Base64 Online | CaseConvert</title>
                <meta
                    name="description"
                    content="Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text instantly. Supports Unicode characters. Fast, private, works in your browser."
                />
                <meta
                    name="keywords"
                    content="base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, base64 online, text to base64"
                />
                <link rel="canonical" href="https://caseconvert.online/base64" />

                {/* Base64 Specific Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Base64 Encoder & Decoder",
                        "description": "Encode text to Base64 and decode Base64 back to text instantly.",
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
                                position: 1,
                                name: "Home",
                                item: "https://caseconvert.online/"
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "Base64 Encoder",
                                item: "https://caseconvert.online/base64"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-background">
                <Header />
                <main className="px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Base64 <span className="text-gradient">Encoder/Decoder</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Encode text to Base64 or decode Base64 back to text.
                                Supports Unicode characters for international text.
                            </p>
                        </div>

                        {/* Mode Toggle */}
                        <div className="flex justify-center mb-6 animate-fade-in-delay-1">
                            <div className="inline-flex rounded-lg border border-border overflow-hidden">
                                <button
                                    onClick={() => setMode("encode")}
                                    className={`px-6 py-2.5 text-sm font-medium transition-colors ${mode === "encode"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background hover:bg-accent"
                                        }`}
                                >
                                    Encode
                                </button>
                                <button
                                    onClick={() => setMode("decode")}
                                    className={`px-6 py-2.5 text-sm font-medium transition-colors ${mode === "decode"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background hover:bg-accent"
                                        }`}
                                >
                                    Decode
                                </button>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Input Card */}
                            <Card className="glass shadow-card p-6 animate-fade-in-delay-1">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-foreground">
                                        {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                                    </label>
                                    <span className="text-xs text-muted-foreground">{input.length} chars</span>
                                </div>
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                                    className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                                />
                            </Card>

                            {/* Result Card */}
                            <Card className="glass shadow-card p-6 animate-fade-in-delay-2">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-foreground">
                                        {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                                    </label>
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
                                <Textarea
                                    value={result}
                                    readOnly
                                    placeholder="Result will appear here..."
                                    className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 resize-none"
                                />
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center mt-6 animate-fade-in-delay-3">
                            <Button onClick={handleAction} className="gap-2 px-8">
                                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
                            </Button>
                            <Button onClick={swap} variant="secondary" className="gap-2">
                                <ArrowRightLeft className="w-4 h-4" />
                                Swap & Switch Mode
                            </Button>
                        </div>

                        {/* Stats */}
                        {result && (
                            <div className="glass rounded-xl p-4 shadow-card mt-6 animate-fade-in">
                                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Type className="w-4 h-4 text-primary" />
                                        <span>Input: {input.length} chars</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hash className="w-4 h-4 text-primary" />
                                        <span>Output: {result.length} chars</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Section */}
                        <div className="mt-16 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                What is <span className="text-gradient">Base64</span>?
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { title: "Safe for URLs", desc: "Base64 encoding makes binary data safe for transmission in URLs and emails" },
                                    { title: "Embed Data", desc: "Embed images, fonts, and files directly in HTML, CSS, and JSON" },
                                    { title: "API Tokens", desc: "Many APIs use Base64 for encoding authentication tokens and credentials" },
                                ].map((item) => (
                                    <Card key={item.title} className="glass shadow-card p-4">
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Related Tools */}
                        <RelatedTools currentPath="/base64" />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Base64Encoder;
