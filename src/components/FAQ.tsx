import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a text case converter?",
    answer: "A text case converter is a tool that transforms the capitalization of your text. It can convert between uppercase (ALL CAPS), lowercase (all small letters), title case (First Letter Capitalized), sentence case, and other formats instantly.",
  },
  {
    question: "Is my text stored or saved anywhere?",
    answer: "No, absolutely not. All text processing happens entirely in your browser using JavaScript. Your text is never sent to any server, making it completely private and secure.",
  },
  {
    question: "What's the difference between Title Case and Capitalized Case?",
    answer: "Title Case follows standard title capitalization rules where minor words like 'a', 'an', 'the', 'and' remain lowercase unless they're the first word. Capitalized Case simply capitalizes the first letter of every word regardless of its role.",
  },
  {
    question: "Can I use this tool for programming?",
    answer: "Yes! The slug-case converter is perfect for creating URL-friendly slugs, and you can use other conversions for constants (UPPER_CASE), variable names, and more.",
  },
  {
    question: "Does it work on mobile devices?",
    answer: "Absolutely!CaseConvert is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. The interface adapts to your screen size for the best experience.",
  },
  {
    question: "Is there a character limit?",
    answer: "There's no hard limit, but very large texts (millions of characters) may cause your browser to slow down. For typical use cases like documents, articles, or code, it works instantly.",
  },
];

export const FAQ = () => {
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
    <section id="faq" className="py-16 md:py-24 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about text case conversion
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass rounded-xl px-6 border-none shadow-card data-[state=open]:shadow-lg transition-all"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
