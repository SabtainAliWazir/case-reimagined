import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "Should I take a longer loan term?",
    answer: "A longer loan term (like 72 or 84 months) will lower your monthly payment, but it drastically increases the total interest you pay. Furthermore, because cars depreciate quickly, a long loan term increases the risk of being 'underwater' (owing more than the car is worth)."
  }
];

const AutoLoan = () => {
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(2500);
  const [salesTax, setSalesTax] = useState(7);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const results = useMemo(() => {
    // Math logic
    const taxAmount = (carPrice - tradeIn) * (salesTax / 100);
    const totalLoanAmount = carPrice + taxAmount - downPayment - tradeIn;
    
    const r = interestRate / 100 / 12;
    const n = loanTerm;

    const monthlyPayment = r === 0 ? totalLoanAmount / n : (totalLoanAmount * r) / (1 - Math.pow(1 + r, -n));
    const totalInterest = (monthlyPayment * n) - totalLoanAmount;
    const totalCostOfCar = carPrice + taxAmount + totalInterest;

    // Amortization Schedule Data
    const data = [];
    let balance = totalLoanAmount;
    let cumInterest = 0;
    let cumPrincipal = 0;

    data.push({
      month: 0,
      "Principal Paid": 0,
      "Interest Paid": 0,
      Balance: Math.round(balance)
    });

    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      
      cumInterest += interestPayment;
      cumPrincipal += principalPayment;
      balance -= principalPayment;

      // Add data points every 6 months to keep chart clean
      if (i % 6 === 0 || i === n) {
        data.push({
          month: i,
          "Principal Paid": Math.round(cumPrincipal),
          "Interest Paid": Math.round(cumInterest),
          Balance: Math.max(0, Math.round(balance))
        });
      }
    }

    return {
      monthlyPayment,
      totalLoanAmount,
      totalInterest,
      totalCostOfCar,
      data
    };
  }, [carPrice, downPayment, tradeIn, salesTax, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Estimate your monthly car payments and see the true cost of the loan including taxes and interest."
      icon={Calculator}
      slug="auto-loan"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Car Price ($)</Label>
              <Input type="number" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} className="bg-background/50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Down Payment</Label>
                <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Trade-in Value</Label>
                <Input type="number" value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value))} className="bg-background/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Sales Tax Rate (%)</Label>
              <Input type="number" value={salesTax} onChange={(e) => setSalesTax(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>

            <div className="w-full h-px bg-border my-2" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Interest Rate (%)</Label>
                <Input type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Term (Months)</Label>
                <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="bg-background/50" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-xs text-primary/80 mb-1 uppercase tracking-widest font-semibold">Monthly Payment</div>
              <div className="text-3xl font-bold font-heading text-primary">{formatCurrency(results.monthlyPayment)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-background/50 border border-white/5">
              <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Total Loan Amount</div>
              <div className="text-2xl font-bold font-heading text-foreground">{formatCurrency(results.totalLoanAmount)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
              <div className="text-xs text-destructive/80 mb-1 uppercase tracking-widest font-semibold">Total Interest</div>
              <div className="text-2xl font-bold font-heading text-destructive">{formatCurrency(results.totalInterest)}</div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4 mt-2">Cumulative Payment Amortization</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Months', position: 'insideBottom', offset: -10, fill: '#888888' }}
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
                <Area type="monotone" dataKey="Principal Paid" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Interest Paid" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default AutoLoan;
