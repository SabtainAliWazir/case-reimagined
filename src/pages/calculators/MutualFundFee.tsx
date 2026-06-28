import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "Why do mutual fund fees matter?",
    answer: "Even a seemingly small fee (like 1% or 2%) can drastically reduce your final portfolio value over decades due to the loss of compounding interest on the money paid to fees."
  },
  {
    question: "What is an Expense Ratio?",
    answer: "The expense ratio is the annual fee that all funds or ETFs charge their shareholders. It pays for the fund manager's active management or index tracking."
  }
];

const MutualFundFee = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [expenseRatio, setExpenseRatio] = useState(1.5);
  const [years, setYears] = useState(30);

  const chartData = useMemo(() => {
    const data = [];
    let balanceNoFees = initialInvestment;
    let balanceWithFees = initialInvestment;
    let totalFeesPaid = 0;

    const rNoFee = annualReturn / 100 / 12;
    const rWithFee = (annualReturn - expenseRatio) / 100 / 12;

    for (let i = 0; i <= years; i++) {
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          balanceNoFees = (balanceNoFees + monthlyContribution) * (1 + rNoFee);
          balanceWithFees = (balanceWithFees + monthlyContribution) * (1 + rWithFee);
        }
      }
      
      data.push({
        year: i,
        "Balance (No Fees)": Math.round(balanceNoFees),
        "Balance (With Fees)": Math.round(balanceWithFees)
      });
    }

    return {
      data,
      finalNoFees: balanceNoFees,
      finalWithFees: balanceWithFees,
      lostToFees: balanceNoFees - balanceWithFees
    };
  }, [initialInvestment, monthlyContribution, annualReturn, expenseRatio, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Mutual Fund Fee Calculator"
      description="Visualize how much mutual fund expense ratios and hidden fees eat into your compounding returns over time."
      icon={Calculator}
      slug="mutual-fund-fee"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Initial Investment ($)</Label>
              <Input 
                type="number" 
                value={initialInvestment} 
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Monthly Contribution ($)</Label>
              <Input 
                type="number" 
                value={monthlyContribution} 
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Expected Return (%)</Label>
              <Input 
                type="number" 
                value={annualReturn} 
                onChange={(e) => setAnnualReturn(Number(e.target.value))}
                className="bg-background/50"
                step="0.1"
              />
            </div>

            <div className="space-y-2 border-l-4 border-destructive pl-4 mt-8">
              <Label className="text-sm font-semibold text-destructive">Expense Ratio / Fees (%)</Label>
              <Input 
                type="number" 
                value={expenseRatio} 
                onChange={(e) => setExpenseRatio(Number(e.target.value))}
                className="bg-destructive/10 border-destructive/20 focus-visible:ring-destructive"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Average actively managed fund: 0.5% - 1.5%</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Years to Invest</Label>
              <Input 
                type="number" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-primary/80 mb-1 uppercase tracking-widest font-semibold">Final Balance (With Fees)</div>
              <div className="text-4xl font-bold font-heading text-primary">
                {formatCurrency(chartData.finalWithFees)}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20">
              <div className="text-sm text-destructive/80 mb-1 uppercase tracking-widest font-semibold">Lost to Fees</div>
              <div className="text-4xl font-bold font-heading text-destructive">
                {formatCurrency(chartData.lostToFees)}
              </div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4">Portfolio Growth: With vs Without Fees</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Balance (No Fees)" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="Balance (With Fees)" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default MutualFundFee;
