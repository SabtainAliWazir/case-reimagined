import { CalculatorConfig, formatCurrency, formatPercent, formatNumber } from "./types";

export const missingCalculators: Record<string, CalculatorConfig> = {
  "investment-income": {
    title: "Investment Income Calculator",
    description: "Calculate expected income from investments.",
    inputs: [
      { id: "principal", label: "Principal Amount", type: "currency", defaultValue: 100000 },
      { id: "yield", label: "Annual Yield", type: "percent", defaultValue: 5 }
    ],
    calculate: (inputs) => {
      const income = inputs.principal * (inputs.yield / 100);
      return [
        { label: "Annual Income", value: formatCurrency(income), highlight: true },
        { label: "Monthly Income", value: formatCurrency(income / 12) }
      ];
    }
  },
  "savings-goal": {
    title: "Savings Goal Calculator",
    description: "Find out how much you need to save monthly to reach a goal.",
    inputs: [
      { id: "goal", label: "Savings Goal", type: "currency", defaultValue: 50000 },
      { id: "current", label: "Current Savings", type: "currency", defaultValue: 10000 },
      { id: "years", label: "Years to Grow", type: "years", defaultValue: 5 },
      { id: "rate", label: "Interest Rate", type: "percent", defaultValue: 4 }
    ],
    calculate: (inputs) => {
      const r = inputs.rate / 100 / 12;
      const n = inputs.years * 12;
      const fvCurrent = inputs.current * Math.pow(1 + r, n);
      const shortfall = inputs.goal - fvCurrent;
      const pmt = r === 0 ? shortfall / n : (shortfall * r) / (Math.pow(1 + r, n) - 1);
      return [
        { label: "Required Monthly Savings", value: formatCurrency(Math.max(0, pmt)), highlight: true }
      ];
    }
  },
  "apr-advanced": {
    title: "APR Advanced Calculator",
    description: "Calculate true APR including fees.",
    inputs: [
      { id: "loan", label: "Loan Amount", type: "currency", defaultValue: 10000 },
      { id: "fees", label: "Total Fees", type: "currency", defaultValue: 500 },
      { id: "rate", label: "Nominal Rate", type: "percent", defaultValue: 5 },
      { id: "months", label: "Loan Term (Months)", type: "number", defaultValue: 60 }
    ],
    calculate: (inputs) => {
      // Simplified APR estimate
      const actualLoan = inputs.loan - inputs.fees;
      const r = inputs.rate / 100 / 12;
      const pmt = (inputs.loan * r) / (1 - Math.pow(1 + r, -inputs.months));
      // rough guess APR = (interest + fees) / principal / years
      const totalPaid = pmt * inputs.months;
      const totalInterest = totalPaid - inputs.loan;
      const apr = ((totalInterest + inputs.fees) / actualLoan / (inputs.months / 12)) * 100;
      return [
        { label: "True APR Estimate", value: formatPercent(apr), highlight: true }
      ];
    }
  },
  "loan-analysis": {
    title: "Loan Analysis Calculator",
    description: "Analyze loan costs and payoff strategies.",
    inputs: [
      { id: "balance", label: "Loan Balance", type: "currency", defaultValue: 15000 },
      { id: "rate", label: "Interest Rate", type: "percent", defaultValue: 7 },
      { id: "payment", label: "Monthly Payment", type: "currency", defaultValue: 350 }
    ],
    calculate: (inputs) => {
      const r = inputs.rate / 100 / 12;
      if (inputs.payment <= inputs.balance * r) return [{ label: "Error", value: "Payment too small to cover interest" }];
      const months = -Math.log(1 - (inputs.balance * r) / inputs.payment) / Math.log(1 + r);
      return [
        { label: "Months to Payoff", value: formatNumber(months), highlight: true },
        { label: "Total Interest", value: formatCurrency((months * inputs.payment) - inputs.balance) }
      ];
    }
  },
  "mortgage-tax-saving": {
    title: "Mortgage Tax Saving Calculator",
    description: "Estimate tax savings from mortgage interest deduction.",
    inputs: [
      { id: "interest", label: "Annual Mortgage Interest Paid", type: "currency", defaultValue: 12000 },
      { id: "taxBracket", label: "Marginal Tax Bracket", type: "percent", defaultValue: 24 }
    ],
    calculate: (inputs) => {
      const savings = inputs.interest * (inputs.taxBracket / 100);
      return [
        { label: "Estimated Tax Savings", value: formatCurrency(savings), highlight: true }
      ];
    }
  },
  "fixed-vs-adjustable": {
    title: "Fixed vs Adjustable Rate Calculator",
    description: "Compare fixed and ARM loans.",
    inputs: [
      { id: "loan", label: "Loan Amount", type: "currency", defaultValue: 300000 },
      { id: "fixedRate", label: "Fixed Rate", type: "percent", defaultValue: 6.5 },
      { id: "armRate", label: "Initial ARM Rate", type: "percent", defaultValue: 5.0 }
    ],
    calculate: (inputs) => {
      const rF = inputs.fixedRate / 100 / 12;
      const rA = inputs.armRate / 100 / 12;
      const n = 360;
      const pmtF = (inputs.loan * rF) / (1 - Math.pow(1 + rF, -n));
      const pmtA = (inputs.loan * rA) / (1 - Math.pow(1 + rA, -n));
      return [
        { label: "Fixed Payment", value: formatCurrency(pmtF) },
        { label: "Initial ARM Payment", value: formatCurrency(pmtA) },
        { label: "Initial Monthly Savings", value: formatCurrency(pmtF - pmtA), highlight: true }
      ];
    }
  },
  "401k-save-max": {
    title: "401k Save the Max Calculator",
    description: "Calculate paycheck deductions to max out 401(k).",
    inputs: [
      { id: "limit", label: "Annual Contribution Limit", type: "currency", defaultValue: 23000 },
      { id: "paychecks", label: "Paychecks per Year", type: "number", defaultValue: 26 }
    ],
    calculate: (inputs) => {
      return [
        { label: "Deduction per Paycheck", value: formatCurrency(inputs.limit / inputs.paychecks), highlight: true }
      ];
    }
  },
  "retirement-income-analysis": {
    title: "Retirement Income Analysis",
    description: "Analyze post-retirement cash flow.",
    inputs: [
      { id: "nestEgg", label: "Retirement Nest Egg", type: "currency", defaultValue: 1000000 },
      { id: "withdrawal", label: "Withdrawal Rate", type: "percent", defaultValue: 4 },
      { id: "social", label: "Annual Social Security", type: "currency", defaultValue: 24000 }
    ],
    calculate: (inputs) => {
      const portfolioIncome = inputs.nestEgg * (inputs.withdrawal / 100);
      const total = portfolioIncome + inputs.social;
      return [
        { label: "Portfolio Income", value: formatCurrency(portfolioIncome) },
        { label: "Total Annual Income", value: formatCurrency(total), highlight: true }
      ];
    }
  },
  "social-security-analysis": {
    title: "Social Security Analysis",
    description: "Analyze different social security claiming ages.",
    inputs: [
      { id: "benefit", label: "Benefit at FRA", type: "currency", defaultValue: 2000 }
    ],
    calculate: (inputs) => {
      return [
        { label: "Age 62 Benefit (Reduced)", value: formatCurrency(inputs.benefit * 0.70) },
        { label: "Age 67 Benefit (FRA)", value: formatCurrency(inputs.benefit), highlight: true },
        { label: "Age 70 Benefit (Delayed)", value: formatCurrency(inputs.benefit * 1.24) }
      ];
    }
  },
  "social-security-distribution": {
    title: "Social Security Distribution",
    description: "Estimate survivor or spousal benefits.",
    inputs: [
      { id: "primary", label: "Primary Earner Benefit", type: "currency", defaultValue: 2000 }
    ],
    calculate: (inputs) => {
      return [
        { label: "Max Spousal Benefit", value: formatCurrency(inputs.primary * 0.50), highlight: true }
      ];
    }
  },
  "asset-allocation": {
    title: "Asset Allocation Calculator",
    description: "Determine target stock vs bond mix by age.",
    inputs: [
      { id: "age", label: "Current Age", type: "number", defaultValue: 30 }
    ],
    calculate: (inputs) => {
      const stocks = Math.max(0, 110 - inputs.age);
      const bonds = 100 - stocks;
      return [
        { label: "Target Stocks", value: formatPercent(stocks), highlight: true },
        { label: "Target Bonds", value: formatPercent(bonds) }
      ];
    }
  },
  "retirement-income": {
    title: "Retirement Income Calculator",
    description: "Calculate expected monthly retirement income.",
    inputs: [
      { id: "savings", label: "Total Savings", type: "currency", defaultValue: 500000 },
      { id: "years", label: "Years in Retirement", type: "years", defaultValue: 25 },
      { id: "rate", label: "Return in Retirement", type: "percent", defaultValue: 5 }
    ],
    calculate: (inputs) => {
      const r = inputs.rate / 100 / 12;
      const n = inputs.years * 12;
      const pmt = (inputs.savings * r) / (1 - Math.pow(1 + r, -n));
      return [
        { label: "Monthly Income", value: formatCurrency(pmt), highlight: true }
      ];
    }
  },
  "retirement-basic": {
    title: "Basic Retirement Calculator",
    description: "Quick retirement math.",
    inputs: [
      { id: "current", label: "Current Savings", type: "currency", defaultValue: 100000 },
      { id: "monthly", label: "Monthly Contribution", type: "currency", defaultValue: 500 },
      { id: "years", label: "Years to Grow", type: "years", defaultValue: 20 },
      { id: "rate", label: "Expected Return", type: "percent", defaultValue: 7 }
    ],
    calculate: (inputs) => {
      const r = inputs.rate / 100 / 12;
      const n = inputs.years * 12;
      const fvCurrent = inputs.current * Math.pow(1 + r, n);
      const fvContrib = inputs.monthly * ((Math.pow(1 + r, n) - 1) / r);
      return [
        { label: "Final Balance", value: formatCurrency(fvCurrent + fvContrib), highlight: true }
      ];
    }
  },
  "non-constant-growth": {
    title: "Non-constant Growth Calculator",
    description: "Calculate stock value with two-stage growth.",
    inputs: [
      { id: "div", label: "Current Dividend", type: "currency", defaultValue: 2.00 },
      { id: "highGrowth", label: "High Growth Rate", type: "percent", defaultValue: 15 },
      { id: "years", label: "High Growth Years", type: "number", defaultValue: 5 },
      { id: "normalGrowth", label: "Normal Growth Rate", type: "percent", defaultValue: 5 },
      { id: "discount", label: "Discount Rate", type: "percent", defaultValue: 10 }
    ],
    calculate: (inputs) => {
      // Simplified
      let pv = 0;
      let d = inputs.div;
      const k = inputs.discount / 100;
      const g1 = inputs.highGrowth / 100;
      const g2 = inputs.normalGrowth / 100;
      
      for(let i=1; i<=inputs.years; i++){
        d = d * (1+g1);
        pv += d / Math.pow(1+k, i);
      }
      const terminal = (d * (1+g2)) / (k - g2);
      pv += terminal / Math.pow(1+k, inputs.years);
      
      return [
        { label: "Intrinsic Value", value: formatCurrency(pv), highlight: true }
      ];
    }
  },
  "holding-period-return": {
    title: "Holding Period Return Calculator",
    description: "Calculate total return over a holding period.",
    inputs: [
      { id: "buy", label: "Buy Price", type: "currency", defaultValue: 100 },
      { id: "sell", label: "Sell Price", type: "currency", defaultValue: 120 },
      { id: "income", label: "Dividends Received", type: "currency", defaultValue: 5 }
    ],
    calculate: (inputs) => {
      const hpr = ((inputs.sell - inputs.buy + inputs.income) / inputs.buy) * 100;
      return [
        { label: "Holding Period Return", value: formatPercent(hpr), highlight: true }
      ];
    }
  },
  "commodities-futures": {
    title: "Commodities and Futures Calculator",
    description: "Calculate futures contract margin and leverage.",
    inputs: [
      { id: "price", label: "Contract Price", type: "currency", defaultValue: 50 },
      { id: "size", label: "Contract Size", type: "number", defaultValue: 1000 },
      { id: "margin", label: "Initial Margin Req", type: "currency", defaultValue: 2500 }
    ],
    calculate: (inputs) => {
      const notional = inputs.price * inputs.size;
      const leverage = notional / inputs.margin;
      return [
        { label: "Notional Value", value: formatCurrency(notional) },
        { label: "Leverage Ratio", value: formatNumber(leverage) + ":1", highlight: true }
      ];
    }
  },
  "unit-conversion": {
    title: "Unit Conversion Calculator",
    description: "Basic unit math (Length).",
    inputs: [
      { id: "inches", label: "Inches", type: "number", defaultValue: 12 }
    ],
    calculate: (inputs) => {
      return [
        { label: "Centimeters", value: formatNumber(inputs.inches * 2.54), highlight: true },
        { label: "Feet", value: formatNumber(inputs.inches / 12) }
      ];
    }
  },
  "treasury-bill": {
    title: "US Treasury Bill Calculator",
    description: "Calculate T-Bill discount yield and price.",
    inputs: [
      { id: "face", label: "Face Value", type: "currency", defaultValue: 10000 },
      { id: "price", label: "Purchase Price", type: "currency", defaultValue: 9800 },
      { id: "days", label: "Days to Maturity", type: "number", defaultValue: 180 }
    ],
    calculate: (inputs) => {
      const discount = inputs.face - inputs.price;
      const discountYield = (discount / inputs.face) * (360 / inputs.days) * 100;
      const invYield = (discount / inputs.price) * (365 / inputs.days) * 100;
      return [
        { label: "Discount Yield", value: formatPercent(discountYield) },
        { label: "Investment Yield", value: formatPercent(invYield), highlight: true }
      ];
    }
  },
  "business-forecast": {
    title: "Business Forecast Calculator",
    description: "Project future sales based on historical growth.",
    inputs: [
      { id: "current", label: "Current Revenue", type: "currency", defaultValue: 500000 },
      { id: "growth", label: "Expected Annual Growth", type: "percent", defaultValue: 10 },
      { id: "years", label: "Forecast Years", type: "years", defaultValue: 3 }
    ],
    calculate: (inputs) => {
      const fv = inputs.current * Math.pow(1 + inputs.growth/100, inputs.years);
      return [
        { label: "Forecasted Revenue", value: formatCurrency(fv), highlight: true }
      ];
    }
  },
  "fuel-calculator": {
    title: "Fuel Calculator",
    description: "Calculate trip fuel cost.",
    inputs: [
      { id: "distance", label: "Trip Distance (Miles)", type: "number", defaultValue: 300 },
      { id: "mpg", label: "Vehicle MPG", type: "number", defaultValue: 25 },
      { id: "price", label: "Gas Price per Gallon", type: "currency", defaultValue: 3.50 }
    ],
    calculate: (inputs) => {
      const gallons = inputs.distance / inputs.mpg;
      const cost = gallons * inputs.price;
      return [
        { label: "Fuel Cost", value: formatCurrency(cost), highlight: true },
        { label: "Gallons Used", value: formatNumber(gallons) }
      ];
    }
  },
  "hourly-to-salary": {
    title: "Hourly to Salary Calculator",
    description: "Convert hourly wage to annual salary.",
    inputs: [
      { id: "hourly", label: "Hourly Wage", type: "currency", defaultValue: 25 },
      { id: "hours", label: "Hours per Week", type: "number", defaultValue: 40 }
    ],
    calculate: (inputs) => {
      const annual = inputs.hourly * inputs.hours * 52;
      return [
        { label: "Annual Salary", value: formatCurrency(annual), highlight: true },
        { label: "Monthly Salary", value: formatCurrency(annual / 12) }
      ];
    }
  },
  "net-distribution": {
    title: "Net Distribution Calculator",
    description: "Calculate net amount after withholding taxes.",
    inputs: [
      { id: "gross", label: "Gross Distribution", type: "currency", defaultValue: 10000 },
      { id: "tax", label: "Tax Withholding Rate", type: "percent", defaultValue: 20 }
    ],
    calculate: (inputs) => {
      const net = inputs.gross * (1 - inputs.tax / 100);
      return [
        { label: "Net Distribution", value: formatCurrency(net), highlight: true },
        { label: "Taxes Withheld", value: formatCurrency(inputs.gross - net) }
      ];
    }
  },
  "effective-rate": {
    title: "Effective Rate Calculator",
    description: "Convert nominal interest rate to effective annual rate (EAR).",
    inputs: [
      { id: "nominal", label: "Nominal Rate", type: "percent", defaultValue: 12 },
      { id: "compounding", label: "Compounding Periods/Year", type: "number", defaultValue: 12 }
    ],
    calculate: (inputs) => {
      const r = inputs.nominal / 100;
      const n = inputs.compounding;
      const ear = (Math.pow(1 + r/n, n) - 1) * 100;
      return [
        { label: "Effective Annual Rate (EAR)", value: formatPercent(ear), highlight: true }
      ];
    }
  },
  "balance-sheet-analysis": {
    title: "Balance Sheet Analysis",
    description: "Calculate working capital and current ratio.",
    inputs: [
      { id: "assets", label: "Current Assets", type: "currency", defaultValue: 100000 },
      { id: "liabs", label: "Current Liabilities", type: "currency", defaultValue: 50000 }
    ],
    calculate: (inputs) => {
      const wc = inputs.assets - inputs.liabs;
      const cr = inputs.assets / inputs.liabs;
      return [
        { label: "Working Capital", value: formatCurrency(wc), highlight: true },
        { label: "Current Ratio", value: formatNumber(cr) }
      ];
    }
  },
  "financial-ratios": {
    title: "Financial Ratios Calculator",
    description: "Calculate basic profitability ratios.",
    inputs: [
      { id: "revenue", label: "Total Revenue", type: "currency", defaultValue: 1000000 },
      { id: "netIncome", label: "Net Income", type: "currency", defaultValue: 150000 },
      { id: "equity", label: "Shareholder Equity", type: "currency", defaultValue: 500000 }
    ],
    calculate: (inputs) => {
      const margin = (inputs.netIncome / inputs.revenue) * 100;
      const roe = (inputs.netIncome / inputs.equity) * 100;
      return [
        { label: "Profit Margin", value: formatPercent(margin), highlight: true },
        { label: "Return on Equity (ROE)", value: formatPercent(roe), highlight: true }
      ];
    }
  },
  "currency-converter": {
    title: "Currency Converter",
    description: "Basic flat-rate estimator (Mock Data).",
    inputs: [
      { id: "usd", label: "Amount in USD", type: "currency", defaultValue: 100 },
      { id: "rate", label: "Exchange Rate (USD to Target)", type: "number", defaultValue: 0.92 }
    ],
    calculate: (inputs) => {
      return [
        { label: "Target Currency Value", value: formatNumber(inputs.usd * inputs.rate), highlight: true }
      ];
    }
  }
};
