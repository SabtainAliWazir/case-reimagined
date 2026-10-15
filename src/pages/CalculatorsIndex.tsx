import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search, Calculator, LineChart, FileText, Percent, Timer, GraduationCap, Briefcase, HeartPulse, Landmark, Scale, RefreshCw, Building, Home, Tag, TrendingUp, Calendar, CircleDollarSign, Building2, Palmtree, PiggyBank, PieChart, CalendarClock, Banknote, Activity, Target, Layers, GitMerge, Crosshair, Waves, Receipt, CreditCard, Car, CarFront, Coins, CalendarDays, TrendingDown, ArrowUpRight, ArrowUp, ReceiptText, BadgeDollarSign, Square, ShoppingCart, Store, ShoppingBag, Smartphone, Send, Triangle, Type } from "lucide-react";

export const allCalculators = [
  { category: "Math & Geometry", href: "/calculators/triangle-calculator", title: "Triangle Calculator", icon: Triangle, description: "Advanced calculator to solve SSS, SAS, SSA, ASA, and AAS triangles." },
  { category: "Finance & Investment", href: "/calculators/tvm-calculator", title: "TVM Calculator", icon: Calculator, description: "Free online tvm calculator tool." },
  { category: "Finance & Investment", href: "/calculators/irr-npv-calculator", title: "IRR NPV Calculator", icon: LineChart, description: "Free online irr npv calculator tool." },
  { category: "Finance & Investment", href: "/calculators/bond-calculator", title: "Bond Calculator", icon: FileText, description: "Free online bond calculator tool." },
  { category: "Finance & Investment", href: "/calculators/tax-equivalent-yield", title: "Tax Equivalent Yield", icon: Percent, description: "Free online tax equivalent yield tool." },
  { category: "Finance & Investment", href: "/calculators/rule-of-72", title: "Rule of 72 Calculator", icon: Timer, description: "Free online rule of 72 calculator tool." },
  { category: "Finance & Investment", href: "/calculators/college-savings", title: "College Savings Calculator", icon: GraduationCap, description: "Free online college savings calculator tool." },
  { category: "Finance & Investment", href: "/calculators/mutual-fund-fee", title: "Mutual Fund Fee Calculator", icon: Briefcase, description: "Free online mutual fund fee calculator tool." },
  { category: "Finance & Investment", href: "/calculators/hsa-calculator", title: "HSA Calculator", icon: HeartPulse, description: "Free online hsa calculator tool." },
  { category: "Finance & Investment", href: "/calculators/cd-calculator", title: "CD Calculator", icon: Landmark, description: "Free online cd calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/loan-comparison", title: "Loan Comparison Calculator", icon: Scale, description: "Free online loan comparison calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/refinance-calculator", title: "Refinance Calculator", icon: RefreshCw, description: "Free online refinance calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/apr-calculator", title: "APR Calculator", icon: Percent, description: "Free online apr calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/commercial-loan", title: "Commercial Loan Calculator", icon: Building, description: "Free online commercial loan calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/home-affordability", title: "Home Affordability Calculator", icon: Home, description: "Free online home affordability calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/rent-vs-buy", title: "Rent vs Buy Calculator", icon: Home, description: "Free online rent vs buy calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/discount-points", title: "Discount Points Calculator", icon: Tag, description: "Free online discount points calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/adjustable-rate", title: "Adjustable Rate Calculator", icon: TrendingUp, description: "Free online adjustable rate calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/bi-weekly-payment", title: "Bi-weekly Payment Calculator", icon: Calendar, description: "Free online bi-weekly payment calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/interest-only", title: "Interest Only Calculator", icon: CircleDollarSign, description: "Free online interest only calculator tool." },
  { category: "Loan & Mortgage", href: "/calculators/rental-property", title: "Rental Property Calculator", icon: Building2, description: "Free online rental property calculator tool." },
  { category: "Retirement", href: "/calculators/retirement-planner", title: "Retirement Planner", icon: Palmtree, description: "Free online retirement planner tool." },
  { category: "Retirement", href: "/calculators/401k-contribution", title: "401k Contribution", icon: PiggyBank, description: "Free online 401k contribution tool." },
  { category: "Retirement", href: "/calculators/retirement-savings-analysis", title: "Retirement Savings Analysis", icon: PieChart, description: "Free online retirement savings analysis tool." },
  { category: "Retirement", href: "/calculators/ira-vs-roth", title: "Traditional IRA vs Roth IRA", icon: Scale, description: "Free online traditional ira vs roth ira tool." },
  { category: "Retirement", href: "/calculators/rmd-calculator", title: "Required Minimum Distribution", icon: CalendarClock, description: "Free online required minimum distribution tool." },
  { category: "Retirement", href: "/calculators/social-security-estimator", title: "Social Security Estimator", icon: Landmark, description: "Free online social security estimator tool." },
  { category: "Retirement", href: "/calculators/annuity-calculator", title: "Annuity Calculator", icon: Banknote, description: "Free online annuity calculator tool." },
  { category: "Stock Calculators", href: "/calculators/stock-return", title: "Stock Return Calculator", icon: TrendingUp, description: "Free online stock return calculator tool." },
  { category: "Stock Calculators", href: "/calculators/constant-growth", title: "Constant Growth Calculator", icon: LineChart, description: "Free online constant growth calculator tool." },
  { category: "Stock Calculators", href: "/calculators/capm-calculator", title: "CAPM Calculator", icon: Activity, description: "Free online capm calculator tool." },
  { category: "Stock Calculators", href: "/calculators/expected-return", title: "Expected Return Calculator", icon: Target, description: "Free online expected return calculator tool." },
  { category: "Stock Calculators", href: "/calculators/wacc-calculator", title: "WACC Calculator", icon: Layers, description: "Free online wacc calculator tool." },
  { category: "Stock Calculators", href: "/calculators/black-scholes", title: "Black-Scholes Option", icon: GitMerge, description: "Free online black-scholes option tool." },
  { category: "Stock Calculators", href: "/calculators/pivot-point", title: "Pivot Point Calculator", icon: Crosshair, description: "Free online pivot point calculator tool." },
  { category: "Stock Calculators", href: "/calculators/fibonacci", title: "Fibonacci Calculator", icon: Waves, description: "Free online fibonacci calculator tool." },
  { category: "Stock Calculators", href: "/calculators/dividend-tax", title: "Dividend Tax Calculator", icon: Receipt, description: "Free online dividend tax calculator tool." },
  { category: "Credit Card & Auto", href: "/calculators/credit-card-payoff", title: "Credit Card Payoff", icon: CreditCard, description: "Free online credit card payoff tool." },
  { category: "Credit Card & Auto", href: "/calculators/credit-card-minimum", title: "Credit Card Minimum", icon: CreditCard, description: "Free online credit card minimum tool." },
  { category: "Credit Card & Auto", href: "/calculators/auto-loan", title: "Auto Loan Calculator", icon: Car, description: "Free online auto loan calculator tool." },
  { category: "Credit Card & Auto", href: "/calculators/auto-lease", title: "Auto Lease Calculator", icon: CarFront, description: "Free online auto lease calculator tool." },
  { category: "Miscellaneous", href: "/calculators/tip-calculator", title: "Tip Calculator", icon: Coins, description: "Free online tip calculator tool." },
  { category: "Miscellaneous", href: "/calculators/discount-tax", title: "Discount and Tax", icon: Tag, description: "Free online discount and tax tool." },
  { category: "Miscellaneous", href: "/calculators/percentage", title: "Percentage Calculator", icon: Percent, description: "Free online percentage calculator tool." },
  { category: "Miscellaneous", href: "/calculators/date-calculator", title: "Date Calculator", icon: CalendarDays, description: "Free online date calculator tool." },
  { category: "Miscellaneous", href: "/calculators/us-inflation", title: "US Inflation Calculator", icon: TrendingDown, description: "Free online us inflation calculator tool." },
  { category: "Miscellaneous", href: "/calculators/margin-markup", title: "Margin and Markup", icon: ArrowUpRight, description: "Free online margin and markup tool." },
  { category: "Miscellaneous", href: "/calculators/salary-increase", title: "Salary Increase", icon: ArrowUp, description: "Free online salary increase tool." },
  { category: "Miscellaneous", href: "/calculators/paycheck-tax", title: "Paycheck Tax Calculator", icon: ReceiptText, description: "Free online paycheck tax calculator tool." },
  { category: "Merchant & Payment Fees", href: "/calculators/paypal-fee", title: "PayPal Fee Calculator", icon: BadgeDollarSign, description: "Free online paypal fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/stripe-fee", title: "Stripe Fee Calculator", icon: CreditCard, description: "Free online stripe fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/square-fee", title: "Square Fee Calculator", icon: Square, description: "Free online square fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/ebay-fee", title: "eBay Fee Calculator", icon: ShoppingCart, description: "Free online ebay fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/etsy-fee", title: "Etsy Fee Calculator", icon: Store, description: "Free online etsy fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/shopify-fee", title: "Shopify Fee Calculator", icon: ShoppingBag, description: "Free online shopify fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/cashapp-fee", title: "CashApp Fee Calculator", icon: Smartphone, description: "Free online cashapp fee calculator tool to check seller costs." },
  { category: "Merchant & Payment Fees", href: "/calculators/venmo-fee", title: "Venmo Fee Calculator", icon: Send, description: "Free online venmo fee calculator tool to check seller costs." },
  { category: "Additional Tools", href: "/calculators/investment-income", title: "Investment Income", icon: Calculator, description: "Calculate Investment Income." },
  { category: "Additional Tools", href: "/calculators/savings-goal", title: "Savings Goal", icon: Calculator, description: "Calculate Savings Goal." },
  { category: "Additional Tools", href: "/calculators/apr-advanced", title: "Apr Advanced", icon: Calculator, description: "Calculate Apr Advanced." },
  { category: "Additional Tools", href: "/calculators/loan-analysis", title: "Loan Analysis", icon: Calculator, description: "Calculate Loan Analysis." },
  { category: "Additional Tools", href: "/calculators/mortgage-tax-saving", title: "Mortgage Tax Saving", icon: Calculator, description: "Calculate Mortgage Tax Saving." },
  { category: "Additional Tools", href: "/calculators/fixed-vs-adjustable", title: "Fixed Vs Adjustable", icon: Calculator, description: "Calculate Fixed Vs Adjustable." },
  { category: "Additional Tools", href: "/calculators/401k-save-max", title: "401k Save Max", icon: Calculator, description: "Calculate 401k Save Max." },
  { category: "Additional Tools", href: "/calculators/retirement-income-analysis", title: "Retirement Income Analysis", icon: Calculator, description: "Calculate Retirement Income Analysis." },
  { category: "Additional Tools", href: "/calculators/social-security-analysis", title: "Social Security Analysis", icon: Calculator, description: "Calculate Social Security Analysis." },
  { category: "Additional Tools", href: "/calculators/social-security-distribution", title: "Social Security Distribution", icon: Calculator, description: "Calculate Social Security Distribution." },
  { category: "Additional Tools", href: "/calculators/asset-allocation", title: "Asset Allocation", icon: Calculator, description: "Calculate Asset Allocation." },
  { category: "Additional Tools", href: "/calculators/retirement-income", title: "Retirement Income", icon: Calculator, description: "Calculate Retirement Income." },
  { category: "Additional Tools", href: "/calculators/retirement-basic", title: "Retirement Basic", icon: Calculator, description: "Calculate Retirement Basic." },
  { category: "Additional Tools", href: "/calculators/non-constant-growth", title: "Non Constant Growth", icon: Calculator, description: "Calculate Non Constant Growth." },
  { category: "Additional Tools", href: "/calculators/holding-period-return", title: "Holding Period Return", icon: Calculator, description: "Calculate Holding Period Return." },
  { category: "Additional Tools", href: "/calculators/commodities-futures", title: "Commodities Futures", icon: Calculator, description: "Calculate Commodities Futures." },
  { category: "Additional Tools", href: "/calculators/unit-conversion", title: "Unit Conversion", icon: Calculator, description: "Calculate Unit Conversion." },
  { category: "Additional Tools", href: "/calculators/treasury-bill", title: "Treasury Bill", icon: Calculator, description: "Calculate Treasury Bill." },
  { category: "Additional Tools", href: "/calculators/business-forecast", title: "Business Forecast", icon: Calculator, description: "Calculate Business Forecast." },
  { category: "Additional Tools", href: "/calculators/fuel-calculator", title: "Fuel Calculator", icon: Calculator, description: "Calculate Fuel Calculator." },
  { category: "Additional Tools", href: "/calculators/hourly-to-salary", title: "Hourly To Salary", icon: Calculator, description: "Calculate Hourly To Salary." },
  { category: "Additional Tools", href: "/calculators/net-distribution", title: "Net Distribution", icon: Calculator, description: "Calculate Net Distribution." },
  { category: "Additional Tools", href: "/calculators/effective-rate", title: "Effective Rate", icon: Calculator, description: "Calculate Effective Rate." },
  { category: "Additional Tools", href: "/calculators/balance-sheet-analysis", title: "Balance Sheet Analysis", icon: Calculator, description: "Calculate Balance Sheet Analysis." },
  { category: "Additional Tools", href: "/calculators/financial-ratios", title: "Financial Ratios", icon: Calculator, description: "Calculate Financial Ratios." },
  { category: "Additional Tools", href: "/calculators/currency-converter", title: "Currency Converter", icon: Calculator, description: "Calculate Currency Converter." },
];

