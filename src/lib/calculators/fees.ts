import { CalculatorConfig, formatCurrency } from "./types";

export const feeCalculators: Record<string, CalculatorConfig> = {
  "paypal-fee": {
    title: "PayPal Fee Calculator",
    description: "Calculate standard PayPal domestic transaction fees (3.49% + $0.49).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.0349) + 0.49;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  },
  "stripe-fee": {
    title: "Stripe Fee Calculator",
    description: "Calculate standard Stripe transaction fees (2.9% + $0.30).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.029) + 0.30;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  },
  "square-fee": {
    title: "Square Fee Calculator",
    description: "Calculate Square card present fees (2.6% + $0.10).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.026) + 0.10;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  },
  "ebay-fee": {
    title: "eBay Fee Calculator",
    description: "Calculate general eBay final value fees (approx 13.25% + $0.30).",
    inputs: [
      { id: "amount", label: "Total Sale Amount", type: "currency", defaultValue: 100 },
      { id: "cost", label: "Item Cost", type: "currency", defaultValue: 50 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.1325) + 0.30;
      const profit = v.amount - fee - v.cost;
      return [
        { label: "eBay Fee", value: formatCurrency(fee) },
        { label: "Net Profit", value: formatCurrency(profit), highlight: true }
      ];
    }
  },
  "etsy-fee": {
    title: "Etsy Fee Calculator",
    description: "Calculate Etsy listing and transaction fees (6.5% + $0.20 + 3% + $0.25).",
    inputs: [
      { id: "amount", label: "Sale Price", type: "currency", defaultValue: 50 },
      { id: "shipping", label: "Shipping Charged", type: "currency", defaultValue: 5 },
    ],
    calculate: (v) => {
      const total = v.amount + v.shipping;
      const listingFee = 0.20;
      const transFee = total * 0.065;
      const paymentFee = (total * 0.03) + 0.25;
      const totalFee = listingFee + transFee + paymentFee;
      return [
        { label: "Total Etsy Fees", value: formatCurrency(totalFee) },
        { label: "You Receive", value: formatCurrency(total - totalFee), highlight: true }
      ];
    }
  },
  "shopify-fee": {
    title: "Shopify Fee Calculator",
    description: "Calculate Shopify Basic plan online fees (2.9% + $0.30).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.029) + 0.30;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  },
  "cashapp-fee": {
    title: "CashApp Fee Calculator",
    description: "Calculate CashApp business transaction fees (2.75%).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = v.amount * 0.0275;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  },
  "venmo-fee": {
    title: "Venmo Fee Calculator",
    description: "Calculate Venmo business profile fees (1.9% + $0.10).",
    inputs: [
      { id: "amount", label: "Transaction Amount", type: "currency", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fee = (v.amount * 0.019) + 0.10;
      return [
        { label: "Fee Amount", value: formatCurrency(fee) },
        { label: "You Receive", value: formatCurrency(v.amount - fee), highlight: true }
      ];
    }
  }
};
