import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Copy,
    RefreshCw,
    Shield,
    Eye,
    EyeOff,
    Trash2,
    Plus
} from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";

interface PasswordOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

const PasswordGenerator = () => {
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [passwords, setPasswords] = useState<string[]>([]);
    const [showPasswords, setShowPasswords] = useState(true);

    const generatePassword = useCallback((opts: PasswordOptions): string => {
        const chars = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
        };

        let charset = "";
        if (opts.uppercase) charset += chars.uppercase;
        if (opts.lowercase) charset += chars.lowercase;
        if (opts.numbers) charset += chars.numbers;
        if (opts.symbols) charset += chars.symbols;

        if (charset.length === 0) {
            return "";
        }

        let password = "";
        const array = new Uint32Array(opts.length);
        crypto.getRandomValues(array);

        for (let i = 0; i < opts.length; i++) {
            password += charset[array[i] % charset.length];
        }

        return password;
    }, []);

    const generate = () => {
        if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
            toast.error("Please select at least one character type");
            return;
        }
        const newPassword = generatePassword(options);
        setPasswords([newPassword, ...passwords.slice(0, 9)]);
        toast.success("Password generated!");
    };

    const generateMultiple = () => {
        if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
            toast.error("Please select at least one character type");
            return;
        }
        const newPasswords = Array.from({ length: 5 }, () => generatePassword(options));
        setPasswords([...newPasswords, ...passwords.slice(0, 5)]);
        toast.success("5 passwords generated!");
    };

    const copyPassword = (password: string) => {
        navigator.clipboard.writeText(password);
        toast.success("Copied to clipboard!");
    };

    const clear = () => {
        setPasswords([]);
        toast.success("Cleared");
    };

    const getStrength = (password: string): { label: string; color: string; percent: number } => {
        if (!password) return { label: "None", color: "bg-muted", percent: 0 };

        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;

        if (score <= 2) return { label: "Weak", color: "bg-destructive", percent: 25 };
        if (score <= 4) return { label: "Fair", color: "bg-yellow-500", percent: 50 };
        if (score <= 5) return { label: "Good", color: "bg-blue-500", percent: 75 };
        return { label: "Strong", color: "bg-green-500", percent: 100 };
    };

    const latestPassword = passwords[0] || "";
    const strength = getStrength(latestPassword);

    return (
        <>
            <Helmet>
                <title>Password Generator - Create Strong Secure Passwords | CaseConvert</title>
                <meta
                    name="description"
                    content="Free online password generator. Create strong, secure random passwords with customizable length and character types. Cryptographically secure and 100% private."
                />
                <meta
                    name="keywords"
                    content="password generator, strong password, random password, secure password generator, password creator, random password generator online"
                />
                <link rel="canonical" href="https://caseconvert.online/password-generator" />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content="Secure Password Generator Online | CaseConvert" />
                <meta property="og:description" content="Generate strong, secure, and random passwords instantly. Fully private and browser-based." />
                <meta property="og:url" content="https://caseconvert.online/password-generator" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Secure Password Generator Online | CaseConvert" />
                <meta name="twitter:description" content="Create unhackable passwords with our free online security tool." />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content="Secure Password Generator Online | CaseConvert" />
                <meta property="og:description" content="Generate strong, secure, and random passwords instantly. Fully private and browser-based." />
                <meta property="og:url" content="https://caseconvert.online/password-generator" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Secure Password Generator Online | CaseConvert" />
                <meta name="twitter:description" content="Create unhackable passwords with our free online security tool." />

                {/* Password Generator Specific Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Secure Password Generator",
                        "description": "Create strong, secure, and random passwords instantly.",
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
                                "name": "Password Generator",
                                "item": "https://caseconvert.online/password-generator"
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
                <Header />
                <main className="px-4 py-12">
                    <div className="max-w-3xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-8 animate-fade-in">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Password <span className="text-gradient">Generator</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Generate strong, secure passwords instantly.
                                Uses cryptographically secure randomness for maximum security.
                            </p>
                        </div>

                        {/* Generator Card */}
                        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 mb-6 animate-fade-in-delay-1">
                            {/* Latest Password Display */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-foreground">Generated Password</label>
                                    <Button variant="ghost" size="sm" onClick={() => setShowPasswords(!showPasswords)} className="gap-2 h-8">
                                        {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        {showPasswords ? "Hide" : "Show"}
                                    </Button>
                                </div>
                                <div className="relative group">
                                    <div
                                        className="w-full p-4 rounded-xl bg-background/50 border border-border/50 font-mono text-lg break-all min-h-[60px] flex items-center"
                                    >
                                        {latestPassword ? (
                                            showPasswords ? latestPassword : "•".repeat(latestPassword.length)
                                        ) : (
                                            <span className="text-muted-foreground">Click Generate to create a password</span>
                                        )}
                                    </div>
                                    {latestPassword && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => copyPassword(latestPassword)}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>

                                {/* Strength Meter */}
                                {latestPassword && (
                                    <div className="mt-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Password Strength</span>
                                            <span className={`font-medium ${strength.percent === 100 ? 'text-green-500' : strength.percent >= 75 ? 'text-blue-500' : strength.percent >= 50 ? 'text-yellow-500' : 'text-destructive'}`}>
                                                {strength.label}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${strength.color}`}
                                                style={{ width: `${strength.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Length Slider */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-3">
                                    <Label>Password Length</Label>
                                    <span className="text-sm font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
                                        {options.length}
                                    </span>
                                </div>
                                <Slider
                                    value={[options.length]}
                                    onValueChange={(value) => setOptions({ ...options, length: value[0] })}
                                    min={4}
                                    max={64}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>4</span>
                                    <span>64</span>
                                </div>
                            </div>

                            {/* Character Options */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                    <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
                                    <Switch
                                        id="uppercase"
                                        checked={options.uppercase}
                                        onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                    <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
                                    <Switch
                                        id="lowercase"
                                        checked={options.lowercase}
                                        onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                    <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
                                    <Switch
                                        id="numbers"
                                        checked={options.numbers}
                                        onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                                    <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#$)</Label>
                                    <Switch
                                        id="symbols"
                                        checked={options.symbols}
                                        onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Button onClick={generate} className="gap-2">
                                    <RefreshCw className="w-4 h-4" />
                                    Generate Password
                                </Button>
                                <Button onClick={generateMultiple} variant="secondary" className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Generate 5
                                </Button>
                                <Button onClick={clear} variant="outline" className="gap-2">
                                    <Trash2 className="w-4 h-4" />
                                    Clear
                                </Button>
                            </div>
                        </Card>

                        {/* Password History */}
                        {passwords.length > 1 && (
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8 animate-fade-in-delay-2">
                                <h3 className="font-semibold mb-4">Recent Passwords</h3>
                                <div className="space-y-2">
                                    {passwords.slice(1).map((password, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 group"
                                        >
                                            <span className="font-mono text-sm truncate max-w-[80%]">
                                                {showPasswords ? password : "•".repeat(Math.min(password.length, 20))}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => copyPassword(password)}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Features Section */}
                        <div className="mt-16 animate-fade-in-delay-3">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                Secure Password <span className="text-gradient">Features</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { icon: Shield, title: "Cryptographically Secure", desc: "Uses crypto.getRandomValues() for true randomness" },
                                    { icon: Eye, title: "Show/Hide Toggle", desc: "Easily toggle password visibility" },
                                    { icon: RefreshCw, title: "Instant Generation", desc: "Generate passwords in milliseconds" },
                                ].map((item) => (
                                    <Card key={item.title} className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-4">
                                        <item.icon className="w-8 h-8 text-primary mb-3" />
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Related Tools */}
                        <RelatedTools currentPath="/password-generator" />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default PasswordGenerator;
