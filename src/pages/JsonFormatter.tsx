import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Trash2,
    Sparkles,
    Minimize2,
    CheckCircle2,
    AlertCircle,
    Download,
    Type,
    Hash
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";

const JsonFormatter = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [indentSize, setIndentSize] = useState(2);

    const beautify = () => {
        if (!input.trim()) {
            toast.error("Please enter some JSON first");
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setResult(formatted);
            setError("");
            toast.success("JSON beautified successfully!");
        } catch (e) {
            setError((e as Error).message);
            setResult("");
            toast.error("Invalid JSON: " + (e as Error).message);
        }
    };

    const minify = () => {
        if (!input.trim()) {
            toast.error("Please enter some JSON first");
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setResult(minified);
            setError("");
            const saved = input.length - minified.length;
            toast.success(`JSON minified! Saved ${saved} characters`);
        } catch (e) {
            setError((e as Error).message);
            setResult("");
            toast.error("Invalid JSON: " + (e as Error).message);
        }
    };

    const validate = () => {
        if (!input.trim()) {
            toast.error("Please enter some JSON first");
            return;
        }
        try {
            JSON.parse(input);
            setError("");
            toast.success("✓ Valid JSON!");
        } catch (e) {
            setError((e as Error).message);
            toast.error("Invalid JSON: " + (e as Error).message);
        }
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
        const blob = new Blob([result], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formatted.json";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded!");
    };

    const clear = () => {
        setInput("");
        setResult("");
        setError("");
        toast.success("Cleared");
    };

    const loadSample = () => {
        const sample = {
            name: "CaseConvert",
            type: "Web Application",
            features: ["JSON Formatter", "Password Generator", "Lorem Ipsum"],
            version: 1.0,
            active: true,
            author: { name: "Developer", email: "dev@example.com" }
        };
        setInput(JSON.stringify(sample));
        toast.success("Sample JSON loaded!");
    };

    return (
        <>
            <Helmet>
                <title>JSON Formatter & Validator - Beautify & Minify JSON Online | CaseConvert</title>
                <meta
                    name="description"
                    content="Free online JSON formatter, beautifier, minifier and validator. Format JSON with proper indentation, compress JSON to single line, and validate JSON syntax. Fast and private."
                />
                <meta
                    name="keywords"
                    content="json formatter, json beautifier, json minifier, json validator, format json online, pretty print json, compress json, json tool"
                />
                <link rel="canonical" href="https://caseconvert.online/json-formatter" />

                {/* JSON Formatter Specific Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Online JSON Formatter & Validator",
                        "description": "Format, beautify, minify, and validate JSON code online.",
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
                                "name": "JSON Formatter",
                                "item": "https://caseconvert.online/json-formatter"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-background">
                <Header />
                <main className="px-4 py-12">
                    <div className="max-w-5xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                JSON <span className="text-gradient">Formatter</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Beautify, minify, and validate your JSON data.
                                Free online JSON formatting tool with syntax highlighting.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Input Card */}
                            <Card className="glass shadow-card p-6 animate-fade-in-delay-1">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-foreground">Input JSON</label>
                                    <Button variant="ghost" size="sm" onClick={loadSample} className="text-xs h-7">
                                        Load Sample
                                    </Button>
                                </div>
                                <Textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder='{"key": "value", "array": [1, 2, 3]}'
                                    className="min-h-[300px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                                />
                                {error && (
                                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-destructive">{error}</span>
                                    </div>
                                )}
                            </Card>

                            {/* Result Card */}
                            <Card className="glass shadow-card p-6 animate-fade-in-delay-2">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-foreground">Formatted Output</label>
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
                                    placeholder="Formatted JSON will appear here..."
                                    className="min-h-[300px] font-mono text-sm bg-background/50 border-border/50 resize-none"
                                />
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="glass rounded-xl p-6 shadow-card mt-6 animate-fade-in-delay-3">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-muted-foreground">Indent:</label>
                                    <select
                                        value={indentSize}
                                        onChange={(e) => setIndentSize(Number(e.target.value))}
                                        className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm"
                                    >
                                        <option value={2}>2 spaces</option>
                                        <option value={4}>4 spaces</option>
                                        <option value={1}>1 tab</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <Button onClick={beautify} className="gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Beautify
                                    </Button>
                                    <Button onClick={minify} variant="secondary" className="gap-2">
                                        <Minimize2 className="w-4 h-4" />
                                        Minify
                                    </Button>
                                    <Button onClick={validate} variant="outline" className="gap-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Validate
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        {result && (
                            <div className="glass rounded-xl p-4 shadow-card mt-6 animate-fade-in">
                                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Type className="w-4 h-4 text-primary" />
                                        <span>{result.length} Characters</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Hash className="w-4 h-4 text-primary" />
                                        <span>{result.split('\n').length} Lines</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Use Cases Section */}
                        <div className="mt-16 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                Why Use Our <span className="text-gradient">JSON Formatter</span>?
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { title: "Beautify JSON", desc: "Pretty print with proper indentation for easy reading" },
                                    { title: "Minify JSON", desc: "Compress JSON for smaller file sizes and faster loading" },
                                    { title: "Validate JSON", desc: "Check for syntax errors before using in your code" },
                                    { title: "100% Private", desc: "All processing happens in your browser - no data sent anywhere" },
                                ].map((item) => (
                                    <Card key={item.title} className="glass shadow-card p-4">
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Related Tools */}
                        <RelatedTools currentPath="/json-formatter" />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default JsonFormatter;
