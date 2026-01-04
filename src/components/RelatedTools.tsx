import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
    Hash,
    Binary,
    Radio,
    Sparkles,
    Eraser,
    Braces,
    KeyRound,
    FileText,
    Code,
    Link2,
    Fingerprint,
    Type
} from "lucide-react";

const allTools = [
    { href: "/", icon: Type, title: "Case Converter", description: "Convert text case styles" },
    { href: "/word-counter", icon: Hash, title: "Word Counter", description: "Count words & characters" },
    { href: "/text-formatter", icon: Sparkles, title: "Text Formatter", description: "Fancy text styles" },
    { href: "/text-cleaner", icon: Eraser, title: "Text Cleaner", description: "Clean messy text" },
    { href: "/binary-translator", icon: Binary, title: "Binary Translator", description: "Text to binary" },
    { href: "/morse-translator", icon: Radio, title: "Morse Translator", description: "Text to morse code" },
    { href: "/json-formatter", icon: Braces, title: "JSON Formatter", description: "Beautify & validate JSON" },
    { href: "/password-generator", icon: KeyRound, title: "Password Generator", description: "Secure passwords" },
    { href: "/lorem-ipsum", icon: FileText, title: "Lorem Ipsum", description: "Placeholder text" },
    { href: "/base64", icon: Code, title: "Base64 Encoder", description: "Encode & decode" },
    { href: "/url-encoder", icon: Link2, title: "URL Encoder", description: "URL encode/decode" },
    { href: "/hash-generator", icon: Fingerprint, title: "Hash Generator", description: "MD5, SHA-256 hashes" },
];

interface RelatedToolsProps {
    currentPath: string;
    maxTools?: number;
}

export const RelatedTools = ({ currentPath, maxTools = 4 }: RelatedToolsProps) => {
    // Filter out current tool and get random related tools
    const relatedTools = allTools
        .filter(tool => tool.href !== currentPath)
        .sort(() => Math.random() - 0.5)
        .slice(0, maxTools);

    return (
        <div className="mt-16 animate-fade-in-delay-3">
            <h2 className="text-2xl font-bold text-center mb-6">
                More <span className="text-gradient">Text Tools</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedTools.map((tool) => (
                    <Link key={tool.href} to={tool.href}>
                        <Card className="glass shadow-card p-4 h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                            <tool.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedTools;
