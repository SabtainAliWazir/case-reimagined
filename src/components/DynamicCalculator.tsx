import { useState, useEffect } from "react";
import { CalculatorLayout } from "./CalculatorLayout";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calculator } from "lucide-react";
import { allCalculatorConfigs } from "@/lib/calculators";
import NotFound from "@/pages/NotFound";

export const DynamicCalculator = ({ id }: { id: string }) => {
  const config = allCalculatorConfigs[id];
  
  if (!config) {
    return <NotFound />;
  }

  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    config.inputs.forEach(input => {
      init[input.id] = input.defaultValue;
    });
    return init;
  });

  const [results, setResults] = useState<{label: string, value: string | number, highlight?: boolean}[]>([]);

  const handleCalculate = () => {
    try {
      const res = config.calculate(values);
      setResults(res);
    } catch (e) {
      console.error(e);
      setResults([{ label: "Error", value: "Failed to calculate. Check inputs." }]);
    }
  };

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateFaqs = () => {
    return [
      {
        question: `How do I use this ${config.title} tool?`,
        answer: `Using our free online ${config.title} is simple! Just input your numbers into the fields provided above and click 'Calculate'. The tool will automatically process the algorithm and give you instant results without needing to sign up.`
      },
      {
        question: `Is the ${config.title} free to use?`,
        answer: `Yes, absolutely! Like all of our 80+ tools on CaseConvert, this ${config.title} is completely free to use as many times as you need.`
      },
      {
        question: `Why should I use an online ${config.title}?`,
        answer: `Calculating these numbers manually can be complex and error-prone. Our ${config.title} uses precise mathematical formulas to ensure you get 100% accurate results instantly, saving you time and effort.`
      }
    ];
  };

  const faqs = generateFaqs();

  return (
    <CalculatorLayout
      title={config.title}
      description={config.description}
      icon={Calculator}
      slug={id}
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-6">
            {config.inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <Label className="text-sm font-semibold">{input.label}</Label>
                <div className="relative">
                  {input.type === 'currency' && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>}
                  <Input 
                    type="number" 
                    value={values[input.id]} 
                    onChange={(e) => setValues(prev => ({ ...prev, [input.id]: parseFloat(e.target.value) || 0 }))}
                    className={`bg-background/50 ${input.type === 'currency' ? 'pl-7' : ''} ${input.type === 'percent' ? 'pr-8' : ''}`}
                    step={input.step || "any"}
                  />
                  {input.type === 'percent' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>}
                  {input.type === 'years' && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs uppercase">Yrs</span>}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleCalculate} className="w-full rounded-xl mt-8 py-6 font-semibold text-lg hover:scale-[1.02] transition-transform">Calculate</Button>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2">
          <div className="h-full flex flex-col justify-center">
            <h3 className="text-xl font-heading font-bold mb-8 text-center text-muted-foreground uppercase tracking-widest">Results</h3>
            <div className="space-y-4">
              {results.length > 0 ? (
                results.map((res, i) => (
                  <div key={i} className={`flex justify-between items-center p-5 rounded-2xl border ${res.highlight ? 'bg-primary/10 border-primary/20' : 'bg-background/50 border-white/5'}`}>
                    <span className={`font-medium ${res.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{res.label}</span>
                    <span className={`text-2xl font-bold font-heading ${res.highlight ? 'text-primary' : 'text-foreground'}`}>{res.value}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">Press Calculate to see results.</div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};
