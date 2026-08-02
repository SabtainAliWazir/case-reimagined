import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import WordCounter from "./pages/WordCounter";
import BinaryTranslator from "./pages/BinaryTranslator";
import MorseTranslator from "./pages/MorseTranslator";
import TextFormatter from "./pages/TextFormatter";
import TextCleaner from "./pages/TextCleaner";
import JsonFormatter from "./pages/JsonFormatter";
import PasswordGenerator from "./pages/PasswordGenerator";
import LoremIpsumGenerator from "./pages/LoremIpsumGenerator";
import Base64Encoder from "./pages/Base64Encoder";
import UrlEncoder from "./pages/UrlEncoder";
import HashGenerator from "./pages/HashGenerator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CompoundInterestCalculator from "./pages/CompoundInterestCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import RoiCalculator from "./pages/RoiCalculator";
import ZipExtractor from "./pages/ZipExtractor";
import ZipCreator from "./pages/ZipCreator";
import EpochConverter from "./pages/EpochConverter";
import ImageConverter from "./pages/ImageConverter";
import CalculatorsIndex from "./pages/CalculatorsIndex";
import TvmCalculator from "./pages/calculators/TvmCalculator";
import IrrNpvCalculator from "./pages/calculators/IrrNpvCalculator";
import BondCalculator from "./pages/calculators/BondCalculator";
import TaxEquivalentYield from "./pages/calculators/TaxEquivalentYield";
import RuleOf72 from "./pages/calculators/RuleOf72";
import CollegeSavings from "./pages/calculators/CollegeSavings";
import MutualFundFee from "./pages/calculators/MutualFundFee";
import HsaCalculator from "./pages/calculators/HsaCalculator";
import CdCalculator from "./pages/calculators/CdCalculator";
import LoanComparison from "./pages/calculators/LoanComparison";
import RefinanceCalculator from "./pages/calculators/RefinanceCalculator";
import AprCalculator from "./pages/calculators/AprCalculator";
import CommercialLoan from "./pages/calculators/CommercialLoan";
import HomeAffordability from "./pages/calculators/HomeAffordability";
import RentVsBuy from "./pages/calculators/RentVsBuy";
import DiscountPoints from "./pages/calculators/DiscountPoints";
import AdjustableRate from "./pages/calculators/AdjustableRate";
import BiWeeklyPayment from "./pages/calculators/BiWeeklyPayment";
import InterestOnly from "./pages/calculators/InterestOnly";
import RentalProperty from "./pages/calculators/RentalProperty";
import RetirementPlanner from "./pages/calculators/RetirementPlanner";
import Contribution401k from "./pages/calculators/Contribution401k";
import RetirementSavingsAnalysis from "./pages/calculators/RetirementSavingsAnalysis";
import IraVsRoth from "./pages/calculators/IraVsRoth";
import RmdCalculator from "./pages/calculators/RmdCalculator";
import SocialSecurityEstimator from "./pages/calculators/SocialSecurityEstimator";
import AnnuityCalculator from "./pages/calculators/AnnuityCalculator";
import StockReturn from "./pages/calculators/StockReturn";
import ConstantGrowth from "./pages/calculators/ConstantGrowth";
import CapmCalculator from "./pages/calculators/CapmCalculator";
import ExpectedReturn from "./pages/calculators/ExpectedReturn";
import WaccCalculator from "./pages/calculators/WaccCalculator";
import BlackScholes from "./pages/calculators/BlackScholes";
import PivotPoint from "./pages/calculators/PivotPoint";
import Fibonacci from "./pages/calculators/Fibonacci";
import DividendTax from "./pages/calculators/DividendTax";
import CreditCardPayoff from "./pages/calculators/CreditCardPayoff";
import CreditCardMinimum from "./pages/calculators/CreditCardMinimum";
import AutoLoan from "./pages/calculators/AutoLoan";
import AutoLease from "./pages/calculators/AutoLease";
import TipCalculator from "./pages/calculators/TipCalculator";
import DiscountTax from "./pages/calculators/DiscountTax";
import Percentage from "./pages/calculators/Percentage";
import DateCalculator from "./pages/calculators/DateCalculator";
import UsInflation from "./pages/calculators/UsInflation";
import MarginMarkup from "./pages/calculators/MarginMarkup";
import SalaryIncrease from "./pages/calculators/SalaryIncrease";
import PaycheckTax from "./pages/calculators/PaycheckTax";
import PaypalFee from "./pages/calculators/PaypalFee";
import StripeFee from "./pages/calculators/StripeFee";
import SquareFee from "./pages/calculators/SquareFee";
import EbayFee from "./pages/calculators/EbayFee";
import EtsyFee from "./pages/calculators/EtsyFee";
import ShopifyFee from "./pages/calculators/ShopifyFee";
import CashappFee from "./pages/calculators/CashappFee";
import VenmoFee from "./pages/calculators/VenmoFee";
import InvestmentIncome from "./pages/calculators/InvestmentIncome";
import SavingsGoal from "./pages/calculators/SavingsGoal";
import AprAdvanced from "./pages/calculators/AprAdvanced";
import LoanAnalysis from "./pages/calculators/LoanAnalysis";
import MortgageTaxSaving from "./pages/calculators/MortgageTaxSaving";
import FixedVsAdjustable from "./pages/calculators/FixedVsAdjustable";
import C401kSaveMax from "./pages/calculators/C401kSaveMax";
import RetirementIncomeAnalysis from "./pages/calculators/RetirementIncomeAnalysis";
import SocialSecurityAnalysis from "./pages/calculators/SocialSecurityAnalysis";
import SocialSecurityDistribution from "./pages/calculators/SocialSecurityDistribution";
import AssetAllocation from "./pages/calculators/AssetAllocation";
import RetirementIncome from "./pages/calculators/RetirementIncome";
import RetirementBasic from "./pages/calculators/RetirementBasic";
import NonConstantGrowth from "./pages/calculators/NonConstantGrowth";
import HoldingPeriodReturn from "./pages/calculators/HoldingPeriodReturn";
import CommoditiesFutures from "./pages/calculators/CommoditiesFutures";
import UnitConversion from "./pages/calculators/UnitConversion";
import TreasuryBill from "./pages/calculators/TreasuryBill";
import BusinessForecast from "./pages/calculators/BusinessForecast";
import FuelCalculator from "./pages/calculators/FuelCalculator";
import HourlyToSalary from "./pages/calculators/HourlyToSalary";
import NetDistribution from "./pages/calculators/NetDistribution";
import EffectiveRate from "./pages/calculators/EffectiveRate";
import BalanceSheetAnalysis from "./pages/calculators/BalanceSheetAnalysis";
import FinancialRatios from "./pages/calculators/FinancialRatios";
import CurrencyConverter from "./pages/calculators/CurrencyConverter";
import TriangleCalculator from "./pages/calculators/TriangleCalculator";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route path="/binary-translator" element={<BinaryTranslator />} />
              <Route path="/morse-translator" element={<MorseTranslator />} />
              <Route path="/calculators" element={<CalculatorsIndex />} />
              <Route path="/calculators/triangle-calculator" element={<TriangleCalculator />} />
              <Route path="/calculators/tvm-calculator" element={<TvmCalculator />} />
              <Route path="/calculators/irr-npv-calculator" element={<IrrNpvCalculator />} />
              <Route path="/calculators/bond-calculator" element={<BondCalculator />} />
              <Route path="/calculators/tax-equivalent-yield" element={<TaxEquivalentYield />} />
              <Route path="/calculators/rule-of-72" element={<RuleOf72 />} />
              <Route path="/calculators/college-savings" element={<CollegeSavings />} />
              <Route path="/calculators/mutual-fund-fee" element={<MutualFundFee />} />
              <Route path="/calculators/hsa-calculator" element={<HsaCalculator />} />
              <Route path="/calculators/cd-calculator" element={<CdCalculator />} />
              <Route path="/calculators/loan-comparison" element={<LoanComparison />} />
              <Route path="/calculators/refinance-calculator" element={<RefinanceCalculator />} />
              <Route path="/calculators/apr-calculator" element={<AprCalculator />} />
              <Route path="/calculators/commercial-loan" element={<CommercialLoan />} />
              <Route path="/calculators/home-affordability" element={<HomeAffordability />} />
              <Route path="/calculators/rent-vs-buy" element={<RentVsBuy />} />
              <Route path="/calculators/discount-points" element={<DiscountPoints />} />
              <Route path="/calculators/adjustable-rate" element={<AdjustableRate />} />
              <Route path="/calculators/bi-weekly-payment" element={<BiWeeklyPayment />} />
              <Route path="/calculators/interest-only" element={<InterestOnly />} />
              <Route path="/calculators/rental-property" element={<RentalProperty />} />
              <Route path="/calculators/retirement-planner" element={<RetirementPlanner />} />
              <Route path="/calculators/401k-contribution" element={<Contribution401k />} />
              <Route path="/calculators/retirement-savings-analysis" element={<RetirementSavingsAnalysis />} />
              <Route path="/calculators/ira-vs-roth" element={<IraVsRoth />} />
              <Route path="/calculators/rmd-calculator" element={<RmdCalculator />} />
              <Route path="/calculators/social-security-estimator" element={<SocialSecurityEstimator />} />
              <Route path="/calculators/annuity-calculator" element={<AnnuityCalculator />} />
              <Route path="/calculators/stock-return" element={<StockReturn />} />
              <Route path="/calculators/constant-growth" element={<ConstantGrowth />} />
              <Route path="/calculators/capm-calculator" element={<CapmCalculator />} />
              <Route path="/calculators/expected-return" element={<ExpectedReturn />} />
              <Route path="/calculators/wacc-calculator" element={<WaccCalculator />} />
              <Route path="/calculators/black-scholes" element={<BlackScholes />} />
              <Route path="/calculators/pivot-point" element={<PivotPoint />} />
              <Route path="/calculators/fibonacci" element={<Fibonacci />} />
              <Route path="/calculators/dividend-tax" element={<DividendTax />} />
              <Route path="/calculators/credit-card-payoff" element={<CreditCardPayoff />} />
              <Route path="/calculators/credit-card-minimum" element={<CreditCardMinimum />} />
              <Route path="/calculators/auto-loan" element={<AutoLoan />} />
              <Route path="/calculators/auto-lease" element={<AutoLease />} />
              <Route path="/calculators/tip-calculator" element={<TipCalculator />} />
              <Route path="/calculators/discount-tax" element={<DiscountTax />} />
              <Route path="/calculators/percentage" element={<Percentage />} />
              <Route path="/calculators/date-calculator" element={<DateCalculator />} />
              <Route path="/calculators/us-inflation" element={<UsInflation />} />
              <Route path="/calculators/margin-markup" element={<MarginMarkup />} />
              <Route path="/calculators/salary-increase" element={<SalaryIncrease />} />
              <Route path="/calculators/paycheck-tax" element={<PaycheckTax />} />
              <Route path="/calculators/paypal-fee" element={<PaypalFee />} />
              <Route path="/text-formatter" element={<TextFormatter />} />
              <Route path="/text-cleaner" element={<TextCleaner />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/lorem-ipsum" element={<LoremIpsumGenerator />} />
              <Route path="/base64" element={<Base64Encoder />} />
              <Route path="/url-encoder" element={<UrlEncoder />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/epoch-converter" element={<EpochConverter />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/loan-calculator" element={<LoanCalculator />} />
              <Route path="/roi-calculator" element={<RoiCalculator />} />
              <Route path="/zip-extractor" element={<ZipExtractor />} />
              <Route path="/zip-creator" element={<ZipCreator />} />
              <Route path="/image-converter" element={<ImageConverter />} />
              <Route path="/calculators/stripe-fee" element={<StripeFee />} />
              <Route path="/calculators/square-fee" element={<SquareFee />} />
              <Route path="/calculators/ebay-fee" element={<EbayFee />} />
              <Route path="/calculators/etsy-fee" element={<EtsyFee />} />
              <Route path="/calculators/shopify-fee" element={<ShopifyFee />} />
              <Route path="/calculators/cashapp-fee" element={<CashappFee />} />
              <Route path="/calculators/venmo-fee" element={<VenmoFee />} />
              <Route path="/calculators/investment-income" element={<InvestmentIncome />} />
              <Route path="/calculators/savings-goal" element={<SavingsGoal />} />
              <Route path="/calculators/apr-advanced" element={<AprAdvanced />} />
              <Route path="/calculators/loan-analysis" element={<LoanAnalysis />} />
              <Route path="/calculators/mortgage-tax-saving" element={<MortgageTaxSaving />} />
              <Route path="/calculators/fixed-vs-adjustable" element={<FixedVsAdjustable />} />
              <Route path="/calculators/401k-save-max" element={<C401kSaveMax />} />
              <Route path="/calculators/retirement-income-analysis" element={<RetirementIncomeAnalysis />} />
              <Route path="/calculators/social-security-analysis" element={<SocialSecurityAnalysis />} />
              <Route path="/calculators/social-security-distribution" element={<SocialSecurityDistribution />} />
              <Route path="/calculators/asset-allocation" element={<AssetAllocation />} />
              <Route path="/calculators/retirement-income" element={<RetirementIncome />} />
              <Route path="/calculators/retirement-basic" element={<RetirementBasic />} />
              <Route path="/calculators/non-constant-growth" element={<NonConstantGrowth />} />
              <Route path="/calculators/holding-period-return" element={<HoldingPeriodReturn />} />
              <Route path="/calculators/commodities-futures" element={<CommoditiesFutures />} />
              <Route path="/calculators/unit-conversion" element={<UnitConversion />} />
              <Route path="/calculators/treasury-bill" element={<TreasuryBill />} />
              <Route path="/calculators/business-forecast" element={<BusinessForecast />} />
              <Route path="/calculators/fuel-calculator" element={<FuelCalculator />} />
              <Route path="/calculators/hourly-to-salary" element={<HourlyToSalary />} />
              <Route path="/calculators/net-distribution" element={<NetDistribution />} />
              <Route path="/calculators/effective-rate" element={<EffectiveRate />} />
              <Route path="/calculators/balance-sheet-analysis" element={<BalanceSheetAnalysis />} />
              <Route path="/calculators/financial-ratios" element={<FinancialRatios />} />
              <Route path="/calculators/currency-converter" element={<CurrencyConverter />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
