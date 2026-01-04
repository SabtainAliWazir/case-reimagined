import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
    toolName: string;
}

export const FAQSection = ({ faqs, toolName }: FAQSectionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="mt-16 animate-fade-in-delay-3">
            {/* FAQ Schema for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <h2 className="text-2xl font-bold text-center mb-6">
                Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-3">
                {faqs.map((faq, index) => (
                    <Card
                        key={index}
                        className="glass shadow-card overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-medium pr-4">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
