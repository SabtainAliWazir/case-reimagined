const fs = require('fs');
const path = require('path');

const feeCalculators = [
  { id: "paypal-fee", title: "PayPal Fee Calculator", icon: "BadgeDollarSign" },
  { id: "stripe-fee", title: "Stripe Fee Calculator", icon: "CreditCard" },
  { id: "square-fee", title: "Square Fee Calculator", icon: "Square" },
  { id: "ebay-fee", title: "eBay Fee Calculator", icon: "ShoppingCart" },
  { id: "etsy-fee", title: "Etsy Fee Calculator", icon: "Store" },
  { id: "shopify-fee", title: "Shopify Fee Calculator", icon: "ShoppingBag" },
  { id: "cashapp-fee", title: "CashApp Fee Calculator", icon: "Smartphone" },
  { id: "venmo-fee", title: "Venmo Fee Calculator", icon: "Send" },
];

const generateTSX = (calc) => {
  const componentName = calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  return `import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ${calc.icon} } from "lucide-react";

const faqs = [
  {
    question: "How does the ${calc.title} work?",
    answer: "This calculator is currently being updated with the latest fee structures. Check back soon!"
  }
];

const ${componentName} = () => {
  return (
    <CalculatorLayout
      title="${calc.title}"
      description="Easily calculate transaction fees and seller costs using our free online ${calc.title.toLowerCase()}."
      icon={${calc.icon}}
      slug="${calc.id}"
      faqs={faqs}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-1">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Transaction Amount</Label>
              <Input type="number" placeholder="100.00" className="bg-background/50" />
            </div>
            <Button className="w-full rounded-xl">Calculate Fees</Button>
          </div>
        </Card>
        
        <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-6 md:p-8 rounded-3xl lg:col-span-2 flex items-center justify-center min-h-[300px]">
          <div className="text-center text-muted-foreground">
            <${calc.icon} className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Fee logic is being implemented.</p>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ${componentName};
`;
};

const outputDir = path.join(__dirname, 'src', 'pages', 'calculators');

let appRoutes = [];
let allImports = [];
let indexTools = [];

feeCalculators.forEach(calc => {
  const componentName = calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const filePath = path.join(outputDir, `${componentName}.tsx`);
  fs.writeFileSync(filePath, generateTSX(calc));
  
  appRoutes.push(`<Route path="/calculators/${calc.id}" element={<${componentName} />} />`);
  allImports.push(`import ${componentName} from "./pages/calculators/${componentName}";`);
  indexTools.push(`{ category: "Merchant & Payment Fees", href: "/calculators/${calc.id}", title: "${calc.title}", icon: ${calc.icon}, description: "Free online ${calc.title.toLowerCase()} tool to check seller costs." }`);
});

console.log("== IMPORTS FOR APP.TSX ==");
console.log(allImports.join('\n'));

console.log("\n== ROUTES FOR APP.TSX ==");
console.log(appRoutes.join('\n'));

console.log("\n== TOOLS FOR CalculatorsIndex.tsx ==");
console.log(`  ${indexTools.join(',\n  ')}`);
