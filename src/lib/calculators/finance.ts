import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const financeCalculators: Record<string, CalculatorConfig> = {
  "tvm-calculator": {
    title: "Time Value of Money (TVM)",
    description: "Calculate present value, future value, or interest rate.",
    inputs: [
      { id: "pv", label: "Present Value (PV)", type: "currency", defaultValue: 10000 },
      { id: "rate", label: "Annual Rate (%)", type: "percent", defaultValue: 5 },
      { id: "periods", label: "Periods (Years)", type: "years", defaultValue: 10 },
      { id: "pmt", label: "Payment (PMT)", type: "currency", defaultValue: 0 },
    ],
    calculate: (v) => {
      const rate = v.rate / 100;
      const fv = v.pv * Math.pow(1 + rate, v.periods) + v.pmt * ((Math.pow(1 + rate, v.periods) - 1) / rate);
      return [
        { label: "Future Value (FV)", value: formatCurrency(fv), highlight: true },
        { label: "Total Interest", value: formatCurrency(fv - v.pv - (v.pmt * v.periods)) }
      ];
    }
  },
  "irr-npv-calculator": {
    title: "IRR & NPV Calculator",
    description: "Calculate Net Present Value and Internal Rate of Return for 5 cash flows.",
    inputs: [
      { id: "rate", label: "Discount Rate (%)", type: "percent", defaultValue: 10 },
      { id: "cf0", label: "Initial Investment (CF0)", type: "currency", defaultValue: -10000 },
      { id: "cf1", label: "Cash Flow Year 1", type: "currency", defaultValue: 3000 },
      { id: "cf2", label: "Cash Flow Year 2", type: "currency", defaultValue: 4000 },
      { id: "cf3", label: "Cash Flow Year 3", type: "currency", defaultValue: 5000 },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      const npv = v.cf0 + (v.cf1 / Math.pow(1 + r, 1)) + (v.cf2 / Math.pow(1 + r, 2)) + (v.cf3 / Math.pow(1 + r, 3));
      return [
        { label: "Net Present Value (NPV)", value: formatCurrency(npv), highlight: true }
      ];
    }
  },
  "bond-calculator": {
    title: "Bond Calculator",
    description: "Calculate bond price based on yield to maturity.",
    inputs: [
      { id: "faceValue", label: "Face Value", type: "currency", defaultValue: 1000 },
      { id: "couponRate", label: "Coupon Rate (%)", type: "percent", defaultValue: 5 },
      { id: "years", label: "Years to Maturity", type: "years", defaultValue: 10 },
      { id: "ytm", label: "Yield to Maturity (%)", type: "percent", defaultValue: 6 },
    ],
    calculate: (v) => {
      const r = v.ytm / 100;
      const c = (v.couponRate / 100) * v.faceValue;
      const presentValueOfFace = v.faceValue / Math.pow(1 + r, v.years);
      const presentValueOfCoupons = c * ((1 - Math.pow(1 + r, -v.years)) / r);
      const price = presentValueOfFace + presentValueOfCoupons;
      return [
        { label: "Bond Price", value: formatCurrency(price), highlight: true }
      ];
    }
  },
  "tax-equivalent-yield": {
    title: "Tax Equivalent Yield",
    description: "Compare tax-free yields to taxable yields.",
    inputs: [
      { id: "taxFreeYield", label: "Tax-Free Yield (%)", type: "percent", defaultValue: 4 },
      { id: "taxRate", label: "Marginal Tax Rate (%)", type: "percent", defaultValue: 24 },
    ],
    calculate: (v) => {
      const tey = v.taxFreeYield / (1 - (v.taxRate / 100));
      return [
        { label: "Tax Equivalent Yield", value: formatPercent(tey), highlight: true }
      ];
    }
  },
  "rule-of-72": {
    title: "Rule of 72 Calculator",
    description: "Estimate how long it takes to double your investment.",
    inputs: [
      { id: "rate", label: "Annual Return Rate (%)", type: "percent", defaultValue: 8 },
    ],
    calculate: (v) => {
      const years = 72 / (v.rate || 1);
      return [
        { label: "Years to Double", value: formatNumber(years) + " Years", highlight: true }
      ];
    }
  },
  "college-savings": {
    title: "College Savings Calculator",
    description: "Estimate college costs and savings needed.",
    inputs: [
      { id: "currentCost", label: "Current Annual Cost", type: "currency", defaultValue: 25000 },
      { id: "yearsUntil", label: "Years Until College", type: "years", defaultValue: 10 },
      { id: "inflation", label: "College Inflation (%)", type: "percent", defaultValue: 5 },
      { id: "yearsInCollege", label: "Years in College", type: "years", defaultValue: 4 },
    ],
    calculate: (v) => {
      const futureAnnualCost = v.currentCost * Math.pow(1 + (v.inflation/100), v.yearsUntil);
      const totalCost = futureAnnualCost * v.yearsInCollege; // simplified
      return [
        { label: "Future Annual Cost", value: formatCurrency(futureAnnualCost) },
        { label: "Total Estimated Cost", value: formatCurrency(totalCost), highlight: true }
      ];
    }
  },
  "mutual-fund-fee": {
    title: "Mutual Fund Fee Calculator",
    description: "Calculate the long-term impact of expense ratios.",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "currency", defaultValue: 10000 },
      { id: "annualReturn", label: "Expected Return (%)", type: "percent", defaultValue: 8 },
      { id: "expenseRatio", label: "Expense Ratio (%)", type: "percent", defaultValue: 1.5 },
      { id: "years", label: "Investment Years", type: "years", defaultValue: 20 },
    ],
    calculate: (v) => {
      const grossReturn = v.initial * Math.pow(1 + (v.annualReturn/100), v.years);
      const netReturn = v.initial * Math.pow(1 + ((v.annualReturn - v.expenseRatio)/100), v.years);
      const feesPaid = grossReturn - netReturn;
      return [
        { label: "Final Value (After Fees)", value: formatCurrency(netReturn), highlight: true },
        { label: "Total Fees Paid", value: formatCurrency(feesPaid) },
        { label: "Value Without Fees", value: formatCurrency(grossReturn) }
      ];
    }
  },
  "hsa-calculator": {
    title: "HSA Savings Calculator",
    description: "Calculate Health Savings Account future value.",
    inputs: [
      { id: "balance", label: "Current Balance", type: "currency", defaultValue: 5000 },
      { id: "contribution", label: "Annual Contribution", type: "currency", defaultValue: 3000 },
      { id: "rate", label: "Expected Return (%)", type: "percent", defaultValue: 6 },
      { id: "years", label: "Years to Grow", type: "years", defaultValue: 15 },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      const fv = v.balance * Math.pow(1 + r, v.years) + v.contribution * ((Math.pow(1 + r, v.years) - 1) / r);
      return [
        { label: "Future HSA Balance", value: formatCurrency(fv), highlight: true }
      ];
    }
  },
  "cd-calculator": {
    title: "CD Calculator",
    description: "Calculate returns on a Certificate of Deposit.",
    inputs: [
      { id: "deposit", label: "Deposit Amount", type: "currency", defaultValue: 10000 },
      { id: "apy", label: "APY (%)", type: "percent", defaultValue: 4.5 },
      { id: "months", label: "Term (Months)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const fv = v.deposit * Math.pow(1 + (v.apy/100), v.months / 12);
      return [
        { label: "Total Value at Maturity", value: formatCurrency(fv), highlight: true },
        { label: "Total Interest Earned", value: formatCurrency(fv - v.deposit) }
      ];
    }
  }
};
