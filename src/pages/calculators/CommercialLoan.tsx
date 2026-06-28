import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "What is a balloon payment?",
    answer: "Commercial loans often have a payment schedule based on a long period (e.g., 20 years) but require the remaining balance to be paid in full at an earlier date (e.g., 5 years). This final, large payment is the balloon payment."
  },
  {
    question: "Why use this structure?",
    answer: "It keeps monthly payments lower by amortizing over a long period, while allowing the lender to reassess the risk and interest rates at the balloon date (usually 3, 5, or 10 years)."
  }
];

const CommercialLoan = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [amortizationYears, setAmortizationYears] = useState(20);
  const [termYears, setTermYears] = useState(5);

  const results = useMemo(() => {
    const r = interestRate / 100 / 12;
    const nAmort = amortizationYears * 12;
    const nTerm = termYears * 12;

    if (r === 0 || nAmort === 0) return { pmt: 0, balloon: 0, totalInterest: 0, data: [] };

    // Monthly payment based on full amortization schedule
    const pmt = (loanAmount * r) / (1 - Math.pow(1 + r, -nAmort));

    // Balance remaining at the end of the term (Balloon)
    let balance = loanAmount;
    let totalInterest = 0;
    
    const data = [];

    for (let i = 1; i <= nTerm; i++) {
      const interestPayment = balance * r;
      const principalPayment = pmt - interestPayment;
      
      balance -= principalPayment;
      totalInterest += interestPayment;

      // Add yearly data points
      if (i % 12 === 0) {
        data.push({
          year: `Year ${i / 12}`,
          "End of Year Balance": Math.max(0, Math.round(balance)),
          "Principal Paid that Year": Math.round(principalPayment * 12)
        });
      }
    }

    return {
      pmt,
      balloon: Math.max(0, balance),
      totalInterest,
      data
    };
  }, [loanAmount, interestRate, amortizationYears, termYears]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Commercial Loan Calculator"
      description="Calculate monthly payments and the final balloon payment for commercial real estate loans."
      icon={Calculator}
      slug="commercial-loan"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Loan Amount ($)</Label>
              <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Interest Rate (%)</Label>
              <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>

            <div className="space-y-2 border-l-4 border-primary pl-4 pt-2">
              <Label className="text-sm font-semibold text-primary">Amortization Period (Years)</Label>
              <Input type="number" value={amortizationYears} onChange={(e) => setAmortizationYears(Number(e.target.value))} className="bg-primary/10 border-primary/20 focus-visible:ring-primary" />
              <p className="text-xs text-muted-foreground mt-1">Used to calculate monthly payment size.</p>
            </div>

            <div className="space-y-2 border-l-4 border-destructive pl-4 pt-2">
              <Label className="text-sm font-semibold text-destructive">Loan Term / Balloon (Years)</Label>
              <Input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} className="bg-destructive/10 border-destructive/20 focus-visible:ring-destructive" />
              <p className="text-xs text-muted-foreground mt-1">When the remaining balance is due.</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-primary/80 mb-1 uppercase tracking-widest font-semibold">Monthly Payment</div>
              <div className="text-4xl font-bold font-heading text-primary">{formatCurrency(results.pmt)}</div>
            </div>
            <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-sm text-destructive/80 mb-1 uppercase tracking-widest font-semibold">Final Balloon Payment</div>
                <div className="text-4xl font-bold font-heading text-destructive">{formatCurrency(results.balloon)}</div>
                <div className="text-xs text-muted-foreground mt-2">Due at year {termYears}</div>
              </div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4 mt-2">Loan Balance Over Term</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="End of Year Balance" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CommercialLoan;
