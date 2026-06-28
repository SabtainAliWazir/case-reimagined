import { financeCalculators } from "./finance";
import { loanCalculators } from "./loan";
import { retirementCalculators } from "./retirement";
import { stockCalculators } from "./stock";
import { feeCalculators } from "./fees";
import { miscCalculators } from "./misc";
import { CalculatorConfig } from "./types";

import { missingCalculators } from "./fncalculator_missing";

export const allCalculatorConfigs: Record<string, CalculatorConfig> = {
  ...financeCalculators,
  ...loanCalculators,
  ...retirementCalculators,
  ...stockCalculators,
  ...feeCalculators,
  ...miscCalculators,
  ...missingCalculators
};

export type { CalculatorConfig, CalculatorInput, CalculatorResult } from "./types";
