import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from 'vite-plugin-sitemap';
import fs from 'fs';

// Helper to extract calculator routes dynamically without importing the TS source directly
const missingSlugs = [
  "investment-income", "savings-goal", "apr-advanced", "loan-analysis",
  "mortgage-tax-saving", "fixed-vs-adjustable", "401k-save-max",
  "retirement-income-analysis", "social-security-analysis", "social-security-distribution",
  "asset-allocation", "retirement-income", "retirement-basic", "non-constant-growth",
  "holding-period-return", "commodities-futures", "unit-conversion", "treasury-bill",
  "business-forecast", "fuel-calculator", "hourly-to-salary", "net-distribution",
  "effective-rate", "balance-sheet-analysis", "financial-ratios", "currency-converter"
];

const standardSlugs = [
  "tvm-calculator", "irr-npv-calculator", "bond-calculator", "tax-equivalent-yield",
  "rule-of-72", "college-savings", "mutual-fund-fee", "hsa-calculator", "cd-calculator",
  "loan-comparison", "refinance-calculator", "apr-calculator", "commercial-loan",
  "home-affordability", "rent-vs-buy", "discount-points", "adjustable-rate",
  "bi-weekly-payment", "interest-only", "rental-property", "retirement-planner",
  "401k-contribution", "retirement-savings-analysis", "ira-vs-roth", "rmd-calculator",
  "social-security-estimator", "annuity-calculator", "stock-return", "constant-growth",
  "capm-calculator", "expected-return", "wacc-calculator", "black-scholes", "pivot-point",
  "fibonacci", "dividend-tax", "paypal-fee", "stripe-fee", "square-fee", "ebay-fee",
  "etsy-fee", "shopify-fee", "cashapp-fee", "venmo-fee", "credit-card-payoff",
  "credit-card-minimum", "auto-loan", "auto-lease", "tip-calculator", "discount-tax",
  "percentage", "date-calculator", "us-inflation", "margin-markup", "salary-increase",
  "paycheck-tax"
];

const allCalcRoutes = [...standardSlugs, ...missingSlugs].map(s => `/calculators/${s}`);
const otherRoutes = [
  '/calculators', '/word-counter', '/binary-translator', '/morse-translator',
  '/text-formatter', '/text-cleaner', '/json-formatter', '/password-generator',
  '/lorem-ipsum', '/base64', '/url-encoder', '/hash-generator', '/privacy', 
  '/about', '/contact', '/compound-interest', '/loan-calculator', '/roi-calculator',
  '/zip-extractor', '/zip-creator', '/image-converter'
];

const dynamicRoutes = [...otherRoutes, ...allCalcRoutes];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: 'https://caseconvert.online',
      dynamicRoutes,
      outDir: 'dist',
      robots: [{ userAgent: '*', allow: '/' }]
    })
  ];

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
