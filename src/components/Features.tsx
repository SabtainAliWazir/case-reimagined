import { 
  Zap, 
  Shield, 
  Smartphone, 
  Clock,
  Globe,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant conversion as you type with real-time preview",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "All processing happens in your browser. Your text never leaves your device",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Fully responsive design that works on desktop, tablet, and mobile",
  },
  {
    icon: Clock,
    title: "No Sign-up",
    description: "Start converting immediately without creating an account",
  },
  {
    icon: Globe,
    title: "Unicode Support",
    description: "Works with international characters, emojis, and special symbols",
  },
  {
    icon: Sparkles,
    title: "Multiple Formats",
    description: "9+ conversion types including slug-case for URLs",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Why Choose ConvertCase?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The fastest, most private way to transform your text online
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
