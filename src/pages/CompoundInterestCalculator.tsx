import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from "recharts";
import { Calculator, DollarSign, TrendingUp, PiggyBank } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";

const faqs = [
  {
    question: "What is compound interest?",
    answer: "Compound interest is the interest on a deposit or loan, calculated based on both the initial principal and the accumulated interest from previous periods. In simple terms, it's 'interest on interest'."
  },
  {
    question: "How does the compounding frequency affect my returns?",
    answer: "The more frequently interest is compounded (e.g., monthly vs. annually), the higher your returns will be, because the interest is added to your balance sooner, allowing it to start earning its own interest."
  },
  {
    question: "Is this calculator accurate for real-world investments?",
    answer: "This calculator provides a mathematical projection assuming a constant rate of return. Real-world investments (like stocks) fluctuate. However, it's an excellent tool for long-term planning and estimating potential growth."
  }
];

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(7);

  const calculateData = () => {
    let currentPrincipal = principal;
    let currentContributions = 0;
    const data = [];
    const monthlyRate = interestRate / 100 / 12;

    for (let i = 0; i <= years; i++) {
      if (i === 0) {
        data.push({
          year: 0,
          Principal: principal,
          Contributions: 0,
          Interest: 0,
          Total: principal,
        });
        continue;
      }

      for (let m = 0; m < 12; m++) {
        const interestForMonth = (currentPrincipal + currentContributions) * monthlyRate;
        currentPrincipal += interestForMonth;
        currentContributions += monthlyContribution;
      }

      data.push({
        year: i,
        Principal: principal,
        Contributions: currentContributions,
        Interest: Math.round(currentPrincipal - principal),
        Total: Math.round(currentPrincipal + currentContributions),
      });
    }

    return data;
  };

  const data = useMemo(() => calculateData(), [principal, monthlyContribution, years, interestRate]);

  const finalYear = data[data.length - 1];
  const totalAmount = finalYear.Total;
  const totalInterest = finalYear.Interest;
  const totalInvested = finalYear.Principal + finalYear.Contributions;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Compound Interest Calculator | CaseConvert</title>
        <meta name="description" content="Free online compound interest calculator. Calculate future value of investments, savings, and retirement goals with visual charts." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Compound Interest <span className="text-gradient">Calculator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how your money can grow over time with the power of compound interest. 
                Visualize your investments and plan for your future.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-delay-1 relative z-10">
              
              {/* Inputs */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Parameters</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Initial Investment</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={principal} 
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Monthly Contribution</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={monthlyContribution} 
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Years to Grow</Label>
                      <span className="text-primary font-bold">{years} yrs</span>
                    </div>
                    <Slider
                      value={[years]}
                      onValueChange={(val) => setYears(val[0])}
                      max={50}
                      step={1}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Estimated Interest Rate</Label>
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
                </div>
              </Card>

              {/* Chart & Results */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center mb-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Future Value</div>
                  </Card>
                  
                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalInterest)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Interest Earned</div>
                  </Card>

                  <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-4 rounded-3xl flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-3">
                      <PiggyBank className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Invested</div>
                  </Card>
                </div>

                {/* Chart */}
                <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#888888" tickFormatter={(val) => `Year ${val}`} />
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
                      <Area type="monotone" dataKey="Total" stroke="#10b981" fillOpacity={1} fill="url(#colorTotal)" />
                      <Area type="monotone" dataKey="Contributions" stroke="#3b82f6" fillOpacity={0.1} fill="#3b82f6" />
                      <Area type="monotone" dataKey="Principal" stroke="#8b5cf6" fillOpacity={0.1} fill="#8b5cf6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

              </div>
            </div>

            <FAQSection faqs={faqs} toolName="Compound Interest Calculator" />
            
            <RelatedTools currentPath="/compound-interest" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CompoundInterestCalculator;
