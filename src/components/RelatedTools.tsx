import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { allCalculators } from "@/pages/CalculatorsIndex";
import {
    Hash, Binary, Radio, Sparkles, Eraser, Braces, KeyRound,
    FileText, Code, Link2, Fingerprint, Type, FolderArchive, FileArchive, Image as ImageIcon, Clock
} from "lucide-react";

const textAndFileTools = [
    { category: "Text & Dev", href: "/", icon: Type, title: "Case Converter", description: "Convert text case styles" },
    { category: "Text & Dev", href: "/word-counter", icon: Hash, title: "Word Counter", description: "Count words & characters" },
    { category: "Text & Dev", href: "/text-formatter", icon: Sparkles, title: "Text Formatter", description: "Fancy text styles" },
    { category: "Text & Dev", href: "/text-cleaner", icon: Eraser, title: "Text Cleaner", description: "Clean messy text" },
    { category: "Text & Dev", href: "/binary-translator", icon: Binary, title: "Binary Translator", description: "Text to binary" },
    { category: "Text & Dev", href: "/morse-translator", icon: Radio, title: "Morse Translator", description: "Text to morse code" },
    { category: "Text & Dev", href: "/json-formatter", icon: Braces, title: "JSON Formatter", description: "Beautify & validate JSON" },
    { category: "Text & Dev", href: "/password-generator", icon: KeyRound, title: "Password Generator", description: "Secure passwords" },
    { category: "Text & Dev", href: "/lorem-ipsum", icon: FileText, title: "Lorem Ipsum", description: "Placeholder text" },
    { category: "Text & Dev", href: "/base64", icon: Code, title: "Base64 Encoder", description: "Encode & decode" },
    { category: "Text & Dev", href: "/url-encoder", icon: Link2, title: "URL Encoder", description: "URL encode/decode" },
    { category: "Text & Dev", href: "/hash-generator", icon: Fingerprint, title: "Hash Generator", description: "MD5, SHA-256 hashes" },
    { category: "Text & Dev", href: "/epoch-converter", icon: Clock, title: "Epoch Converter", description: "Unix timestamp converter" },
    { category: "File Tools", href: "/zip-creator", icon: FileArchive, title: "ZIP Creator", description: "Compress files" },
    { category: "File Tools", href: "/zip-extractor", icon: FolderArchive, title: "ZIP Extractor", description: "Extract archives" },
    { category: "File Tools", href: "/image-converter", icon: ImageIcon, title: "Image Converter", description: "Convert image formats" },
];

const masterToolPool = [...textAndFileTools, ...allCalculators];

interface RelatedToolsProps {
    currentPath: string;
    maxTools?: number;
}

export const RelatedTools = ({ currentPath, maxTools = 4 }: RelatedToolsProps) => {
    const currentTool = masterToolPool.find(t => t.href === currentPath || currentPath.endsWith(t.href));
    const targetCategory = currentTool ? currentTool.category : "Text & Dev";

    // 1. Get tools in the EXACT same semantic category
    let relatedTools = masterToolPool
        .filter(tool => tool.href !== currentPath && tool.category === targetCategory)
        .sort(() => Math.random() - 0.5);

    // 2. If we don't have enough, fill with random tools to maintain layout
    if (relatedTools.length < maxTools) {
        const fillers = masterToolPool
            .filter(tool => tool.href !== currentPath && tool.category !== targetCategory)
            .sort(() => Math.random() - 0.5);
        relatedTools = [...relatedTools, ...fillers];
    }

    relatedTools = relatedTools.slice(0, maxTools);

    return (
        <div className="mt-16 animate-fade-in-delay-3">
            <h2 className="text-2xl font-heading font-bold text-center mb-6">
                More <span className="text-gradient">{targetCategory}</span> Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link key={tool.href} to={tool.href}>
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                                <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-heading font-semibold text-sm mb-1 line-clamp-1">{tool.title}</h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedTools;
