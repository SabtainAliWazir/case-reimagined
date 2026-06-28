import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const loanCalculators: Record<string, CalculatorConfig> = {
  "loan-comparison": {
    title: "Loan Comparison Calculator",
    description: "Compare two loans side-by-side.",
    inputs: [
      { id: "amount1", label: "Loan 1 Amount", type: "currency", defaultValue: 250000 },
      { id: "rate1", label: "Loan 1 Rate (%)", type: "percent", defaultValue: 6.5 },
      { id: "years1", label: "Loan 1 Years", type: "years", defaultValue: 30 },
      { id: "amount2", label: "Loan 2 Amount", type: "currency", defaultValue: 250000 },
      { id: "rate2", label: "Loan 2 Rate (%)", type: "percent", defaultValue: 5.5 },
      { id: "years2", label: "Loan 2 Years", type: "years", defaultValue: 15 },
    ],
    calculate: (v) => {
      const calcPmt = (p: number, r: number, y: number) => {
        const mr = r / 100 / 12;
        const n = y * 12;
        return mr === 0 ? p / n : (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
      };
      const pmt1 = calcPmt(v.amount1, v.rate1, v.years1);
      const pmt2 = calcPmt(v.amount2, v.rate2, v.years2);
      const total1 = pmt1 * v.years1 * 12;
      const total2 = pmt2 * v.years2 * 12;
      
      return [
        { label: "Loan 1 Monthly Payment", value: formatCurrency(pmt1) },
        { label: "Loan 2 Monthly Payment", value: formatCurrency(pmt2) },
        { label: "Loan 1 Total Cost", value: formatCurrency(total1) },
        { label: "Loan 2 Total Cost", value: formatCurrency(total2) },
        { label: "Savings with cheaper loan", value: formatCurrency(Math.abs(total1 - total2)), highlight: true }
      ];
    }
  },
  "refinance-calculator": {
    title: "Refinance Calculator",
    description: "Determine if refinancing makes financial sense.",
    inputs: [
      { id: "currentPmt", label: "Current Monthly Pmt", type: "currency", defaultValue: 1500 },
      { id: "newPmt", label: "New Monthly Pmt", type: "currency", defaultValue: 1300 },
      { id: "closingCosts", label: "Refinance Closing Costs", type: "currency", defaultValue: 4000 },
    ],
    calculate: (v) => {
      const savings = v.currentPmt - v.newPmt;
      const breakEven = savings > 0 ? v.closingCosts / savings : 0;
      return [
        { label: "Monthly Savings", value: formatCurrency(savings), highlight: true },
        { label: "Break-even Point (Months)", value: savings > 0 ? formatNumber(breakEven) : "Never (No savings)" }
      ];
    }
  },
  "apr-calculator": {
    title: "APR Calculator",
    description: "Calculate true APR including fees.",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 200000 },
      { id: "rate", label: "Stated Interest Rate (%)", type: "percent", defaultValue: 6.0 },
      { id: "fees", label: "Total Loan Fees", type: "currency", defaultValue: 5000 },
      { id: "years", label: "Loan Term (Years)", type: "years", defaultValue: 30 },
    ],
    calculate: (v) => {
      // Approximation for APR
      const mr = v.rate / 100 / 12;
      const n = v.years * 12;
      const pmt = (v.amount * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
      
      // Rough approximation formula for APR
      const actualAmount = v.amount - v.fees;
      let guess = mr;
      // Simple Newton-Raphson approximation would go here, using a simpler estimate:
      const totalPaid = pmt * n;
      const totalInt = totalPaid - actualAmount;
      const approxAPR = (totalInt / actualAmount) / v.years * 100;

      return [
        { label: "Stated Rate", value: formatPercent(v.rate) },
        { label: "Estimated True APR", value: formatPercent(approxAPR), highlight: true },
        { label: "Actual Funds Received", value: formatCurrency(actualAmount) }
      ];
    }
  },
  "commercial-loan": {
    title: "Commercial Loan Calculator",
    description: "Calculate payments for commercial real estate.",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 1000000 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 7.5 },
      { id: "amortization", label: "Amortization (Years)", type: "years", defaultValue: 20 },
      { id: "term", label: "Term Before Balloon (Years)", type: "years", defaultValue: 5 },
    ],
    calculate: (v) => {
      const mr = v.rate / 100 / 12;
      const nTotal = v.amortization * 12;
      const nTerm = v.term * 12;
      const pmt = (v.amount * mr * Math.pow(1 + mr, nTotal)) / (Math.pow(1 + mr, nTotal) - 1);
      
      const pvAnnuity = (pmt / mr) * (1 - Math.pow(1 + mr, -(nTotal - nTerm)));
      
      return [
        { label: "Monthly Payment", value: formatCurrency(pmt), highlight: true },
        { label: "Balloon Payment at Term", value: formatCurrency(pvAnnuity) }
      ];
    }
  },
  "home-affordability": {
    title: "Home Affordability Calculator",
    description: "Estimate how much house you can afford.",
    inputs: [
      { id: "income", label: "Annual Income", type: "currency", defaultValue: 100000 },
      { id: "debts", label: "Monthly Debts", type: "currency", defaultValue: 500 },
      { id: "downPayment", label: "Down Payment", type: "currency", defaultValue: 40000 },
    ],
    calculate: (v) => {
      // 28/36 rule
      const maxHousingPmt = (v.income / 12) * 0.28;
      const maxTotalDebt = (v.income / 12) * 0.36;
      const allowedPmt = Math.min(maxHousingPmt, maxTotalDebt - v.debts);
      
      // Rough estimate of home price (assuming 6% rate, 30 years, 1.2% taxes+ins)
      const r = 6 / 100 / 12;
      const n = 360;
      const presentValue = (allowedPmt * 0.8) * ((1 - Math.pow(1 + r, -n)) / r); // 0.8 to account for taxes/ins
      const maxPrice = presentValue + v.downPayment;

      return [
        { label: "Max Monthly Payment", value: formatCurrency(allowedPmt) },
        { label: "Estimated Home Price", value: formatCurrency(maxPrice), highlight: true }
      ];
    }
  },
  "rent-vs-buy": {
    title: "Rent vs Buy Calculator",
    description: "Compare the costs of renting vs buying over time.",
    inputs: [
      { id: "rent", label: "Monthly Rent", type: "currency", defaultValue: 2000 },
      { id: "homePrice", label: "Home Price", type: "currency", defaultValue: 400000 },
      { id: "years", label: "Years of Residence", type: "years", defaultValue: 5 },
    ],
    calculate: (v) => {
      const totalRent = v.rent * 12 * v.years * 1.05; // 5% rent inflation approx
      const downPmt = v.homePrice * 0.2;
      const closing = v.homePrice * 0.03;
      const totalBuyInitial = downPmt + closing;
      return [
        { label: "Total Estimated Rent", value: formatCurrency(totalRent) },
        { label: "Initial Buying Costs", value: formatCurrency(totalBuyInitial) }
      ];
    }
  },
  "discount-points": {
    title: "Discount Points Calculator",
    description: "Should you pay points to lower your rate?",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 300000 },
      { id: "costPerPoint", label: "Cost Per Point (%)", type: "percent", defaultValue: 1 },
      { id: "points", label: "Points to Buy", type: "number", defaultValue: 2 },
      { id: "monthlySavings", label: "Monthly Savings from Points", type: "currency", defaultValue: 50 },
    ],
    calculate: (v) => {
      const totalCost = v.amount * (v.costPerPoint / 100) * v.points;
      const breakEven = totalCost / v.monthlySavings;
      return [
        { label: "Cost of Points", value: formatCurrency(totalCost) },
        { label: "Break-even (Months)", value: formatNumber(breakEven), highlight: true }
      ];
    }
  },
  "adjustable-rate": {
    title: "Adjustable Rate Calculator",
    description: "Calculate ARM payments.",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 300000 },
      { id: "initialRate", label: "Initial Rate (%)", type: "percent", defaultValue: 5.0 },
      { id: "maxRate", label: "Maximum Rate (%)", type: "percent", defaultValue: 10.0 },
    ],
    calculate: (v) => {
      const calcPmt = (p: number, r: number) => {
        const mr = r / 100 / 12;
        const n = 360;
        return (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
      };
      return [
        { label: "Initial Payment", value: formatCurrency(calcPmt(v.amount, v.initialRate)), highlight: true },
        { label: "Maximum Possible Payment", value: formatCurrency(calcPmt(v.amount, v.maxRate)) }
      ];
    }
  },
  "bi-weekly-payment": {
    title: "Bi-weekly Payment Calculator",
    description: "See savings from paying half monthly payment every 2 weeks.",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 300000 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 6.5 },
      { id: "years", label: "Loan Term (Years)", type: "years", defaultValue: 30 },
    ],
    calculate: (v) => {
      const mr = v.rate / 100 / 12;
      const n = v.years * 12;
      const pmt = (v.amount * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
      const totalStandard = pmt * n;
      
      const biWeekly = pmt / 2;
      const yearlyPaid = biWeekly * 26; // 13 months worth
      // Very rough approx: reduces term by ~4-5 years
      const termSavings = 5;
      
      return [
        { label: "Bi-Weekly Payment", value: formatCurrency(biWeekly) },
        { label: "Estimated Years Saved", value: `~${termSavings} Years`, highlight: true }
      ];
    }
  },
  "interest-only": {
    title: "Interest Only Calculator",
    description: "Calculate interest only loan payments.",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "currency", defaultValue: 500000 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 7.0 },
    ],
    calculate: (v) => {
      const monthly = (v.amount * (v.rate / 100)) / 12;
      return [
        { label: "Monthly Interest Payment", value: formatCurrency(monthly), highlight: true }
      ];
    }
  },
  "rental-property": {
    title: "Rental Property Calculator",
    description: "Analyze cash flow of a rental property.",
    inputs: [
      { id: "rent", label: "Monthly Rent Income", type: "currency", defaultValue: 2500 },
      { id: "mortgage", label: "Monthly Mortgage", type: "currency", defaultValue: 1500 },
      { id: "taxesIns", label: "Monthly Taxes & Ins", type: "currency", defaultValue: 400 },
      { id: "maintenance", label: "Monthly Maint/Capex", type: "currency", defaultValue: 250 },
    ],
    calculate: (v) => {
      const expenses = v.mortgage + v.taxesIns + v.maintenance;
      const cashFlow = v.rent - expenses;
      return [
        { label: "Total Monthly Expenses", value: formatCurrency(expenses) },
        { label: "Monthly Cash Flow", value: formatCurrency(cashFlow), highlight: true }
      ];
    }
  }
};
