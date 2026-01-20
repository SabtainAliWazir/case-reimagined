import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import {
    Type,
    Zap,
    Shield,
    Globe,
    Heart,
    Sparkles
} from "lucide-react";

const About = () => {
    const features = [
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "All processing happens instantly in your browser with zero server delay.",
        },
        {
            icon: Shield,
            title: "100% Private",
            description: "Your text never leaves your device. We don't store or transmit any data.",
        },
        {
            icon: Globe,
            title: "Always Free",
            description: "All our tools are completely free to use with no sign-up required.",
        },
        {
            icon: Sparkles,
            title: "No Limits",
            description: "Process unlimited text with no character limits or usage restrictions.",
        },
    ];

    const tools = [
        "Case Converter (uppercase, lowercase, title case, and more)",
        "Word Counter with reading time estimation",
        "Text Formatter (strikethrough, underline, fancy text)",
        "Text Cleaner (remove spaces, duplicates, normalize)",
        "Binary Translator (text to binary and back)",
        "Morse Code Translator with audio playback",
        "JSON Formatter, Beautifier & Validator",
        "Secure Password Generator",
        "Lorem Ipsum Generator",
        "Base64 Encoder/Decoder",
        "URL Encoder/Decoder",
        "Hash Generator (MD5, SHA256)",
    ];

    return (
        <>
            <Helmet>
                <title>About Us | CaseConvert - Free Online Text Tools</title>
                <meta
                    name="description"
                    content="CaseConvert is a free collection of online text tools. Learn about our mission to provide fast, private, and unlimited text utilities for everyone."
                />
                <link rel="canonical" href="https://caseconvert.online/about" />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content="About CaseConvert - Our Mission & Tools" />
                <meta property="og:description" content="Learn more about CaseConvert, our mission to provide free, fast, and private text tools for everyone." />
                <meta property="og:url" content="https://caseconvert.online/about" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="About CaseConvert - Our Mission & Tools" />
                <meta name="twitter:description" content="Discover the mission behind CaseConvert and our suite of free text utilities." />

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
                                "name": "About",
                                "item": "https://caseconvert.online/about"
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
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <Type className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                About <span className="text-gradient">CaseConvert</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                Free, fast, and private text tools for everyone.
                            </p>
                        </div>

                        {/* Mission */}
                        <Card className="glass shadow-card p-8 mb-8 animate-fade-in-delay-1">
                            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                CaseConvert was built with a simple mission: to provide a comprehensive suite of
                                text manipulation tools that are <strong className="text-foreground">fast</strong>,
                                <strong className="text-foreground"> private</strong>, and
                                <strong className="text-foreground"> completely free</strong>.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-4">
                                Unlike many online tools that process your data on their servers, all CaseConvert
                                tools run entirely in your browser. Your text never leaves your device, ensuring
                                complete privacy for sensitive content.
                            </p>
                        </Card>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8 animate-fade-in-delay-2">
                            {features.map((feature) => (
                                <Card key={feature.title} className="glass shadow-card p-6">
                                    <feature.icon className="w-10 h-10 text-primary mb-4" />
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </Card>
                            ))}
                        </div>

                        {/* Tools List */}
                        <Card className="glass shadow-card p-8 mb-8 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-semibold mb-6">Our Tools</h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {tools.map((tool, index) => (
                                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                        <span>{tool}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Made With Love */}
                        <div className="text-center animate-fade-in-delay-3">
                            <Card className="glass shadow-card p-8 inline-block">
                                <div className="flex items-center justify-center gap-2 text-lg">
                                    <span>Made with</span>
                                    <Heart className="w-5 h-5 text-destructive fill-destructive" />
                                    <span>for text lovers everywhere</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default About;
