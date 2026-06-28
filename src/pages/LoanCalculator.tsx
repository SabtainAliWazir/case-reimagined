import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Calculator, DollarSign, Wallet, Landmark } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";

const faqs = [
  {
    question: "How is the monthly payment calculated?",
    answer: "The monthly payment is calculated using the standard amortization formula. It factors in your principal loan amount, the interest rate per period, and the total number of payment periods to give a fixed monthly payment."
  },
  {
    question: "What is an amortization schedule?",
    answer: "An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term."
  },
  {
    question: "Does this include taxes and insurance?",
    answer: "No, this calculator strictly calculates Principal and Interest (P&I). For a mortgage, you would also need to account for property taxes, homeowners insurance, and potentially PMI or HOA fees."
  }
];

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30); // years

  const calculateAmortization = () => {
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;
    
    // Monthly payment formula: P * (r(1+r)^n) / ((1+r)^n - 1)
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalPayments;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    let balance = loanAmount;
    let totalInterestPaid = 0;
    const data = [];

    // To prevent graph from having 360 points (which can be slow/crowded), we group by year
    for (let year = 1; year <= loanTerm; year++) {
      let principalThisYear = 0;
      let interestThisYear = 0;

      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;

        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;

        interestThisYear += interestPayment;
        principalThisYear += principalPayment;
        balance -= principalPayment;
      }

      totalInterestPaid += interestThisYear;

      data.push({
        year,
        Balance: Math.max(0, Math.round(balance)),
        "Interest Paid (Cumulative)": Math.round(totalInterestPaid),
        "Principal Paid (Cumulative)": Math.round(loanAmount - balance)
      });
    }

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterestPaid: Math.round(totalInterestPaid),
      totalPayment: Math.round(loanAmount + totalInterestPaid),
      data
    };
  };

  const { monthlyPayment, totalInterestPaid, totalPayment, data } = useMemo(() => calculateAmortization(), [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Loan & Mortgage Calculator | CaseConvert</title>
        <meta name="description" content="Calculate your monthly loan or mortgage payments, view your amortization schedule, and see exactly how much interest you'll pay." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Loan & Mortgage <span className="text-gradient">Calculator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Calculate your monthly payments and analyze the complete amortization schedule for any loan.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-delay-1 relative z-10">
              
              {/* Inputs */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Loan Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Loan Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Interest Rate</Label>
                      <span className="text-primary font-bold">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(val) => setInterestRate(val[0])}
                      max={20}
                      step={0.1}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Loan Term</Label>
                      <span className="text-primary font-bold">{loanTerm} yrs</span>
                    </div>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(val) => setLoanTerm(val[0])}
                      max={50}
                      step={1}
                      className="py-2"
                    />
                  </div>
                </div>
              </Card>

              {/* Chart & Results */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-3">
                      <Wallet className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Monthly Payment (P&I)</div>
                  </Card>
                  
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-3">
                      <DollarSign className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalInterestPaid)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Interest Paid</div>
                  </Card>

                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center mb-3">
                      <Landmark className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalPayment)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Cost of Loan</div>
                  </Card>
                </div>

                {/* Chart */}
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="year" stroke="#888888" tickFormatter={(val) => `Yr ${val}`} />
                      <YAxis 
                        stroke="#888888" 
                        tickFormatter={(val) => `$${val >= 1000 ? (val/1000) + 'k' : val}`} 
                      />
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Year ${label}`}
                        contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'var(--card)' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="Balance" stackId="1" stroke="#ef4444" fillOpacity={0.2} fill="#ef4444" />
                      <Area type="monotone" dataKey="Principal Paid (Cumulative)" stackId="2" stroke="#10b981" fillOpacity={0.3} fill="#10b981" />
                      <Area type="monotone" dataKey="Interest Paid (Cumulative)" stackId="3" stroke="#f59e0b" fillOpacity={0.3} fill="#f59e0b" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

              </div>
            </div>

            <FAQSection faqs={faqs} toolName="Loan Calculator" />
            
            <RelatedTools currentPath="/loan-calculator" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LoanCalculator;
