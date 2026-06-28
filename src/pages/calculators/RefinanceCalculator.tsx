import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceDot } from "recharts";

const faqs = [
  {
    question: "What is the break-even point?",
    answer: "When you refinance, you typically pay closing costs. The break-even point is how many months it takes for your monthly savings from the new lower rate to completely cover those closing costs. If you plan to move before this point, refinancing is usually a bad idea."
  }
];

const RefinanceCalculator = () => {
  // Current Loan
  const [currentBalance, setCurrentBalance] = useState(250000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentYearsLeft, setCurrentYearsLeft] = useState(25);

  // New Loan
  const [newRate, setNewRate] = useState(5.0);
  const [newYears, setNewYears] = useState(25);
  const [closingCosts, setClosingCosts] = useState(4000);

  const results = useMemo(() => {
    // Current Loan PMT
    const rCurrent = currentRate / 100 / 12;
    const nCurrent = currentYearsLeft * 12;
    const currentPmt = rCurrent === 0 ? currentBalance / nCurrent : (currentBalance * rCurrent) / (1 - Math.pow(1 + rCurrent, -nCurrent));

    // New Loan PMT
    const rNew = newRate / 100 / 12;
    const nNew = newYears * 12;
    const newPmt = rNew === 0 ? currentBalance / nNew : (currentBalance * rNew) / (1 - Math.pow(1 + rNew, -nNew));

    const monthlySavings = currentPmt - newPmt;
    const breakEvenMonths = monthlySavings > 0 ? closingCosts / monthlySavings : -1;

    // Chart Data (cumulative costs over time to show break-even)
    const data = [];
    const monthsToChart = Math.min(Math.max(breakEvenMonths * 2, 60), nCurrent); // Chart enough to see intersection
    
    let currentCumulativeCost = 0;
    let newCumulativeCost = closingCosts; // Start in the hole by closing costs

    for (let m = 0; m <= monthsToChart; m += 6) {
      data.push({
        month: m,
        "Current Loan Cost": Math.round(currentCumulativeCost),
        "New Loan Cost": Math.round(newCumulativeCost)
      });
      currentCumulativeCost += currentPmt * 6;
      newCumulativeCost += newPmt * 6;
    }

    return {
      currentPmt,
      newPmt,
      monthlySavings,
      breakEvenMonths,
      data
    };
  }, [currentBalance, currentRate, currentYearsLeft, newRate, newYears, closingCosts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Refinance Calculator"
      description="Calculate if it makes financial sense to refinance your mortgage by finding the break-even point."
      icon={Calculator}
      slug="refinance-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            
            <div>
              <h4 className="font-semibold text-muted-foreground mb-4 border-b border-white/10 pb-2">Current Loan</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Remaining Balance ($)</Label>
                  <Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value))} className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Rate (%)</Label>
                    <Input type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Years Left</Label>
                    <Input type="number" value={currentYearsLeft} onChange={(e) => setCurrentYearsLeft(Number(e.target.value))} className="bg-background/50" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-4 border-b border-white/10 pb-2 mt-8">New Refinance Loan</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">New Rate (%)</Label>
                    <Input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Term (Years)</Label>
                    <Input type="number" value={newYears} onChange={(e) => setNewYears(Number(e.target.value))} className="bg-background/50" />
                  </div>
                </div>
                <div className="space-y-2 border-l-4 border-destructive pl-4 pt-2">
                  <Label className="text-sm font-semibold text-destructive">Closing Costs ($)</Label>
                  <Input type="number" value={closingCosts} onChange={(e) => setClosingCosts(Number(e.target.value))} className="bg-destructive/10 border-destructive/20 focus-visible:ring-destructive" />
                </div>
              </div>
            </div>

          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Current Payment</div>
              <div className="text-2xl font-bold font-heading text-foreground">{formatCurrency(results.currentPmt)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-semibold">New Payment</div>
              <div className="text-2xl font-bold font-heading text-foreground">{formatCurrency(results.newPmt)}</div>
            </div>
            <div className={`p-4 rounded-2xl border ${results.monthlySavings > 0 ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'}`}>
              <div className="text-xs text-primary/80 mb-1 uppercase tracking-widest font-semibold">Monthly Savings</div>
              <div className="text-2xl font-bold font-heading text-primary">
                {results.monthlySavings > 0 ? formatCurrency(results.monthlySavings) : "No Savings"}
              </div>
            </div>
          </div>

          {results.breakEvenMonths > 0 ? (
            <div className="text-center mb-6">
              <p className="text-lg">Break-Even Point: <span className="font-bold text-primary">{Math.ceil(results.breakEvenMonths)} months</span> ({ (results.breakEvenMonths / 12).toFixed(1) } years)</p>
              <p className="text-sm text-muted-foreground mt-1">If you sell the house before this point, refinancing will cost you money.</p>
            </div>
          ) : (
            <div className="text-center mb-6 text-destructive font-semibold">
              Refinancing increases your monthly payment.
            </div>
          )}
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4 mt-4">Cumulative Cost Comparison</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Months Passed', position: 'insideBottom', offset: -10, fill: '#888888' }}
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
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Current Loan Cost" 
                  stroke="#f43f5e" 
                  strokeWidth={3} 
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="New Loan Cost" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false}
                />
                {results.breakEvenMonths > 0 && results.data.length > 0 && (
                  <ReferenceDot 
                    x={Math.round(results.breakEvenMonths / 6) * 6} 
                    y={results.data[Math.min(Math.round(results.breakEvenMonths / 6), results.data.length - 1)]["Current Loan Cost"]} 
                    r={6} 
                    fill="#a855f7" 
                    stroke="white" 
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default RefinanceCalculator;
