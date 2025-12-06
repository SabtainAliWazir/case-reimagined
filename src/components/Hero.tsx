export const Hero = () => {
  return (
    <section className="py-12 md:py-20 px-4 text-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
          Transform Your Text
          <br />
          <span className="text-gradient">Instantly</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay-1">
          Convert text between UPPERCASE, lowercase, Title Case, and more. 
          Free online tool for writers, developers, and anyone who works with text.
        </p>
      </div>
    </section>
  );
};
