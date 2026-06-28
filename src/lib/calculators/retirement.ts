import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const retirementCalculators: Record<string, CalculatorConfig> = {
  "retirement-planner": {
    title: "Retirement Planner",
    description: "Plan your savings to meet your retirement goals.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "number", defaultValue: 30 },
      { id: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65 },
      { id: "currentSavings", label: "Current Savings", type: "currency", defaultValue: 50000 },
      { id: "monthlyContribution", label: "Monthly Contribution", type: "currency", defaultValue: 500 },
      { id: "rate", label: "Expected Annual Return (%)", type: "percent", defaultValue: 7 },
    ],
    calculate: (v) => {
      const years = v.retirementAge - v.currentAge;
      if (years <= 0) return [{ label: "Error", value: "Retirement age must be greater than current age." }];
      const r = v.rate / 100 / 12;
      const n = years * 12;
      const fv = v.currentSavings * Math.pow(1 + r, n) + v.monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
      return [
        { label: "Estimated Retirement Balance", value: formatCurrency(fv), highlight: true }
      ];
    }
  },
  "contribution401k": {
    title: "401k Contribution Calculator",
    description: "Calculate 401k growth and employer match.",
    inputs: [
      { id: "salary", label: "Annual Salary", type: "currency", defaultValue: 80000 },
      { id: "contributionPct", label: "Your Contribution (%)", type: "percent", defaultValue: 5 },
      { id: "matchPct", label: "Employer Match (%)", type: "percent", defaultValue: 3 },
    ],
    calculate: (v) => {
      const yours = v.salary * (v.contributionPct / 100);
      const employer = v.salary * (v.matchPct / 100);
      return [
        { label: "Your Annual Contribution", value: formatCurrency(yours) },
        { label: "Employer Annual Match", value: formatCurrency(employer) },
        { label: "Total Annual Added", value: formatCurrency(yours + employer), highlight: true }
      ];
    }
  },
  "retirement-savings-analysis": {
    title: "Retirement Savings Analysis",
    description: "Analyze if your savings are on track.",
    inputs: [
      { id: "goal", label: "Retirement Goal Amount", type: "currency", defaultValue: 1000000 },
      { id: "current", label: "Current Savings", type: "currency", defaultValue: 250000 },
    ],
    calculate: (v) => {
      const needed = v.goal - v.current;
      const pct = (v.current / v.goal) * 100;
      return [
        { label: "Amount Still Needed", value: formatCurrency(needed > 0 ? needed : 0) },
        { label: "Progress to Goal", value: formatPercent(pct), highlight: true }
      ];
    }
  },
  "ira-vs-roth": {
    title: "Traditional IRA vs Roth IRA",
    description: "Compare post-tax outcomes of Traditional vs Roth.",
    inputs: [
      { id: "contribution", label: "Annual Contribution", type: "currency", defaultValue: 6000 },
      { id: "currentTax", label: "Current Tax Rate (%)", type: "percent", defaultValue: 24 },
      { id: "futureTax", label: "Retirement Tax Rate (%)", type: "percent", defaultValue: 22 },
      { id: "years", label: "Years to Grow", type: "years", defaultValue: 20 },
      { id: "rate", label: "Growth Rate (%)", type: "percent", defaultValue: 7 },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      // Traditional: deduct now, pay tax later
      const tradGrowth = v.contribution * ((Math.pow(1 + r, v.years) - 1) / r);
      const tradNet = tradGrowth * (1 - (v.futureTax / 100));
      // Roth: pay tax now, no tax later
      const rothContribution = v.contribution * (1 - (v.currentTax / 100));
      const rothNet = rothContribution * ((Math.pow(1 + r, v.years) - 1) / r);
      
      return [
        { label: "Traditional IRA (After Future Tax)", value: formatCurrency(tradNet) },
        { label: "Roth IRA (Tax Free)", value: formatCurrency(rothNet) },
        { label: "Difference", value: formatCurrency(Math.abs(tradNet - rothNet)), highlight: true }
      ];
    }
  },
  "rmd-calculator": {
    title: "Required Minimum Distribution (RMD)",
    description: "Calculate your mandatory IRA withdrawal.",
    inputs: [
      { id: "balance", label: "Account Balance (Dec 31 prior year)", type: "currency", defaultValue: 500000 },
      { id: "age", label: "Age", type: "number", defaultValue: 73 },
    ],
    calculate: (v) => {
      // Very simplified life expectancy factor table
      let factor = 27.4;
      if (v.age >= 75) factor = 24.6;
      if (v.age >= 80) factor = 20.2;
      if (v.age >= 85) factor = 16.0;
      if (v.age >= 90) factor = 12.2;
      
      const rmd = v.balance / factor;
      return [
        { label: "Estimated RMD", value: formatCurrency(rmd), highlight: true }
      ];
    }
  },
  "social-security-estimator": {
    title: "Social Security Estimator",
    description: "Estimate your monthly benefits.",
    inputs: [
      { id: "fraBenefit", label: "Benefit at Full Retirement Age", type: "currency", defaultValue: 2000 },
      { id: "claimAge", label: "Age You Plan to Claim", type: "number", defaultValue: 62 },
    ],
    calculate: (v) => {
      let mult = 1;
      if (v.claimAge === 62) mult = 0.7;
      if (v.claimAge === 70) mult = 1.24;
      return [
        { label: "Estimated Monthly Benefit", value: formatCurrency(v.fraBenefit * mult), highlight: true }
      ];
    }
  },
  "annuity-calculator": {
    title: "Annuity Calculator",
    description: "Calculate payout from an annuity.",
    inputs: [
      { id: "principal", label: "Principal Amount", type: "currency", defaultValue: 200000 },
      { id: "rate", label: "Annual Rate (%)", type: "percent", defaultValue: 5 },
      { id: "years", label: "Payout Years", type: "years", defaultValue: 20 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const pmt = (v.principal * r) / (1 - Math.pow(1 + r, -n));
      return [
        { label: "Monthly Payout", value: formatCurrency(pmt), highlight: true },
        { label: "Total Lifetime Payout", value: formatCurrency(pmt * n) }
      ];
    }
  }
};
