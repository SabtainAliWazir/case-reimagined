const fs = require('fs');
const path = require('path');

const categories = [
  {
    name: "Finance & Investment",
    calculators: [
      { id: "tvm-calculator", title: "TVM Calculator", icon: "Calculator" },
      { id: "irr-npv-calculator", title: "IRR NPV Calculator", icon: "LineChart" },
      { id: "bond-calculator", title: "Bond Calculator", icon: "FileText" },
      { id: "tax-equivalent-yield", title: "Tax Equivalent Yield", icon: "Percent" },
      { id: "rule-of-72", title: "Rule of 72 Calculator", icon: "Timer" },
      { id: "college-savings", title: "College Savings Calculator", icon: "GraduationCap" },
      { id: "mutual-fund-fee", title: "Mutual Fund Fee Calculator", icon: "Briefcase" },
      { id: "hsa-calculator", title: "HSA Calculator", icon: "HeartPulse" },
      { id: "cd-calculator", title: "CD Calculator", icon: "Landmark" },
    ]
  },
  {
    name: "Loan & Mortgage",
    calculators: [
      { id: "loan-comparison", title: "Loan Comparison Calculator", icon: "Scale" },
      { id: "refinance-calculator", title: "Refinance Calculator", icon: "RefreshCw" },
      { id: "apr-calculator", title: "APR Calculator", icon: "Percent" },
      { id: "commercial-loan", title: "Commercial Loan Calculator", icon: "Building" },
      { id: "home-affordability", title: "Home Affordability Calculator", icon: "Home" },
      { id: "rent-vs-buy", title: "Rent vs Buy Calculator", icon: "Home" },
      { id: "discount-points", title: "Discount Points Calculator", icon: "Tag" },
      { id: "adjustable-rate", title: "Adjustable Rate Calculator", icon: "TrendingUp" },
      { id: "bi-weekly-payment", title: "Bi-weekly Payment Calculator", icon: "Calendar" },
      { id: "interest-only", title: "Interest Only Calculator", icon: "CircleDollarSign" },
      { id: "rental-property", title: "Rental Property Calculator", icon: "Building2" },
    ]
  },
  {
    name: "Retirement",
    calculators: [
      { id: "retirement-planner", title: "Retirement Planner", icon: "Palmtree" },
      { id: "401k-contribution", title: "401k Contribution", icon: "PiggyBank" },
      { id: "retirement-savings-analysis", title: "Retirement Savings Analysis", icon: "PieChart" },
      { id: "ira-vs-roth", title: "Traditional IRA vs Roth IRA", icon: "Scale" },
      { id: "rmd-calculator", title: "Required Minimum Distribution", icon: "CalendarClock" },
      { id: "social-security-estimator", title: "Social Security Estimator", icon: "Landmark" },
      { id: "annuity-calculator", title: "Annuity Calculator", icon: "Banknote" },
    ]
  },
  {
    name: "Stock Calculators",
    calculators: [
      { id: "stock-return", title: "Stock Return Calculator", icon: "TrendingUp" },
      { id: "constant-growth", title: "Constant Growth Calculator", icon: "LineChart" },
      { id: "capm-calculator", title: "CAPM Calculator", icon: "Activity" },
      { id: "expected-return", title: "Expected Return Calculator", icon: "Target" },
      { id: "wacc-calculator", title: "WACC Calculator", icon: "Layers" },
      { id: "black-scholes", title: "Black-Scholes Option", icon: "GitMerge" },
      { id: "pivot-point", title: "Pivot Point Calculator", icon: "Crosshair" },
      { id: "fibonacci", title: "Fibonacci Calculator", icon: "Waves" },
      { id: "dividend-tax", title: "Dividend Tax Calculator", icon: "Receipt" },
    ]
  },
  {
    name: "Credit Card & Auto",
    calculators: [
      { id: "credit-card-payoff", title: "Credit Card Payoff", icon: "CreditCard" },
      { id: "credit-card-minimum", title: "Credit Card Minimum", icon: "CreditCard" },
      { id: "auto-loan", title: "Auto Loan Calculator", icon: "Car" },
      { id: "auto-lease", title: "Auto Lease Calculator", icon: "CarFront" },
    ]
  },
  {
    name: "Miscellaneous",
    calculators: [
      { id: "tip-calculator", title: "Tip Calculator", icon: "Coins" },
      { id: "discount-tax", title: "Discount and Tax", icon: "Tag" },
      { id: "percentage", title: "Percentage Calculator", icon: "Percent" },
      { id: "date-calculator", title: "Date Calculator", icon: "CalendarDays" },
      { id: "us-inflation", title: "US Inflation Calculator", icon: "TrendingDown" },
      { id: "margin-markup", title: "Margin and Markup", icon: "ArrowUpRight" },
      { id: "salary-increase", title: "Salary Increase", icon: "ArrowUp" },
      { id: "paycheck-tax", title: "Paycheck Tax Calculator", icon: "ReceiptText" },
    ]
  }
];

const generateTSX = (calc) => {
  const componentName = calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  return `import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ${calc.icon} } from "lucide-react";

const faqs = [
  {
    question: "How does the ${calc.title} work?",
    answer: "This calculator is currently being updated with the latest formulas. Check back soon for the full functionality!"
  }
];

const ${componentName} = () => {
  return (
    <CalculatorLayout
      title="${calc.title}"
      description="Use our free ${calc.title.toLowerCase()} to quickly estimate your results online."
      icon={${calc.icon}}
      slug="${calc.id}"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Example Input</Label>
              <Input type="number" placeholder="0.00" className="bg-background/50" />
            </div>
            <Button className="w-full rounded-xl">Calculate</Button>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex items-center justify-center min-h-[300px]">
          <div className="text-center text-muted-foreground">
            <${calc.icon} className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Calculator logic is being implemented.</p>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ${componentName};
`;
};

const outputDir = path.join(__dirname, 'src', 'pages', 'calculators');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let appRoutes = [];
let allImports = [];
let indexTools = [];

categories.forEach(cat => {
  cat.calculators.forEach(calc => {
    const componentName = calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const filePath = path.join(outputDir, `${componentName}.tsx`);
    fs.writeFileSync(filePath, generateTSX(calc));
    
    appRoutes.push(`<Route path="/calculators/${calc.id}" element={<${componentName} />} />`);
    allImports.push(`import ${componentName} from "./pages/calculators/${componentName}";`);
    indexTools.push(`{ category: "${cat.name}", href: "/calculators/${calc.id}", title: "${calc.title}", icon: ${calc.icon}, description: "Free online ${calc.title.toLowerCase()} tool." }`);
  });
});

console.log("== IMPORTS FOR APP.TSX ==");
console.log(allImports.join('\n'));

console.log("\n== ROUTES FOR APP.TSX ==");
console.log(appRoutes.join('\n'));

console.log("\n== TOOLS FOR CalculatorsIndex.tsx ==");
console.log(`export const allCalculators = [\n  ${indexTools.join(',\n  ')}\n];`);

console.log("\nDone generating 40+ calculators!");
