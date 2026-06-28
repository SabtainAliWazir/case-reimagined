const fs = require('fs');
const path = require('path');

const missingSlugs = [
  "investment-income",
  "savings-goal",
  "apr-advanced",
  "loan-analysis",
  "mortgage-tax-saving",
  "fixed-vs-adjustable",
  "401k-save-max",
  "retirement-income-analysis",
  "social-security-analysis",
  "social-security-distribution",
  "asset-allocation",
  "retirement-income",
  "retirement-basic",
  "non-constant-growth",
  "holding-period-return",
  "commodities-futures",
  "unit-conversion",
  "treasury-bill",
  "business-forecast",
  "fuel-calculator",
  "hourly-to-salary",
  "net-distribution",
  "effective-rate",
  "balance-sheet-analysis",
  "financial-ratios",
  "currency-converter"
];

function toPascalCase(str) {
  return str.split('-').map(word => {
    // Check if word starts with a number
    if (/^\d/.test(word)) {
      return "C" + word; // Add prefix 'C' if it starts with a number to make valid component name
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const appJsxPath = path.join(__dirname, 'src', 'App.tsx');
let appJsx = fs.readFileSync(appJsxPath, 'utf8');

const indexJsxPath = path.join(__dirname, 'src', 'pages', 'CalculatorsIndex.tsx');
let indexJsx = fs.readFileSync(indexJsxPath, 'utf8');

let importsToAdd = "";
let routesToAdd = "";
let registryToAdd = "";

missingSlugs.forEach(slug => {
  const componentName = toPascalCase(slug);
  const fileName = `${componentName}.tsx`;
  const filePath = path.join(__dirname, 'src', 'pages', 'calculators', fileName);

  const fileContent = `import { DynamicCalculator } from "@/components/DynamicCalculator";

const ${componentName} = () => {
  return <DynamicCalculator id="${slug}" />;
};

export default ${componentName};
`;

  fs.writeFileSync(filePath, fileContent);

  importsToAdd += `import ${componentName} from "./pages/calculators/${componentName}";\n`;
  routesToAdd += `              <Route path="/calculators/${slug}" element={<${componentName} />} />\n`;
  
  registryToAdd += `  { category: "Additional Tools", href: "/calculators/${slug}", title: "${toTitleCase(slug)}", icon: Calculator, description: "Calculate ${toTitleCase(slug)}." },\n`;
});

// Update App.tsx
// Insert imports before `import { ScrollToTop }`
appJsx = appJsx.replace('import { ScrollToTop }', importsToAdd + 'import { ScrollToTop }');

// Insert routes before `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}`
appJsx = appJsx.replace('{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}', routesToAdd + '              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}');

fs.writeFileSync(appJsxPath, appJsx);

// Update CalculatorsIndex.tsx
// Insert registry items before the closing `];` of the `allCalculators` array
indexJsx = indexJsx.replace(/\n];\n\nconst categories/, ',\n' + registryToAdd + '];\n\nconst categories');
fs.writeFileSync(indexJsxPath, indexJsx);

console.log("Missing calculators generated successfully.");
