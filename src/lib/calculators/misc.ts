import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const miscCalculators: Record<string, CalculatorConfig> = {
  "credit-card-payoff": {
    title: "Credit Card Payoff",
    description: "Calculate months to payoff credit card.",
    inputs: [
      { id: "balance", label: "Balance", type: "currency", defaultValue: 5000 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 19.9 },
      { id: "payment", label: "Monthly Payment", type: "currency", defaultValue: 200 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      if (v.payment <= v.balance * r) {
        return [{ label: "Error", value: "Payment must be greater than monthly interest." }];
      }
      const months = -Math.log(1 - (r * v.balance) / v.payment) / Math.log(1 + r);
      const totalInt = (v.payment * Math.ceil(months)) - v.balance;
      return [
        { label: "Months to Payoff", value: formatNumber(Math.ceil(months)), highlight: true },
        { label: "Total Interest Paid", value: formatCurrency(totalInt) }
      ];
    }
  },
  "credit-card-minimum": {
    title: "Credit Card Minimum",
    description: "See the true cost of making only minimum payments.",
    inputs: [
      { id: "balance", label: "Balance", type: "currency", defaultValue: 5000 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 19.9 },
      { id: "minPct", label: "Minimum Payment (%)", type: "percent", defaultValue: 2 },
    ],
    calculate: (v) => {
      // Simplified static minimum payment
      const pmt = Math.max(v.balance * (v.minPct/100), 25);
      const r = v.rate / 100 / 12;
      if (pmt <= v.balance * r) {
        return [{ label: "Error", value: "Min payment doesn't cover interest." }];
      }
      const months = -Math.log(1 - (r * v.balance) / pmt) / Math.log(1 + r);
      return [
        { label: "Months to Payoff", value: formatNumber(Math.ceil(months)), highlight: true },
        { label: "Estimated First Payment", value: formatCurrency(pmt) }
      ];
    }
  },
  "auto-loan": {
    title: "Auto Loan Calculator",
    description: "Calculate monthly car payments.",
    inputs: [
      { id: "price", label: "Car Price", type: "currency", defaultValue: 30000 },
      { id: "down", label: "Down Payment", type: "currency", defaultValue: 5000 },
      { id: "trade", label: "Trade-in Value", type: "currency", defaultValue: 0 },
      { id: "rate", label: "Interest Rate (%)", type: "percent", defaultValue: 5.0 },
      { id: "months", label: "Loan Term (Months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const principal = v.price - v.down - v.trade;
      const r = v.rate / 100 / 12;
      const pmt = r === 0 ? principal / v.months : (principal * r) / (1 - Math.pow(1 + r, -v.months));
      return [
        { label: "Monthly Payment", value: formatCurrency(pmt), highlight: true },
        { label: "Total Interest", value: formatCurrency((pmt * v.months) - principal) }
      ];
    }
  },
  "auto-lease": {
    title: "Auto Lease Calculator",
    description: "Calculate monthly lease payments.",
    inputs: [
      { id: "price", label: "Negotiated Price", type: "currency", defaultValue: 30000 },
      { id: "residual", label: "Residual Value", type: "currency", defaultValue: 15000 },
      { id: "months", label: "Lease Term (Months)", type: "number", defaultValue: 36 },
      { id: "moneyFactor", label: "Money Factor (e.g. 0.00125)", type: "number", defaultValue: 0.00125 },
    ],
    calculate: (v) => {
      const depreciation = (v.price - v.residual) / v.months;
      const finance = (v.price + v.residual) * v.moneyFactor;
      const pmt = depreciation + finance;
      return [
        { label: "Monthly Lease Payment (Pre-tax)", value: formatCurrency(pmt), highlight: true }
      ];
    }
  },
  "tip-calculator": {
    title: "Tip Calculator",
    description: "Calculate tip amount and split bill.",
    inputs: [
      { id: "bill", label: "Bill Amount", type: "currency", defaultValue: 50 },
      { id: "tipPct", label: "Tip Percentage (%)", type: "percent", defaultValue: 20 },
      { id: "split", label: "Split Between (People)", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const tip = v.bill * (v.tipPct / 100);
      const total = v.bill + tip;
      const perPerson = total / (v.split || 1);
      return [
        { label: "Total Tip", value: formatCurrency(tip) },
        { label: "Total Bill", value: formatCurrency(total) },
        { label: "Total Per Person", value: formatCurrency(perPerson), highlight: true }
      ];
    }
  },
  "discount-tax": {
    title: "Discount and Tax",
    description: "Calculate final price after discount and tax.",
    inputs: [
      { id: "price", label: "Original Price", type: "currency", defaultValue: 100 },
      { id: "discount", label: "Discount (%)", type: "percent", defaultValue: 20 },
      { id: "tax", label: "Tax Rate (%)", type: "percent", defaultValue: 8 },
    ],
    calculate: (v) => {
      const afterDiscount = v.price * (1 - v.discount/100);
      const finalPrice = afterDiscount * (1 + v.tax/100);
      return [
        { label: "Amount Saved", value: formatCurrency(v.price - afterDiscount) },
        { label: "Final Price", value: formatCurrency(finalPrice), highlight: true }
      ];
    }
  },
  "percentage": {
    title: "Percentage Calculator",
    description: "Calculate X percent of Y.",
    inputs: [
      { id: "pct", label: "Percentage (%)", type: "number", defaultValue: 15 },
      { id: "val", label: "Value", type: "number", defaultValue: 200 },
    ],
    calculate: (v) => {
      const result = (v.pct / 100) * v.val;
      return [
        { label: "Result", value: formatNumber(result), highlight: true }
      ];
    }
  },
  "date-calculator": {
    title: "Date Calculator",
    description: "Calculate days between two dates. (Placeholder input logic)",
    inputs: [
      { id: "days", label: "Days to Add/Subtract", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const d = new Date();
      d.setDate(d.getDate() + v.days);
      return [
        { label: "Resulting Date", value: d.toDateString(), highlight: true }
      ];
    }
  },
  "us-inflation": {
    title: "US Inflation Calculator",
    description: "Placeholder for inflation calculation.",
    inputs: [
      { id: "amount", label: "Amount in Base Year", type: "currency", defaultValue: 100 },
      { id: "inflation", label: "Average Annual Inflation (%)", type: "percent", defaultValue: 3 },
      { id: "years", label: "Years Passed", type: "years", defaultValue: 10 },
    ],
    calculate: (v) => {
      const fv = v.amount * Math.pow(1 + (v.inflation/100), v.years);
      return [
        { label: "Future Equivalent Value", value: formatCurrency(fv), highlight: true }
      ];
    }
  },
  "margin-markup": {
    title: "Margin and Markup",
    description: "Calculate gross margin and markup.",
    inputs: [
      { id: "cost", label: "Cost", type: "currency", defaultValue: 50 },
      { id: "revenue", label: "Revenue", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const profit = v.revenue - v.cost;
      const margin = (profit / v.revenue) * 100;
      const markup = (profit / v.cost) * 100;
      return [
        { label: "Gross Margin", value: formatPercent(margin), highlight: true },
        { label: "Markup", value: formatPercent(markup) }
      ];
    }
  },
  "salary-increase": {
    title: "Salary Increase",
    description: "Calculate new salary after a raise.",
    inputs: [
      { id: "salary", label: "Current Salary", type: "currency", defaultValue: 50000 },
      { id: "raise", label: "Raise Percentage (%)", type: "percent", defaultValue: 5 },
    ],
    calculate: (v) => {
      const newSalary = v.salary * (1 + v.raise/100);
      return [
        { label: "New Salary", value: formatCurrency(newSalary), highlight: true },
        { label: "Increase Amount", value: formatCurrency(newSalary - v.salary) }
      ];
    }
  },
  "paycheck-tax": {
    title: "Paycheck Tax Calculator",
    description: "Estimate net pay after rough taxes.",
    inputs: [
      { id: "gross", label: "Gross Pay (Per Paycheck)", type: "currency", defaultValue: 2000 },
      { id: "taxRate", label: "Estimated Total Tax Rate (%)", type: "percent", defaultValue: 25 },
    ],
    calculate: (v) => {
      const net = v.gross * (1 - v.taxRate/100);
      return [
        { label: "Estimated Net Pay", value: formatCurrency(net), highlight: true },
        { label: "Total Taxes Withheld", value: formatCurrency(v.gross - net) }
      ];
    }
  }
};
