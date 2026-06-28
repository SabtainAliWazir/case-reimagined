import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "Why does college inflation matter?",
    answer: "College tuition historically increases at a faster rate than general inflation (often 4-6% per year). Factoring this in is critical so you don't underestimate the future cost of education."
  },
  {
    question: "What if my savings fall short?",
    answer: "Any shortfall can typically be covered by financial aid, scholarships, grants, or student loans. Saving as much as you can reduces the reliance on debt."
  }
];

const CollegeSavings = () => {
  const [currentCost, setCurrentCost] = useState(25000);
  const [collegeInflation, setCollegeInflation] = useState(5);
  const [yearsUntil, setYearsUntil] = useState(10);
  const [yearsInCollege, setYearsInCollege] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [savingsReturn, setSavingsReturn] = useState(6);

  const chartData = useMemo(() => {
    const data = [];
    let savingsBalance = currentSavings;
    const monthlyReturn = savingsReturn / 100 / 12;
    const yearlyCollegeInflation = collegeInflation / 100;
    
    // Calculate the total cost at the start of college
    let futureAnnualCost = currentCost * Math.pow(1 + yearlyCollegeInflation, yearsUntil);

    for (let i = 0; i <= yearsUntil; i++) {
      if (i > 0) {
        // Add 1 year of savings
        for (let m = 0; m < 12; m++) {
          savingsBalance = (savingsBalance + monthlyContribution) * (1 + monthlyReturn);
        }
      }
      
      const currentYearCostEstimate = currentCost * Math.pow(1 + yearlyCollegeInflation, i);
      
      data.push({
        year: `Year ${i}`,
        "Projected Savings": Math.round(savingsBalance),
        "Annual Tuition Cost": Math.round(currentYearCostEstimate)
      });
    }
    
    return {
      data,
      finalSavings: savingsBalance,
      estimatedTotalCost: futureAnnualCost * yearsInCollege // simplified estimate
    };
  }, [currentCost, collegeInflation, yearsUntil, yearsInCollege, currentSavings, monthlyContribution, savingsReturn]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="College Savings Calculator"
      description="Project the future cost of college and see if your savings plan will cover it."
      icon={Calculator}
      slug="college-savings"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-5">
            <h4 className="font-semibold text-primary mb-2">College Details</h4>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Current Annual Cost ($)</Label>
              <Input type="number" value={currentCost} onChange={(e) => setCurrentCost(Number(e.target.value))} className="bg-background/50" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Years Until</Label>
                <Input type="number" value={yearsUntil} onChange={(e) => setYearsUntil(Number(e.target.value))} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Years In</Label>
                <Input type="number" value={yearsInCollege} onChange={(e) => setYearsInCollege(Number(e.target.value))} className="bg-background/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">College Inflation Rate (%)</Label>
              <Input type="number" value={collegeInflation} onChange={(e) => setCollegeInflation(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>

            <div className="w-full h-px bg-border my-4" />
            <h4 className="font-semibold text-primary mb-2">Savings Plan</h4>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Current Savings ($)</Label>
              <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Monthly Contribution ($)</Label>
              <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Expected Return (%)</Label>
              <Input type="number" value={savingsReturn} onChange={(e) => setSavingsReturn(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          <h3 className="text-xl font-heading font-bold mb-2 text-center text-foreground">Projected Cost vs Savings</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8 mt-4 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-muted-foreground mb-1">Total Savings at Start</div>
              <div className="text-2xl font-bold text-primary">{formatCurrency(chartData.finalSavings)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
              <div className="text-sm text-muted-foreground mb-1">Est. Total Cost ({yearsInCollege} yrs)</div>
              <div className="text-2xl font-bold text-destructive">{formatCurrency(chartData.estimatedTotalCost)}</div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
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
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="Projected Savings" stroke="#2dd4bf" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Annual Tuition Cost" stroke="#f87171" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CollegeSavings;
