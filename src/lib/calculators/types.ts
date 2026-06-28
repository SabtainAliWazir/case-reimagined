export type CalculatorInput = {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percent' | 'years';
  defaultValue: number;
  step?: number;
  min?: number;
  max?: number;
};

export type CalculatorResult = {
  label: string;
  value: string | number;
  highlight?: boolean;
};

export type CalculatorConfig = {
  title: string;
  description: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, number>) => CalculatorResult[];
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(val);
};

export const formatPercent = (val: number) => {
  return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(val / 100);
};

export const formatNumber = (val: number) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(val);
};
