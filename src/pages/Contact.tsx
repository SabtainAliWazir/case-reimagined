import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
    Mail,
    MessageSquare,
    Send,
    MapPin,
    Clock
} from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Message sent! We'll get back to you soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | CaseConvert - Free Online Text Tools</title>
                <meta
                    name="description"
                    content="Contact the CaseConvert team. We'd love to hear from you! Send us feedback, suggestions, or questions about our free online text tools."
                />
                <link rel="canonical" href="https://caseconvert.online/contact" />
            </Helmet>
            <div className="min-h-screen bg-background">
                <Header />
                <main className="px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Contact <span className="text-gradient">Us</span>
                            </h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Have a question, suggestion, or feedback? We'd love to hear from you!
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Info */}
                            <div className="space-y-4 animate-fade-in-delay-1">
                                <Card className="glass shadow-card p-6">
                                    <Mail className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Email Us</h3>
                                    <a
                                        href="mailto:sabtainalicoder@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        sabtainalicoder@gmail.com
                                    </a>
                                </Card>

                                <Card className="glass shadow-card p-6">
                                    <Clock className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Response Time</h3>
                                    <p className="text-muted-foreground">
                                        We typically respond within 24-48 hours
                                    </p>
                                </Card>

                                <Card className="glass shadow-card p-6">
                                    <MapPin className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2">Location</h3>
                                    <p className="text-muted-foreground">
                                        Serving users worldwide 🌍
                                    </p>
                                </Card>
                            </div>

                            {/* Contact Form */}
                            <Card className="glass shadow-card p-6 lg:col-span-2 animate-fade-in-delay-2">
                                <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">Your Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            required
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more..."
                                            required
                                            className="mt-1 min-h-[150px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full gap-2"
                                        disabled={isSubmitting}
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </Card>
                        </div>

                        {/* FAQ Preview */}
                        <Card className="glass shadow-card p-8 mt-8 animate-fade-in-delay-3">
                            <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h3 className="font-medium text-foreground">Is CaseConvert really free?</h3>
                                    <p>Yes! All our tools are completely free with no hidden charges or subscriptions.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Is my data safe?</h3>
                                    <p>Absolutely. All processing happens in your browser. We never store or transmit your text.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Can I suggest a new tool?</h3>
                                    <p>We love hearing ideas! Use the form above to send us your suggestions.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Contact;
