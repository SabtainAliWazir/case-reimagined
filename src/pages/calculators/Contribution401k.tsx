import { useState, useMemo } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const faqs = [
  {
    question: "What is an employer match?",
    answer: "Many employers will match your 401(k) contributions up to a certain percentage of your salary. This is essentially free money and you should always try to contribute at least enough to get the full match."
  },
  {
    question: "How does my 401k grow?",
    answer: "Your 401k grows through your contributions, your employer's matching contributions, and the compounding returns on the investments within the account over time."
  }
];

const Contribution401k = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [salary, setSalary] = useState(75000);
  const [contributionPct, setContributionPct] = useState(6);
  const [employerMatchPct, setEmployerMatchPct] = useState(3);
  const [annualReturn, setAnnualReturn] = useState(7);

  const chartData = useMemo(() => {
    const data = [];
    let balance = currentBalance;
    let totalYourContributions = 0;
    let totalEmployerContributions = 0;
    let totalInterest = 0;
    
    const years = retirementAge - currentAge;
    
    // We will plot every 5 years or so if it's a long time, but let's just plot every year
    for (let i = 1; i <= years; i++) {
      const age = currentAge + i;
      const annualYourContrib = salary * (contributionPct / 100);
      const annualEmployerContrib = salary * (employerMatchPct / 100);
      
      const startBalance = balance;
      balance = (balance + annualYourContrib + annualEmployerContrib) * (1 + annualReturn / 100);
      
      const interestEarned = balance - startBalance - annualYourContrib - annualEmployerContrib;
      
      totalYourContributions += annualYourContrib;
      totalEmployerContributions += annualEmployerContrib;
      totalInterest += interestEarned;
      
      // Plot data points every 5 years and the final year
      if (i % 5 === 0 || i === years) {
        data.push({
          age: age.toString(),
          "Your Contributions": Math.round(currentBalance + totalYourContributions),
          "Employer Match": Math.round(totalEmployerContributions),
          "Interest Earned": Math.round(totalInterest),
          total: Math.round(balance)
        });
      }
    }
    return data;
  }, [currentAge, retirementAge, currentBalance, salary, contributionPct, employerMatchPct, annualReturn]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout
      title="401(k) Contribution Calculator"
      description="Estimate your 401(k) balance at retirement by projecting your contributions, employer match, and compounding interest."
      icon={Calculator}
      slug="401k-contribution"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1 h-fit">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Current Age</Label>
                <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Retire Age</Label>
                <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="bg-background/50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Current 401(k) Balance ($)</Label>
              <Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value))} className="bg-background/50" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Annual Salary ($)</Label>
              <Input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="bg-background/50" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Your Contribution (%)</Label>
              <Input type="number" value={contributionPct} onChange={(e) => setContributionPct(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Employer Match (%)</Label>
              <Input type="number" value={employerMatchPct} onChange={(e) => setEmployerMatchPct(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Annual Return (%)</Label>
              <Input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="bg-background/50" step="0.1" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2">
          <h3 className="text-xl font-heading font-bold mb-2 text-center text-foreground">Projected 401(k) Balance</h3>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Total at age {retirementAge}: <span className="text-primary font-bold">{chartData.length > 0 ? formatCurrency(chartData[chartData.length - 1].total) : "$0"}</span>
          </p>
          
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="age" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'Age', position: 'insideBottom', offset: -10, fill: '#888888' }}
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
                  labelFormatter={(label) => `Age: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Your Contributions" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Employer Match" stackId="a" fill="#fbbf24" />
                <Bar dataKey="Interest Earned" stackId="a" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default Contribution401k;
