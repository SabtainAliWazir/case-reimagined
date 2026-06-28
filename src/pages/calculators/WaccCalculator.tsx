import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const faqs = [
  {
    question: "What is WACC?",
    answer: "Weighted Average Cost of Capital (WACC) is the average rate that a business pays to finance its assets. It is calculated by multiplying the cost of each capital component (equity and debt) by its proportional weight and then summing the results."
  },
  {
    question: "Why is WACC important?",
    answer: "WACC is commonly used as a discount rate for corporate finance decisions. If a company's return on invested capital is greater than its WACC, it is creating value for its investors."
  }
];

const COLORS = ['#8b5cf6', '#3b82f6']; // Purple for Equity, Blue for Debt

const WaccCalculator = () => {
  // Equity
  const [marketValueOfEquity, setMarketValueOfEquity] = useState(500000);
  const [costOfEquity, setCostOfEquity] = useState(8);

  // Debt
  const [marketValueOfDebt, setMarketValueOfDebt] = useState(250000);
  const [costOfDebt, setCostOfDebt] = useState(5);
  const [corporateTaxRate, setCorporateTaxRate] = useState(21);

  const results = useMemo(() => {
    const totalValue = marketValueOfEquity + marketValueOfDebt;
    if (totalValue <= 0) return { wacc: 0, weightE: 0, weightD: 0, afterTaxCostOfDebt: 0 };

    const weightE = marketValueOfEquity / totalValue;
    const weightD = marketValueOfDebt / totalValue;

    const afterTaxCostOfDebt = costOfDebt * (1 - corporateTaxRate / 100);

    const wacc = (weightE * costOfEquity) + (weightD * afterTaxCostOfDebt);

    return {
      wacc,
      weightE: weightE * 100,
      weightD: weightD * 100,
      afterTaxCostOfDebt
    };
  }, [marketValueOfEquity, costOfEquity, marketValueOfDebt, costOfDebt, corporateTaxRate]);

  const chartData = useMemo(() => {
    return [
      { name: "Equity Weight", value: results.weightE },
      { name: "Debt Weight", value: results.weightD }
    ];
  }, [results.weightE, results.weightD]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="WACC Calculator"
      description="Calculate the Weighted Average Cost of Capital (WACC) to determine a firm's overall cost of financing."
      icon={Calculator}
      slug="wacc-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            
            <div>
              <h4 className="font-semibold text-[#8b5cf6] mb-4 border-b border-white/10 pb-2">Cost of Equity</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Market Value of Equity ($)</Label>
                  <Input type="number" value={marketValueOfEquity} onChange={(e) => setMarketValueOfEquity(Number(e.target.value))} className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Cost of Equity (%)</Label>
                  <Input type="number" value={costOfEquity} onChange={(e) => setCostOfEquity(Number(e.target.value))} className="bg-background/50" step="0.1" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#3b82f6] mb-4 border-b border-white/10 pb-2 mt-8">Cost of Debt</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Market Value of Debt ($)</Label>
                  <Input type="number" value={marketValueOfDebt} onChange={(e) => setMarketValueOfDebt(Number(e.target.value))} className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Cost of Debt (%)</Label>
                    <Input type="number" value={costOfDebt} onChange={(e) => setCostOfDebt(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Corp. Tax Rate (%)</Label>
                    <Input type="number" value={corporateTaxRate} onChange={(e) => setCorporateTaxRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="p-4 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
              <div className="text-xs text-[#8b5cf6]/80 mb-1 uppercase tracking-widest font-semibold">Equity Weight</div>
              <div className="text-2xl font-bold font-heading text-[#8b5cf6]">{results.weightE.toFixed(1)}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#3b82f6]/10 border border-[#3b82f6]/20">
              <div className="text-xs text-[#3b82f6]/80 mb-1 uppercase tracking-widest font-semibold">Debt Weight</div>
              <div className="text-2xl font-bold font-heading text-[#3b82f6]">{results.weightD.toFixed(1)}%</div>
            </div>
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <div className="text-xs text-primary mb-1 uppercase tracking-widest font-semibold">WACC</div>
              <div className="text-3xl font-bold font-heading text-primary">
                {results.wacc.toFixed(2)}%
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-muted-foreground border-b border-white/10 pb-2">Calculation Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Firm Value:</span>
                  <span className="font-semibold">{formatCurrency(marketValueOfEquity + marketValueOfDebt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8b5cf6]">Weighted Cost of Equity:</span>
                  <span className="font-semibold">{((results.weightE / 100) * costOfEquity).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">After-Tax Cost of Debt:</span>
                  <span className="font-semibold">{results.afterTaxCostOfDebt.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3b82f6]">Weighted Cost of Debt:</span>
                  <span className="font-semibold">{((results.weightD / 100) * results.afterTaxCostOfDebt).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-primary font-bold">
                  <span>WACC:</span>
                  <span>{results.wacc.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>

        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default WaccCalculator;
