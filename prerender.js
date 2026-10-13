import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8081;
const DIST_DIR = path.resolve(__dirname, 'dist');

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
  "paycheck-tax", "triangle-calculator"
];

const allCalcRoutes = [...standardSlugs, ...missingSlugs].map(s => `/calculators/${s}`);
const converterRoutes = [
  '/uppercase-converter', '/lowercase-converter', '/title-case-converter',
  '/sentence-case-converter', '/capitalized-case-converter', '/camelcase-converter',
  '/kebab-case-converter', '/pascal-case-converter', '/alternating-case-converter',
  '/reverse-text-generator'
];

const otherRoutes = [
  '/', ...converterRoutes,
  '/slug-generator', '/small-text-generator', '/binary-to-hex',
  '/word-frequency-counter', '/text-diff-checker', '/caesar-cipher',
  '/camelcase-to-snake-case', '/snake-case-to-camelcase', '/pascalcase-to-camelcase',
  '/kebab-case-to-camelcase', '/binary-to-morse-code', '/base64-to-hex',
  '/calculators', '/word-counter', '/binary-translator', '/morse-translator',
  '/text-formatter', '/text-cleaner', '/json-formatter', '/password-generator',
  '/lorem-ipsum', '/base64', '/url-encoder', '/hash-generator', '/epoch-converter',
  '/privacy', '/about', '/contact', '/compound-interest', '/loan-calculator',
  '/roi-calculator', '/zip-extractor', '/zip-creator', '/image-converter', '/blog', '/404'
];

const routes = Array.from(new Set([...otherRoutes, ...allCalcRoutes]));

async function prerender() {
  const app = express();
  
  // Serve static files from dist directory, fallback to index.html for CSR routes
  app.use(express.static(DIST_DIR));
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Static server listening on port ${PORT}`);
    
    try {
      let browser;
      try {
        browser = await puppeteer.launch({ 
          headless: "new",
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
          ]
        });
      } catch (browserError) {
        console.warn("Puppeteer launch failed on CI/Vercel environment. Falling back to Vite SPA build.", browserError.message);
        server.close();
        process.exit(0);
        return;
      }
      
      for (const route of routes) {
        const page = await browser.newPage();
        
        page.on('console', msg => {
          if (msg.type() === 'error') {
            console.log(`Browser console error [${route}]:`, msg.text());
          }
        });
        page.on('pageerror', err => {
          console.log(`Browser page error [${route}]:`, err.toString());
        });

        console.log(`Prerendering ${route}...`);
        
        try {
          await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
          // Wait for React #root to have child elements
          await page.waitForFunction(() => {
            const root = document.getElementById('root');
            return root && root.children.length > 0;
          }, { timeout: 8000 });
        } catch (e) {
          console.log(`Notice on ${route}: ${e.message}`);
        }
        
        // Wait a brief moment for dynamic metadata to settle
        await new Promise(r => setTimeout(r, 150));
        
        const html = await page.content();
        
        // Write the HTML file
        let routePath = `${route}/index.html`;
        if (route === '/') routePath = '/index.html';
        if (route === '/404') routePath = '/404.html';
        const filePath = path.join(DIST_DIR, routePath);
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, html);
        
        console.log(`Saved ${filePath}`);
        await page.close();
      }
      
      await browser.close();
      console.log('Prerendering complete!');
    } catch (err) {
      console.error('Error during prerendering:', err);
      process.exit(1);
    } finally {
      server.close();
    }
  });
}

prerender();
