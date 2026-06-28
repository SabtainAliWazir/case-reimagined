import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine } from "recharts";

const faqs = [
  {
    question: "What is the Black-Scholes model?",
    answer: "The Black-Scholes model is a mathematical equation used to estimate the theoretical value of European-style options. It considers current stock price, strike price, time to expiration, risk-free interest rate, and volatility."
  }
];

// Helper for standard normal cumulative distribution function
const normalCDF = (x: number) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - prob : prob;
};

const BlackScholes = () => {
  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [timeToExpiry, setTimeToExpiry] = useState(1); // in years
  const [riskFreeRate, setRiskFreeRate] = useState(5); // %
  const [volatility, setVolatility] = useState(20); // %

  const calculatePrices = (s: number, k: number, t: number, r: number, v: number) => {
    if (t <= 0 || v <= 0) return { call: Math.max(0, s - k), put: Math.max(0, k - s) };
    
    const d1 = (Math.log(s / k) + (r + (v * v) / 2) * t) / (v * Math.sqrt(t));
    const d2 = d1 - v * Math.sqrt(t);
    
    const call = s * normalCDF(d1) - k * Math.exp(-r * t) * normalCDF(d2);
    const put = k * Math.exp(-r * t) * normalCDF(-d2) - s * normalCDF(-d1);
    
    return { call, put };
  };

  const results = useMemo(() => {
    const r = riskFreeRate / 100;
    const v = volatility / 100;
    return calculatePrices(stockPrice, strikePrice, timeToExpiry, r, v);
  }, [stockPrice, strikePrice, timeToExpiry, riskFreeRate, volatility]);

  const chartData = useMemo(() => {
    const data = [];
    const r = riskFreeRate / 100;
    const v = volatility / 100;
    
    // Plot prices based on underlying stock moving from -30% to +30%
    const minPrice = stockPrice * 0.7;
    const maxPrice = stockPrice * 1.3;
    const step = (maxPrice - minPrice) / 20;

    for (let s = minPrice; s <= maxPrice; s += step) {
      const prices = calculatePrices(s, strikePrice, timeToExpiry, r, v);
      data.push({
        stockPrice: Math.round(s),
        "Call Value": Number(prices.call.toFixed(2)),
        "Put Value": Number(prices.put.toFixed(2))
      });
    }

    return data;
  }, [stockPrice, strikePrice, timeToExpiry, riskFreeRate, volatility]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Black-Scholes Option Pricing"
      description="Estimate the fair theoretical value of European call and put options."
      icon={Calculator}
      slug="black-scholes"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Stock Price (S)</Label>
                <Input type="number" value={stockPrice} onChange={(e) => setStockPrice(Number(e.target.value))} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Strike Price (K)</Label>
                <Input type="number" value={strikePrice} onChange={(e) => setStrikePrice(Number(e.target.value))} className="bg-background/50" />
              </div>
            </div>

            <div className="space-y-2 border-l-4 border-primary pl-4 pt-2">
              <Label className="text-sm font-semibold text-primary">Time to Expiry (Years)</Label>
              <Input type="number" value={timeToExpiry} onChange={(e) => setTimeToExpiry(Number(e.target.value))} className="bg-primary/10 border-primary/20 focus-visible:ring-primary" step="0.1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Volatility (%)</Label>
                <Input type="number" value={volatility} onChange={(e) => setVolatility(Number(e.target.value))} className="bg-background/50" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Risk-Free Rate (%)</Label>
                <Input type="number" value={riskFreeRate} onChange={(e) => setRiskFreeRate(Number(e.target.value))} className="bg-background/50" step="0.1" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-sm text-emerald-500/80 mb-1 uppercase tracking-widest font-semibold">Call Option Value</div>
              <div className="text-4xl font-bold font-heading text-emerald-500">{formatCurrency(results.call)}</div>
            </div>
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div className="text-sm text-rose-500/80 mb-1 uppercase tracking-widest font-semibold">Put Option Value</div>
              <div className="text-4xl font-bold font-heading text-rose-500">{formatCurrency(results.put)}</div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4 mt-2">Option Value vs Underlying Price</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <ReferenceLine x={stockPrice} stroke="#888" strokeDasharray="3 3" label={{ position: 'top', value: 'Current Price', fill: '#888', fontSize: 12 }} />
                <ReferenceLine x={strikePrice} stroke="#a855f7" strokeDasharray="3 3" label={{ position: 'insideBottomRight', value: 'Strike', fill: '#a855f7', fontSize: 12 }} />
                <XAxis 
                  dataKey="stockPrice" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Underlying Stock Price ($)', position: 'insideBottom', offset: -10, fill: '#888888' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Stock Price: $${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Call Value" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Put Value" 
                  stroke="#f43f5e" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default BlackScholes;
