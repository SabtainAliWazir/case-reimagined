import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { allCalculators } from "@/pages/CalculatorsIndex";
import {
    Hash, Binary, Radio, Sparkles, Eraser, Braces, KeyRound,
    FileText, Code, Link2, Fingerprint, Type, FolderArchive, FileArchive, Image as ImageIcon, Clock
} from "lucide-react";

const textAndFileTools = [
    { category: "Case Converters", href: "/", icon: Type, title: "All-in-One Case Converter", description: "Convert between all case styles" },
    { category: "Case Converters", href: "/uppercase-converter", icon: Type, title: "Uppercase Converter", description: "Convert text to ALL CAPS" },
    { category: "Case Converters", href: "/lowercase-converter", icon: Type, title: "Lowercase Converter", description: "Convert text to small letters" },
    { category: "Case Converters", href: "/title-case-converter", icon: Type, title: "Title Case Converter", description: "Capitalize titles and headlines" },
    { category: "Case Converters", href: "/sentence-case-converter", icon: Type, title: "Sentence Case Converter", description: "Capitalize sentences properly" },
    { category: "Case Converters", href: "/capitalized-case-converter", icon: Type, title: "Capitalized Case Converter", description: "Capitalize every word" },
    { category: "Case Converters", href: "/camelcase-converter", icon: Code, title: "camelCase Converter", description: "Convert text to camelCase" },
    { category: "Case Converters", href: "/kebab-case-converter", icon: Link2, title: "kebab-case Converter", description: "Generate URL slugs" },
    { category: "Case Converters", href: "/pascal-case-converter", icon: Code, title: "PascalCase Converter", description: "UpperCamelCase generator" },
    { category: "Case Converters", href: "/alternating-case-converter", icon: Sparkles, title: "Alternating Case Converter", description: "SpongeBob meme sarcasm text" },
    { category: "Case Converters", href: "/camelcase-to-snake-case", icon: Code, title: "camelCase to snake_case", description: "JS to Python identifiers" },
    { category: "Case Converters", href: "/snake-case-to-camelcase", icon: Code, title: "snake_case to camelCase", description: "Python to JS identifiers" },
    { category: "Case Converters", href: "/pascalcase-to-camelcase", icon: Code, title: "PascalCase to camelCase", description: "React components to variables" },
    { category: "Case Converters", href: "/kebab-case-to-camelcase", icon: Link2, title: "kebab-case to camelCase", description: "CSS styles to React props" },
    { category: "Case Converters", href: "/reverse-text-generator", icon: Type, title: "Reverse Text Generator", description: "Spell text backwards" },
    { category: "Text & Dev", href: "/slug-generator", icon: Link2, title: "SEO Slug Generator", description: "Generate clean URL slugs" },
    { category: "Text & Dev", href: "/small-text-generator", icon: Sparkles, title: "Small Text Generator", description: "Tiny superscript & small caps" },
    { category: "Text & Dev", href: "/binary-to-hex", icon: Binary, title: "Binary to Hex", description: "Convert Base-2 to Base-16" },
    { category: "Text & Dev", href: "/binary-to-morse-code", icon: Binary, title: "Binary to Morse", description: "Binary to Morse with audio" },
    { category: "Text & Dev", href: "/base64-to-hex", icon: Code, title: "Base64 to Hex", description: "Base64 to Hexadecimal bytes" },
    { category: "Text & Dev", href: "/word-frequency-counter", icon: Hash, title: "Word Frequency", description: "Analyze keyword density" },
    { category: "Text & Dev", href: "/text-diff-checker", icon: Code, title: "Text Diff Checker", description: "Compare text differences" },
    { category: "Text & Dev", href: "/caesar-cipher", icon: KeyRound, title: "Caesar Cipher", description: "ROT13 & alphabet shift cipher" },
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