const categories = Array.from(new Set(allCalculators.map(t => t.category)));

const CalculatorsIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    if (!query) {
      return categories.map(cat => ({
        name: cat,
        tools: allCalculators.filter(t => t.category === cat)
      }));
    }

    const filtered = allCalculators.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );

    const activeCats = Array.from(new Set(filtered.map(t => t.category)));
    
    return activeCats.map(cat => ({
      name: cat,
      tools: filtered.filter(t => t.category === cat)
    }));
  }, [searchQuery]);

  return (
    <>
      <Helmet>
        <title>All Financial Calculators | CaseConvert</title>
        <meta name="description" content="Explore our massive suite of 40+ free online financial calculators for loans, mortgages, retirement, stock investments, auto leases, and more." />
        <link rel="canonical" href="https://caseconvert.online/calculators" />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <Header />
        
        <main className="px-4 py-12">
          <div className="max-w-[1200px] mx-auto">
            {/* Hero */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading tracking-tight">
                All Financial <span className="text-gradient">Calculators</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                From basic percentage calculations to complex Black-Scholes options pricing, find the exact tool you need below.
              </p>
              
              <div className="max-w-md mx-auto relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  type="text"
                  placeholder="Search 40+ calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-white/20 dark:border-white/10 rounded-2xl shadow-sm focus-visible:ring-primary"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="space-y-16 animate-fade-in-delay-1">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-xl">No calculators found matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredCategories.map((cat) => (
                  <div key={cat.name}>
                    <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-3">
                      {cat.name}
                      <div className="h-px bg-border flex-1" />
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {cat.tools.map((tool) => (
                        <Link key={tool.href} to={tool.href}>
                          <Card className="bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-card p-5 h-full rounded-3xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <tool.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold text-base mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{tool.description}</p>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CalculatorsIndex;
