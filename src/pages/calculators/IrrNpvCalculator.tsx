import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Cell } from "recharts";

const faqs = [
  {
    question: "What is NPV?",
    answer: "Net Present Value (NPV) is the difference between the present value of cash inflows and the present value of cash outflows over a period of time. A positive NPV indicates a profitable investment."
  },
  {
    question: "What is IRR?",
    answer: "Internal Rate of Return (IRR) is the discount rate that makes the net present value (NPV) of all cash flows equal to zero. It's essentially the expected compound annual rate of return."
  }
];

const IrrNpvCalculator = () => {
  const [discountRate, setDiscountRate] = useState<string>("10");
  const [cashFlows, setCashFlows] = useState<number[]>([-10000, 2000, 3000, 4000, 5000]);

  const handleCfChange = (index: number, value: string) => {
    const newFlows = [...cashFlows];
    newFlows[index] = Number(value);
    setCashFlows(newFlows);
  };

  const addCashFlow = () => {
    setCashFlows([...cashFlows, 0]);
  };

  const removeCashFlow = (index: number) => {
    if (cashFlows.length <= 1) return;
    const newFlows = cashFlows.filter((_, i) => i !== index);
    setCashFlows(newFlows);
  };

  const npv = useMemo(() => {
    const r = Number(discountRate) / 100;
    let total = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      total += cashFlows[i] / Math.pow(1 + r, i);
    }
    return total;
  }, [cashFlows, discountRate]);

  // Very basic IRR approximation using Newton-Raphson
  const irr = useMemo(() => {
    let rate = 0.1; // initial guess
    const maxIter = 1000;
    const precision = 0.00001;
    
    for (let iter = 0; iter < maxIter; iter++) {
      let npvCalc = 0;
      let derivative = 0;
      
      for (let i = 0; i < cashFlows.length; i++) {
        npvCalc += cashFlows[i] / Math.pow(1 + rate, i);
        if (i > 0) {
          derivative -= (i * cashFlows[i]) / Math.pow(1 + rate, i + 1);
        }
      }
      
      if (Math.abs(npvCalc) < precision) return rate * 100;
      if (derivative === 0) break;
      
      rate = rate - (npvCalc / derivative);
    }
    
    return isNaN(rate) ? null : rate * 100;
  }, [cashFlows]);

  const chartData = useMemo(() => {
    return cashFlows.map((cf, i) => ({
      period: `CF${i}`,
      flow: cf
    }));
  }, [cashFlows]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="IRR & NPV Calculator"
      description="Analyze capital investments by calculating Net Present Value and Internal Rate of Return based on a series of cash flows."
      icon={Calculator}
      slug="irr-npv-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2 mb-6">
              <Label className="text-sm font-semibold">Discount Rate (%)</Label>
              <Input 
                type="number" 
                value={discountRate} 
                onChange={(e) => setDiscountRate(e.target.value)}
                className="bg-background/50"
                step="0.1"
              />
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <Label className="text-sm font-semibold">Cash Flows</Label>
              {cashFlows.map((cf, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-medium text-muted-foreground">CF{index}</span>
                  <Input 
                    type="number" 
                    value={cf} 
                    onChange={(e) => handleCfChange(index, e.target.value)}
                    className="bg-background/50 flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeCashFlow(index)} disabled={index === 0} className="text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={addCashFlow}>
              <Plus className="w-4 h-4 mr-2" /> Add Cash Flow
            </Button>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className={`p-6 rounded-2xl border ${npv >= 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
              <div className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Net Present Value (NPV)</div>
              <div className={`text-4xl font-bold font-heading ${npv >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{formatCurrency(npv)}</div>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Internal Rate of Return (IRR)</div>
              <div className="text-4xl font-bold font-heading text-primary">
                {irr !== null ? `${irr.toFixed(2)}%` : 'No IRR'}
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <ReferenceLine y={0} stroke="#888" />
                <XAxis 
                  dataKey="period" 
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
                <Bar dataKey="flow" radius={[4, 4, 4, 4]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.flow >= 0 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default IrrNpvCalculator;
