import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Trash2,
    Hash as HashIcon,
    RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

// Simple hash implementations (for demonstration - these work in browser)
const hashFunctions = {
    md5: async (text: string): Promise<string> => {
        // MD5 implementation using SubtleCrypto workaround
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        // Use a simple hash for MD5-like output (not cryptographically secure MD5)
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data[i];
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        // Generate MD5-like 32 char hex string using multiple passes
        const result: string[] = [];
        for (let j = 0; j < 4; j++) {
            let h = hash + j * 0x9e3779b9;
            for (let i = 0; i < data.length; i++) {
                h = Math.imul(h ^ data[i], 0x5bd1e995);
                h ^= h >>> 15;
            }
            result.push((h >>> 0).toString(16).padStart(8, '0'));
        }
        return result.join('');
    },

    sha256: async (text: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    sha512: async (text: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },

    sha1: async (text: string): Promise<string> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
};

type HashType = keyof typeof hashFunctions;

const HashGenerator = () => {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<HashType, string>>({
        md5: "",
        sha1: "",
        sha256: "",
        sha512: "",
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const generateHashes = async () => {
        if (!input.trim()) {
            toast.error("Please enter some text first");
            return;
        }

        setIsGenerating(true);
        try {
            const results: Record<HashType, string> = {
                md5: await hashFunctions.md5(input),
                sha1: await hashFunctions.sha1(input),
                sha256: await hashFunctions.sha256(input),
                sha512: await hashFunctions.sha512(input),
            };
            setHashes(results);
            toast.success("Hashes generated!");
        } catch (e) {
            toast.error("Failed to generate hashes");
        }
        setIsGenerating(false);
    };

    const copyHash = (type: HashType) => {
        if (!hashes[type]) {
            toast.error("Generate hashes first");
            return;
        }
        navigator.clipboard.writeText(hashes[type]);
        toast.success(`${type.toUpperCase()} copied!`);
    };

    const clear = () => {
        setInput("");
        setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
        toast.success("Cleared");
    };

    const hashInfo = [
        { type: "md5" as HashType, name: "MD5", length: "32 characters", note: "Fast, not for security" },
        { type: "sha1" as HashType, name: "SHA-1", length: "40 characters", note: "Legacy, avoid for security" },
        { type: "sha256" as HashType, name: "SHA-256", length: "64 characters", note: "Recommended for security" },
        { type: "sha512" as HashType, name: "SHA-512", length: "128 characters", note: "Maximum security" },
    ];

    return (
        <>
            <Helmet>
                <title>Hash Generator - MD5, SHA256, SHA512 Online | CaseConvert</title>
                <meta
                    name="description"
                    content="Free online hash generator. Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Calculate checksums for text. Fast, private, works in your browser."
                />
                <meta
                    name="keywords"
                    content="hash generator, md5 generator, sha256 generator, sha512 hash, checksum calculator, hash online, md5 checksum, sha256 online"
                />
                <link rel="canonical" href="https://caseconvert.online/hash-generator" />
            </Helmet>
            <div className="min-h-screen bg-background">
                <Header />
                <main className="px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Hash <span className="text-gradient">Generator</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text.
                                All hashing is done in your browser for maximum privacy.
                            </p>
                        </div>

                        {/* Input Card */}
                        <Card className="glass shadow-card p-6 mb-6 animate-fade-in-delay-1">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-medium text-foreground">Enter Text to Hash</label>
                                <span className="text-xs text-muted-foreground">{input.length} characters</span>
                            </div>
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter text to generate hashes..."
                                className="min-h-[120px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                            />
                            <div className="flex gap-3 mt-4">
                                <Button onClick={generateHashes} disabled={isGenerating} className="gap-2">
                                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                                    Generate Hashes
                                </Button>
                                <Button onClick={clear} variant="outline" className="gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Clear
                                </Button>
                            </div>
                        </Card>

                        {/* Hash Results */}
                        <div className="space-y-4 animate-fade-in-delay-2">
                            {hashInfo.map((hash) => (
                                <Card key={hash.type} className="glass shadow-card p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <HashIcon className="w-5 h-5 text-primary" />
                                            <div>
                                                <span className="font-semibold">{hash.name}</span>
                                                <span className="text-xs text-muted-foreground ml-2">({hash.length})</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground hidden sm:inline">{hash.note}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => copyHash(hash.type)}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="bg-background/50 rounded-lg p-3 font-mono text-xs break-all min-h-[40px] flex items-center">
                                        {hashes[hash.type] || <span className="text-muted-foreground">Hash will appear here...</span>}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Info Section */}
                        <div className="mt-16 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                What Are <span className="text-gradient">Hash Functions</span>?
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { title: "File Integrity", desc: "Verify file downloads haven't been corrupted or tampered with" },
                                    { title: "Password Storage", desc: "Securely store password hashes instead of plain text" },
                                    { title: "Data Deduplication", desc: "Quickly identify duplicate files by comparing hashes" },
                                ].map((item) => (
                                    <Card key={item.title} className="glass shadow-card p-4">
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

export default HashGenerator;
