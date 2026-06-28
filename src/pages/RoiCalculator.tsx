import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, TrendingUp, TrendingDown, Percent } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { RelatedTools } from "@/components/RelatedTools";
import { FAQSection } from "@/components/FAQSection";

const faqs = [
  {
    question: "What is ROI?",
    answer: "ROI stands for Return on Investment. It is a performance measure used to evaluate the efficiency or profitability of an investment or compare the efficiency of a number of different investments. ROI tries to directly measure the amount of return on a particular investment, relative to the investment's cost."
  },
  {
    question: "How is ROI calculated?",
    answer: "The basic formula is: ROI = (Net Profit / Cost of Investment) * 100. Net Profit is calculated as the Return Amount minus the Initial Investment."
  },
  {
    question: "What is Annualized ROI?",
    answer: "Annualized ROI figures out what the average yearly return is, taking the effect of compounding into account over the duration of the investment. It makes it easier to compare investments held for different lengths of time."
  }
];

const RoiCalculator = () => {
  const [amountInvested, setAmountInvested] = useState<number>(10000);
  const [amountReturned, setAmountReturned] = useState<number>(12500);
  const [investmentLength, setInvestmentLength] = useState<number>(2); // years

  const calculateROI = () => {
    const netProfit = amountReturned - amountInvested;
    let roi = 0;
    if (amountInvested > 0) {
      roi = (netProfit / amountInvested) * 100;
    }

    let annualizedRoi = 0;
    if (amountInvested > 0 && investmentLength > 0) {
      // Annualized ROI = ((Ending Value / Beginning Value) ^ (1 / Years)) - 1
      annualizedRoi = (Math.pow(amountReturned / amountInvested, 1 / investmentLength) - 1) * 100;
    }

    return {
      netProfit,
      roi,
      annualizedRoi
    };
  };

  const { netProfit, roi, annualizedRoi } = useMemo(() => calculateROI(), [amountInvested, amountReturned, investmentLength]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(val);
  };

  const isProfit = netProfit >= 0;

  return (
    <>
      <Helmet>
        <title>ROI Calculator | CaseConvert</title>
        <meta name="description" content="Calculate Return on Investment (ROI) and annualized ROI to measure the profitability of your investments." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        <main className="px-4 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                ROI <span className="text-gradient">Calculator</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quickly calculate the Return on Investment (ROI) and Annualized ROI of any investment.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 animate-fade-in-delay-1 relative z-10">
              
              {/* Inputs */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl">Investment Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Amount Invested</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={amountInvested} 
                        onChange={(e) => setAmountInvested(Number(e.target.value))}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Amount Returned</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        value={amountReturned} 
                        onChange={(e) => setAmountReturned(Number(e.target.value))}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Investment Length (Years)</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={investmentLength} 
                        onChange={(e) => setInvestmentLength(Number(e.target.value))}
                        className="bg-background/50"
                        min={0.1}
                        step={0.1}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Used to calculate Annualized ROI.</p>
                  </div>
                </div>
              </Card>

              {/* Results */}
              <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl flex flex-col justify-center">
                <div className="text-center space-y-8">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Total ROI</div>
                    <div className={`text-5xl font-bold flex items-center justify-center gap-2 ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                      {isProfit ? <TrendingUp className="w-10 h-10" /> : <TrendingDown className="w-10 h-10" />}
                      {roi.toFixed(2)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-8">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Net {isProfit ? 'Profit' : 'Loss'}</div>
                      <div className={`text-2xl font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                        {formatCurrency(netProfit)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center justify-center gap-1">
                        Annualized ROI <Percent className="w-3 h-3" />
                      </div>
                      <div className={`text-2xl font-bold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                        {annualizedRoi.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <FAQSection faqs={faqs} toolName="ROI Calculator" />
            
            <RelatedTools currentPath="/roi-calculator" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RoiCalculator;
