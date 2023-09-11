import { Input, Output } from "./types";

export type Rule = {
  unit: string;
  abbreviation: string[];
  siEquivalent: {
    unit: "m" | "mm";
    value: number;
  };
};

export type Rules = {
  [abbreviation: string]: number;
};

export const normalizeRules = (rules: Rule[]): Rules => {
  return rules.reduce(
    (accum, { abbreviation, siEquivalent }) => {
      abbreviation.forEach((name) => {
        const { value, unit } = siEquivalent;
        accum[name] = unit == "m" ? value * 1000 : value;
      });
      return accum;
    },
    { m: 1000, mm: 1 }
  );
};

export const convert = (json: Input, rules: Rules): Output => {
  const { distance, convertTo } = json;
  const { unit, value } = distance;

  const convertedValue = (value * rules[unit]) / rules[convertTo];

  return {
    unit: convertTo,
    value: Math.round(convertedValue * 100) / 100,
  };
};
