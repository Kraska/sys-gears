import { Input, Output } from "./types";

export type Rules = {
  [name: string]: {
    unit: string;
    value: number;
  };
};

export const convert = (json: Input, rules: Rules): Output => {
  const { distance, convertTo } = json;
  let { unit, value } = distance;

  const needUnits = [convertTo, rules[convertTo].unit];

  while (!needUnits.includes(unit)) {
    const rule = rules[unit];
    value = value * rule.value;
    unit = rule.unit;
  }

  if (unit === rules[convertTo].unit) {
    value = value / rules[convertTo].value;
    unit = convertTo;
  }

  return { unit, value: Math.round(value * 100) / 100 };
};
