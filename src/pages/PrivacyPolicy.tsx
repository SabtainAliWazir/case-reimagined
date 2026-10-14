import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Shield, Eye, Cookie, Database, Lock, Mail } from "lucide-react";

const PrivacyPolicy = () => {
    const lastUpdated = "January 4, 2026";

    return (
        <>
            <Helmet>
                <title>Privacy Policy | CaseConvert - Free Online Text Tools</title>
                <meta
                    name="description"
                    content="Privacy Policy for CaseConvert. Learn how we handle your data. All text processing happens in your browser - we never store or transmit your data."
                />
                <link rel="canonical" href="https://caseconvert.online/privacy" />

                {/* Social Media Meta Tags */}
                <meta property="og:title" content="Privacy Policy - How CaseConvert Protects Your Data" />
                <meta property="og:description" content="Read our privacy policy. At CaseConvert, your data stays in your browser. We never store or transmit your text." />
                <meta property="og:url" content="https://caseconvert.online/privacy" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Privacy Policy - How CaseConvert Protects Your Data" />
                <meta name="twitter:description" content="Learn how CaseConvert ensures 100% private text processing." />

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
                                "name": "Privacy Policy",
                                "item": "https://caseconvert.online/privacy"
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
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Privacy <span className="text-gradient">Policy</span>
                            </h1>
                            <p className="text-muted-foreground">
                                Last updated: {lastUpdated}
                            </p>
                        </div>

                        <div className="space-y-8 animate-fade-in-delay-1">
                            {/* Introduction */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-primary" />
                                    Overview
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    At CaseConvert ("we", "our", or "us"), we are committed to protecting your privacy.
                                    This Privacy Policy explains how we collect, use, and safeguard your information when
                                    you use our website at caseconvert.online (the "Service").
                                </p>
                            </Card>

                            {/* Data Collection */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Database className="w-5 h-5 text-primary" />
                                    Information We Collect
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <div>
                                        <h3 className="font-medium text-foreground mb-2">Text Processing Data</h3>
                                        <p>
                                            <strong className="text-green-500">We do NOT collect, store, or transmit any text you enter into our tools.</strong> All
                                            text processing happens entirely in your browser using JavaScript. Your text never
                                            leaves your device.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground mb-2">Analytics Data</h3>
                                        <p>
                                            We may use third-party analytics services (such as Google Analytics) to collect
                                            anonymous usage data including: pages visited, time spent on site, browser type,
                                            device type, and approximate geographic location. This data helps us improve
                                            our services.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground mb-2">Cookies</h3>
                                        <p>
                                            We use cookies for theme preferences (dark/light mode) and to enable third-party
                                            services like analytics and advertising. You can disable cookies in your browser settings.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Cookies */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Cookie className="w-5 h-5 text-primary" />
                                    Cookies & Tracking
                                </h2>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>We use the following types of cookies:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>Essential cookies:</strong> Required for basic functionality (theme preference)</li>
                                        <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                                        <li><strong>Advertising cookies:</strong> Used by ad networks to show relevant ads</li>
                                    </ul>
                                </div>
                            </Card>

                            {/* Third Party Services */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary" />
                                    Third-Party Services
                                </h2>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>We may use the following third-party services:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>Google Analytics:</strong> For anonymous website analytics and traffic performance measurement.</li>
                                        <li>
                                            <strong>Google AdSense &amp; Advertising Partners:</strong> Google, as a third-party vendor, uses cookies to serve advertisements on CaseConvert. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        Users may opt out of personalized advertising by visiting{" "}
                                        <a
                                            href="https://www.google.com/settings/ads"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Google Ads Settings
                                        </a>{" "}
                                        or through the Digital Advertising Alliance at{" "}
                                        <a
                                            href="https://www.aboutads.info/choices/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline font-medium"
                                        >
                                            aboutads.info
                                        </a>.
                                    </p>
                                </div>
                            </Card>

                            {/* Your Rights */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>You have the right to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Access the personal data we hold about you</li>
                                        <li>Request correction of inaccurate data</li>
                                        <li>Request deletion of your data</li>
                                        <li>Opt-out of analytics and advertising cookies</li>
                                        <li>Withdraw consent at any time</li>
                                    </ul>
                                </div>
                            </Card>

                            {/* Contact */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Contact Us
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us at:{" "}
                                    <a href="mailto:sabtainalicoder@gmail.com" className="text-primary hover:underline">
                                        sabtainalicoder@gmail.com
                                    </a>
                                </p>
                            </Card>

                            {/* Updates */}
                            <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card rounded-3xl p-6 md:p-8">
                                <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any
                                    changes by posting the new Privacy Policy on this page and updating the "Last updated"
                                    date at the top.
                                </p>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default PrivacyPolicy;
