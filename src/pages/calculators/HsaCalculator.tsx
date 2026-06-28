import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const faqs = [
  {
    question: "Why use an HSA for retirement?",
    answer: "An HSA offers a unique triple-tax advantage: contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free. After age 65, you can withdraw funds for non-medical expenses without penalty (though you will pay ordinary income tax), making it function similar to a Traditional IRA."
  }
];

const HsaCalculator = () => {
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [annualContribution, setAnnualContribution] = useState(3850);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [yearsToGrow, setYearsToGrow] = useState(25);

  const chartData = useMemo(() => {
    const data = [];
    let balance = currentBalance;
    const r = expectedReturn / 100;
    
    for (let i = 0; i <= yearsToGrow; i++) {
      if (i > 0) {
        // Simplified annual compounding for HSA
        balance = (balance + annualContribution) * (1 + r);
      }
      
      data.push({
        year: i,
        "Projected Balance": Math.round(balance)
      });
    }
    
    return data;
  }, [currentBalance, annualContribution, expectedReturn, yearsToGrow]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1]["Projected Balance"] : 0;

  return (
    <CalculatorLayout
      title="HSA Savings Calculator"
      description="Project the triple-tax-advantaged growth of your Health Savings Account over time."
      icon={Calculator}
      slug="hsa-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Current Balance ($)</Label>
              <Input 
                type="number" 
                value={currentBalance} 
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Annual Contribution ($)</Label>
              <Input 
                type="number" 
                value={annualContribution} 
                onChange={(e) => setAnnualContribution(Number(e.target.value))}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground mt-1">2023 limits: $3,850 Individual / $7,750 Family</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Expected Annual Return (%)</Label>
              <Input 
                type="number" 
                value={expectedReturn} 
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="bg-background/50"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Years to Grow</Label>
              <Input 
                type="number" 
                value={yearsToGrow} 
                onChange={(e) => setYearsToGrow(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          <h3 className="text-xl font-heading font-bold mb-2 text-center text-foreground">Future HSA Balance</h3>
          <p className="text-center text-muted-foreground text-sm mb-8">
            In {yearsToGrow} years: <span className="text-primary font-bold">{formatCurrency(finalBalance)}</span>
          </p>
          
          <div className="flex-1 min-h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Years', position: 'insideBottom', offset: -10, fill: '#888888' }}
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
                <Area type="monotone" dataKey="Projected Balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default HsaCalculator;
