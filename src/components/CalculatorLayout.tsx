import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";
import { LucideIcon } from "lucide-react";

export interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  faqs: { question: string; answer: string }[];
  children: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  icon: Icon,
  slug,
  faqs,
  children,
}) => {
  const url = `https://caseconvert.online/calculators/${slug}`;

  const seoTitle = `Free Online ${title} Tool - No Sign Up (2026)`;
  const seoDesc = `${description} Our free online ${title} gives you instant, accurate results without needing to sign up. Calculate instantly!`;

  const faqSchema = faqs && faqs.length > 0 ? {
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
  } : null;

  const breadcrumbSchema = {
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
        "name": "Calculators",
        "item": "https://caseconvert.online/calculators"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": url
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": title,
            "description": seoDesc,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        
        <main className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading tracking-tight">
                {title.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? <span key={i} className="text-gradient">{word}</span> : <span key={i}>{word} </span>
                )}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Calculator Content */}
            <div className="animate-fade-in-delay-1 relative z-10 mb-16">
              {children}
            </div>

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <div className="animate-fade-in-delay-2">
                <FAQSection faqs={faqs} toolName={title} />
              </div>
            )}
            
            {/* Related Tools */}
            <div className="animate-fade-in-delay-3 mt-16">
              <RelatedTools currentPath={`/calculators/${slug}`} />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};
