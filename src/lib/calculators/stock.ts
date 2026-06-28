import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const stockCalculators: Record<string, CalculatorConfig> = {
  "stock-return": {
    title: "Stock Return Calculator",
    description: "Calculate total return from a stock investment.",
    inputs: [
      { id: "shares", label: "Number of Shares", type: "number", defaultValue: 100 },
      { id: "buyPrice", label: "Purchase Price", type: "currency", defaultValue: 50 },
      { id: "sellPrice", label: "Sell Price", type: "currency", defaultValue: 75 },
      { id: "dividends", label: "Total Dividends per Share", type: "currency", defaultValue: 2 },
    ],
    calculate: (v) => {
      const cost = v.shares * v.buyPrice;
      const proceeds = v.shares * v.sellPrice;
      const divTotal = v.shares * v.dividends;
      const profit = proceeds + divTotal - cost;
      const roi = (profit / cost) * 100;
      return [
        { label: "Total Profit/Loss", value: formatCurrency(profit), highlight: true },
        { label: "Return on Investment", value: formatPercent(roi) }
      ];
    }
  },
  "constant-growth": {
    title: "Constant Growth Calculator (Gordon Growth)",
    description: "Value a stock based on constant dividend growth.",
    inputs: [
      { id: "dividend", label: "Expected Dividend Next Year", type: "currency", defaultValue: 2.00 },
      { id: "growth", label: "Constant Growth Rate (%)", type: "percent", defaultValue: 3 },
      { id: "requiredReturn", label: "Required Rate of Return (%)", type: "percent", defaultValue: 8 },
    ],
    calculate: (v) => {
      if (v.requiredReturn <= v.growth) {
        return [{ label: "Error", value: "Required return must be greater than growth." }];
      }
      const value = v.dividend / ((v.requiredReturn / 100) - (v.growth / 100));
      return [
        { label: "Intrinsic Stock Value", value: formatCurrency(value), highlight: true }
      ];
    }
  },
  "capm-calculator": {
    title: "CAPM Calculator",
    description: "Capital Asset Pricing Model expected return.",
    inputs: [
      { id: "riskFree", label: "Risk-Free Rate (%)", type: "percent", defaultValue: 2.5 },
      { id: "beta", label: "Beta of Stock", type: "number", defaultValue: 1.2 },
      { id: "marketReturn", label: "Expected Market Return (%)", type: "percent", defaultValue: 10 },
    ],
    calculate: (v) => {
      const expected = v.riskFree + v.beta * (v.marketReturn - v.riskFree);
      return [
        { label: "Expected Return (CAPM)", value: formatPercent(expected), highlight: true }
      ];
    }
  },
  "expected-return": {
    title: "Expected Return Calculator",
    description: "Calculate expected return of a portfolio.",
    inputs: [
      { id: "w1", label: "Asset 1 Weight (%)", type: "percent", defaultValue: 60 },
      { id: "r1", label: "Asset 1 Return (%)", type: "percent", defaultValue: 8 },
      { id: "w2", label: "Asset 2 Weight (%)", type: "percent", defaultValue: 40 },
      { id: "r2", label: "Asset 2 Return (%)", type: "percent", defaultValue: 4 },
    ],
    calculate: (v) => {
      const ret = (v.w1 / 100 * v.r1) + (v.w2 / 100 * v.r2);
      return [
        { label: "Portfolio Expected Return", value: formatPercent(ret), highlight: true }
      ];
    }
  },
  "wacc-calculator": {
    title: "WACC Calculator",
    description: "Weighted Average Cost of Capital.",
    inputs: [
      { id: "e", label: "Market Value of Equity", type: "currency", defaultValue: 600000 },
      { id: "d", label: "Market Value of Debt", type: "currency", defaultValue: 400000 },
      { id: "re", label: "Cost of Equity (%)", type: "percent", defaultValue: 8 },
      { id: "rd", label: "Cost of Debt (%)", type: "percent", defaultValue: 5 },
      { id: "tax", label: "Corporate Tax Rate (%)", type: "percent", defaultValue: 21 },
    ],
    calculate: (v) => {
      const vTotal = v.e + v.d;
      const wacc = ((v.e / vTotal) * v.re) + ((v.d / vTotal) * v.rd * (1 - v.tax / 100));
      return [
        { label: "WACC", value: formatPercent(wacc), highlight: true }
      ];
    }
  },
  "black-scholes": {
    title: "Black-Scholes Option",
    description: "Theoretical price of European call/put options.",
    inputs: [
      { id: "s", label: "Stock Price", type: "currency", defaultValue: 100 },
      { id: "k", label: "Strike Price", type: "currency", defaultValue: 100 },
      { id: "t", label: "Time to Maturity (Years)", type: "number", defaultValue: 1 },
      { id: "r", label: "Risk-Free Rate (%)", type: "percent", defaultValue: 5 },
      { id: "v", label: "Volatility (%)", type: "percent", defaultValue: 20 },
    ],
    calculate: (v) => {
      // Placeholder for normal CDF
      const nd = (z: number) => 1 / (1 + Math.exp(-1.702 * z));
      const r = v.r / 100;
      const vol = v.v / 100;
      const d1 = (Math.log(v.s / v.k) + (r + vol * vol / 2) * v.t) / (vol * Math.sqrt(v.t));
      const d2 = d1 - vol * Math.sqrt(v.t);
      
      const call = v.s * nd(d1) - v.k * Math.exp(-r * v.t) * nd(d2);
      const put = v.k * Math.exp(-r * v.t) * nd(-d2) - v.s * nd(-d1);

      return [
        { label: "Call Option Price", value: formatCurrency(call), highlight: true },
        { label: "Put Option Price", value: formatCurrency(put) }
      ];
    }
  },
  "pivot-point": {
    title: "Pivot Point Calculator",
    description: "Calculate standard support and resistance levels.",
    inputs: [
      { id: "high", label: "Previous High", type: "currency", defaultValue: 150 },
      { id: "low", label: "Previous Low", type: "currency", defaultValue: 140 },
      { id: "close", label: "Previous Close", type: "currency", defaultValue: 145 },
    ],
    calculate: (v) => {
      const pp = (v.high + v.low + v.close) / 3;
      const r1 = (pp * 2) - v.low;
      const s1 = (pp * 2) - v.high;
      return [
        { label: "Pivot Point (PP)", value: formatCurrency(pp), highlight: true },
        { label: "Resistance (R1)", value: formatCurrency(r1) },
        { label: "Support (S1)", value: formatCurrency(s1) }
      ];
    }
  },
  "fibonacci": {
    title: "Fibonacci Retracement",
    description: "Calculate Fibonacci retracement levels.",
    inputs: [
      { id: "high", label: "Trend High", type: "currency", defaultValue: 200 },
      { id: "low", label: "Trend Low", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const diff = v.high - v.low;
      return [
        { label: "23.6% Level", value: formatCurrency(v.high - diff * 0.236) },
        { label: "38.2% Level", value: formatCurrency(v.high - diff * 0.382) },
        { label: "50.0% Level", value: formatCurrency(v.high - diff * 0.5), highlight: true },
        { label: "61.8% Level", value: formatCurrency(v.high - diff * 0.618) }
      ];
    }
  },
  "dividend-tax": {
    title: "Dividend Tax Calculator",
    description: "Calculate taxes owed on dividend income.",
    inputs: [
      { id: "dividends", label: "Total Dividends", type: "currency", defaultValue: 5000 },
      { id: "taxRate", label: "Dividend Tax Rate (%)", type: "percent", defaultValue: 15 },
    ],
    calculate: (v) => {
      const tax = v.dividends * (v.taxRate / 100);
      return [
        { label: "Tax Owed", value: formatCurrency(tax), highlight: true },
        { label: "After-Tax Income", value: formatCurrency(v.dividends - tax) }
      ];
    }
  }
};
