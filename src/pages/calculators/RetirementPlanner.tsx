import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const faqs = [
  {
    question: "Why is starting early so important?",
    answer: "Starting early takes advantage of compound interest. Even small monthly contributions can grow exponentially over decades, as you can see in the chart where a 25-year-old starting age yields significantly more than a 35-year-old starting age."
  },
  {
    question: "What is a realistic annual return rate?",
    answer: "Historically, the stock market has returned around 7-10% annually before inflation. A conservative estimate for a diversified portfolio might be 6-8%."
  }
];

// Recharts colors
const COLORS = ['#2dd4bf', '#fbbf24', '#9ca3af', '#f87171', '#0ea5e9', '#b91c1c', '#15803d'];

const RetirementPlanner = () => {
  const [monthlySaving, setMonthlySaving] = useState(1000);
  const [returnRate, setReturnRate] = useState(7);
  const [retirementAge, setRetirementAge] = useState(65);

  const chartData = useMemo(() => {
    const startingAges = [25, 30, 35, 40, 45, 50, 55];
    const data = [];
    
    for (const age of startingAges) {
      const years = retirementAge - age;
      if (years > 0) {
        const r = returnRate / 100 / 12;
        const n = years * 12;
        // Future Value of an ordinary annuity
        const fv = r === 0 ? monthlySaving * n : monthlySaving * ((Math.pow(1 + r, n) - 1) / r);
        data.push({
          name: age.toString(),
          savings: Math.round(fv)
        });
      } else {
        data.push({
          name: age.toString(),
          savings: 0
        });
      }
    }
    return data;
  }, [monthlySaving, returnRate, retirementAge]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Retirement Planner"
      description="See how starting early impacts your total retirement savings using the power of compound interest."
      icon={Calculator}
      slug="retirement-planner"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Monthly Saving ($)</Label>
              <Input 
                type="number" 
                value={monthlySaving} 
                onChange={(e) => setMonthlySaving(Number(e.target.value))}
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
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Retirement Age</Label>
              <Input 
                type="number" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2">
          <h3 className="text-xl font-heading font-bold mb-2 text-center text-foreground">Total Savings at Age {retirementAge}</h3>
          <p className="text-center text-muted-foreground text-sm mb-8">Based on different starting ages</p>
          
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Starting Age', position: 'insideBottom', offset: -10, fill: '#888888' }}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => [formatCurrency(value), "Total Savings"]}
                  labelFormatter={(label) => `Starting Age: ${label}`}
                />
                <Bar dataKey="savings" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default RetirementPlanner;
