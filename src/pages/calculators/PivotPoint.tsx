import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";

const faqs = [
  {
    question: "What are Pivot Points?",
    answer: "Pivot points are significant price levels calculated from the previous trading period's high, low, and close prices. Day traders use them to predict potential support and resistance levels in the current session."
  }
];

const PivotPoint = () => {
  const [high, setHigh] = useState(155.50);
  const [low, setLow] = useState(150.00);
  const [close, setClose] = useState(153.25);

  const results = useMemo(() => {
    const p = (high + low + close) / 3;
    
    // Standard Pivot Points
    const r1 = (p * 2) - low;
    const s1 = (p * 2) - high;
    const r2 = p + (high - low);
    const s2 = p - (high - low);
    const r3 = high + 2 * (p - low);
    const s3 = low - 2 * (high - p);

    return { p, r1, r2, r3, s1, s2, s3 };
  }, [high, low, close]);

  const chartData = useMemo(() => {
    // We just need a dummy data point to render the ReferenceLines across the chart
    return [
      { name: "Support/Resistance Spread", empty: 0 }
    ];
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Pivot Point Calculator"
      description="Calculate standard support and resistance levels for day trading based on previous price action."
      icon={Calculator}
      slug="pivot-point"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Previous High</Label>
              <Input type="number" value={high} onChange={(e) => setHigh(Number(e.target.value))} className="bg-background/50" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Previous Low</Label>
              <Input type="number" value={low} onChange={(e) => setLow(Number(e.target.value))} className="bg-background/50" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Previous Close</Label>
              <Input type="number" value={close} onChange={(e) => setClose(Number(e.target.value))} className="bg-background/50" step="0.01" />
            </div>
            
            <div className="w-full h-px bg-border my-6" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between text-rose-400"><span>R3</span> <span className="font-bold">{formatCurrency(results.r3)}</span></div>
                <div className="flex justify-between text-rose-400"><span>R2</span> <span className="font-bold">{formatCurrency(results.r2)}</span></div>
                <div className="flex justify-between text-rose-400"><span>R1</span> <span className="font-bold">{formatCurrency(results.r1)}</span></div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-emerald-400"><span>S1</span> <span className="font-bold">{formatCurrency(results.s1)}</span></div>
                <div className="flex justify-between text-emerald-400"><span>S2</span> <span className="font-bold">{formatCurrency(results.s2)}</span></div>
                <div className="flex justify-between text-emerald-400"><span>S3</span> <span className="font-bold">{formatCurrency(results.s3)}</span></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="flex justify-center mb-6">
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center min-w-[200px]">
              <div className="text-sm text-primary/80 mb-1 uppercase tracking-widest font-semibold">Pivot Point (P)</div>
              <div className="text-4xl font-bold font-heading text-primary">{formatCurrency(results.p)}</div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4">Price Levels Visualization</h4>
          <div className="flex-1 min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 80, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis 
                  domain={['dataMin - 5', 'dataMax + 5']} 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                
                <ReferenceLine y={results.r3} stroke="#f43f5e" strokeOpacity={0.4} label={{ position: 'right', value: `R3: ${results.r3.toFixed(2)}`, fill: '#f43f5e', fontSize: 12 }} />
                <ReferenceLine y={results.r2} stroke="#f43f5e" strokeOpacity={0.7} label={{ position: 'right', value: `R2: ${results.r2.toFixed(2)}`, fill: '#f43f5e', fontSize: 12 }} />
                <ReferenceLine y={results.r1} stroke="#f43f5e" strokeOpacity={1} label={{ position: 'right', value: `R1: ${results.r1.toFixed(2)}`, fill: '#f43f5e', fontSize: 12, fontWeight: 'bold' }} />
                
                <ReferenceLine y={results.p} stroke="#a855f7" strokeWidth={2} label={{ position: 'right', value: `P: ${results.p.toFixed(2)}`, fill: '#a855f7', fontSize: 14, fontWeight: 'bold' }} />
                
                <ReferenceLine y={results.s1} stroke="#10b981" strokeOpacity={1} label={{ position: 'right', value: `S1: ${results.s1.toFixed(2)}`, fill: '#10b981', fontSize: 12, fontWeight: 'bold' }} />
                <ReferenceLine y={results.s2} stroke="#10b981" strokeOpacity={0.7} label={{ position: 'right', value: `S2: ${results.s2.toFixed(2)}`, fill: '#10b981', fontSize: 12 }} />
                <ReferenceLine y={results.s3} stroke="#10b981" strokeOpacity={0.4} label={{ position: 'right', value: `S3: ${results.s3.toFixed(2)}`, fill: '#10b981', fontSize: 12 }} />
                
                <Bar dataKey="empty" fill="transparent" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default PivotPoint;
