import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TextConverter } from "@/components/TextConverter";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <section id="converter" className="px-4 pb-16">
          <TextConverter />
        </section>
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
