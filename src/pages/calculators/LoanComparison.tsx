import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "Why compare loans side-by-side?",
    answer: "A seemingly small difference in interest rate or loan term can result in thousands of dollars of difference in total interest paid over the life of the loan. Comparing them directly reveals the true cost."
  }
];

const LoanComparison = () => {
  // Loan A
  const [amountA, setAmountA] = useState(300000);
  const [rateA, setRateA] = useState(6.5);
  const [yearsA, setYearsA] = useState(30);

  // Loan B
  const [amountB, setAmountB] = useState(300000);
  const [rateB, setRateB] = useState(5.5);
  const [yearsB, setYearsB] = useState(15);

  const calculateLoan = (amount: number, ratePct: number, years: number) => {
    const r = ratePct / 100 / 12;
    const n = years * 12;
    if (r === 0) {
      const pmt = amount / n;
      return { pmt, totalInterest: 0, totalPaid: amount };
    }
    const pmt = (amount * r) / (1 - Math.pow(1 + r, -n));
    const totalPaid = pmt * n;
    const totalInterest = totalPaid - amount;
    return { pmt, totalInterest, totalPaid };
  };

  const resultsA = useMemo(() => calculateLoan(amountA, rateA, yearsA), [amountA, rateA, yearsA]);
  const resultsB = useMemo(() => calculateLoan(amountB, rateB, yearsB), [amountB, rateB, yearsB]);

  const chartData = useMemo(() => {
    return [
      {
        name: "Principal Amount",
        "Loan A": amountA,
        "Loan B": amountB
      },
      {
        name: "Total Interest Paid",
        "Loan A": Math.round(resultsA.totalInterest),
        "Loan B": Math.round(resultsB.totalInterest)
      }
    ];
  }, [amountA, amountB, resultsA.totalInterest, resultsB.totalInterest]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Loan Comparison Calculator"
      description="Compare two different loan scenarios side-by-side to see the true cost difference."
      icon={Calculator}
      slug="loan-comparison"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            
            <div>
              <h4 className="font-semibold text-primary mb-4 border-b border-white/10 pb-2">Loan Option A</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Loan Amount ($)</Label>
                  <Input type="number" value={amountA} onChange={(e) => setAmountA(Number(e.target.value))} className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Rate (%)</Label>
                    <Input type="number" value={rateA} onChange={(e) => setRateA(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Years</Label>
                    <Input type="number" value={yearsA} onChange={(e) => setYearsA(Number(e.target.value))} className="bg-background/50" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-500 mb-4 border-b border-white/10 pb-2 mt-8">Loan Option B</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Loan Amount ($)</Label>
                  <Input type="number" value={amountB} onChange={(e) => setAmountB(Number(e.target.value))} className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Rate (%)</Label>
                    <Input type="number" value={rateB} onChange={(e) => setRateB(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Years</Label>
                    <Input type="number" value={yearsB} onChange={(e) => setYearsB(Number(e.target.value))} className="bg-background/50" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-primary/80 mb-2 uppercase tracking-widest font-semibold">Option A Monthly</div>
              <div className="text-4xl font-bold font-heading text-primary">{formatCurrency(resultsA.pmt)}</div>
              <div className="text-xs text-muted-foreground mt-2">Total Int: {formatCurrency(resultsA.totalInterest)}</div>
            </div>
            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <div className="text-sm text-blue-500/80 mb-2 uppercase tracking-widest font-semibold">Option B Monthly</div>
              <div className="text-4xl font-bold font-heading text-blue-500">{formatCurrency(resultsB.pmt)}</div>
              <div className="text-xs text-muted-foreground mt-2">Total Int: {formatCurrency(resultsB.totalInterest)}</div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4">Cost Comparison Breakdown</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="name" 
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
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Loan A" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Loan B" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default LoanComparison;
