import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const faqs = [
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a simple mathematical formula used to estimate how many years it will take to double an invested amount of money given a fixed annual rate of interest. You simply divide 72 by the annual rate of return."
  },
  {
    question: "Is the Rule of 72 perfectly accurate?",
    answer: "No, it's an estimation. It's highly accurate for interest rates between 6% and 10%. For much higher or lower rates, it becomes slightly less precise, but remains a very useful mental math shortcut."
  }
];

const RuleOf72 = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(8);

  const yearsToDouble = useMemo(() => {
    if (!returnRate || returnRate <= 0) return 0;
    return 72 / returnRate;
  }, [returnRate]);

  const chartData = useMemo(() => {
    if (yearsToDouble <= 0) return [];
    
    const data = [];
    let currentAmount = initialAmount;
    
    // Plot the doubling points up to 5 doublings (or less if it takes too long)
    for (let i = 0; i <= 5; i++) {
      data.push({
        year: Math.round(i * yearsToDouble),
        "Investment Value": Math.round(currentAmount)
      });
      currentAmount *= 2;
    }
    
    return data;
  }, [initialAmount, yearsToDouble]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Rule of 72 Calculator"
      description="Calculate how quickly your investment will double based on the famous Rule of 72."
      icon={Calculator}
      slug="rule-of-72"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Initial Amount ($)</Label>
              <Input 
                type="number" 
                value={initialAmount} 
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Annual Return Rate (%)</Label>
              <Input 
                type="number" 
                value={returnRate} 
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="bg-background/50"
                step="0.1"
              />
            </div>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mt-6">
              <div className="text-sm text-center text-primary font-semibold mb-1">Time to Double:</div>
              <div className="text-3xl font-heading font-bold text-center text-primary">
                {yearsToDouble > 0 ? `${yearsToDouble.toFixed(1)} Years` : "N/A"}
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          <h3 className="text-xl font-heading font-bold mb-2 text-center text-foreground">Exponential Growth Curve</h3>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Showing the doubling effect over time
          </p>
          
          <div className="flex-1 min-h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Years Passed', position: 'insideBottom', offset: -10, fill: '#888888' }}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="Investment Value" 
                  stroke="#a855f7" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default RuleOf72;
