import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";

const faqs = [
  {
    question: "What is Yield to Maturity (YTM)?",
    answer: "Yield to maturity is the estimated annual rate of return you will earn if you buy a bond at the current price and hold it until it matures, assuming all coupon payments are made as scheduled."
  },
  {
    question: "Why does bond price converge to face value?",
    answer: "As a bond approaches its maturity date, its market price will naturally move towards its face (par) value, because at maturity the issuer must pay exactly the face value back to the bondholder."
  }
];

const BondCalculator = () => {
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(5);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);
  const [currentPrice, setCurrentPrice] = useState(900);

  const currentYield = useMemo(() => {
    if (!currentPrice || currentPrice <= 0) return 0;
    const annualCoupon = faceValue * (couponRate / 100);
    return (annualCoupon / currentPrice) * 100;
  }, [faceValue, couponRate, currentPrice]);

  const ytm = useMemo(() => {
    // Approximation formula for YTM
    const annualCoupon = faceValue * (couponRate / 100);
    const n = yearsToMaturity;
    if (n <= 0 || !currentPrice || currentPrice <= 0) return 0;
    
    const approxYtm = (annualCoupon + ((faceValue - currentPrice) / n)) / ((faceValue + currentPrice) / 2);
    return approxYtm * 100;
  }, [faceValue, couponRate, yearsToMaturity, currentPrice]);

  const chartData = useMemo(() => {
    const data = [];
    if (yearsToMaturity <= 0) return [];
    
    // Simple straight-line convergence for visualization purposes
    const priceDiff = faceValue - currentPrice;
    const annualChange = priceDiff / yearsToMaturity;

    for (let i = 0; i <= yearsToMaturity; i++) {
      data.push({
        year: i,
        "Bond Price": Math.round(currentPrice + (annualChange * i))
      });
    }
    
    return data;
  }, [faceValue, currentPrice, yearsToMaturity]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="Bond Calculator"
      description="Calculate Current Yield and Yield to Maturity (YTM) for fixed-rate bonds."
      icon={Calculator}
      slug="bond-calculator"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Face Value (Par) ($)</Label>
              <Input 
                type="number" 
                value={faceValue} 
                onChange={(e) => setFaceValue(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Annual Coupon Rate (%)</Label>
              <Input 
                type="number" 
                value={couponRate} 
                onChange={(e) => setCouponRate(Number(e.target.value))}
                className="bg-background/50"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Years to Maturity</Label>
              <Input 
                type="number" 
                value={yearsToMaturity} 
                onChange={(e) => setYearsToMaturity(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Current Market Price ($)</Label>
              <Input 
                type="number" 
                value={currentPrice} 
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="bg-background/50"
              />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex flex-col">
          
          <div className="grid grid-cols-2 gap-4 mb-8 text-center">
            <div className="p-6 rounded-2xl bg-background/50 border border-white/5">
              <div className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Current Yield</div>
              <div className="text-4xl font-bold font-heading text-foreground">{currentYield.toFixed(2)}%</div>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-sm text-primary/80 mb-1 uppercase tracking-widest font-semibold">Yield to Maturity (YTM)</div>
              <div className="text-4xl font-bold font-heading text-primary">
                {ytm.toFixed(2)}%
              </div>
            </div>
          </div>
          
          <h4 className="text-center font-semibold text-muted-foreground mb-4">Price Convergence to Par</h4>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <ReferenceLine y={faceValue} stroke="#a855f7" strokeDasharray="3 3" label={{ position: 'top', value: 'Face Value (Par)', fill: '#a855f7', fontSize: 12 }} />
                <XAxis 
                  dataKey="year" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Years Passed', position: 'insideBottom', offset: -10, fill: '#888888' }}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="Bond Price" 
                  stroke="#2dd4bf" 
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

export default BondCalculator;
