import { Rules } from "./rules/Rules";
import { Input, Output } from "./types";

export class Convertor {
  private rules: Rules;

  constructor(rules: Rules) {
    this.rules = rules; //this.normalizeRules(rules);
  }

  convert = (json: Input): Output => {
    const { distance, convertTo } = json;
    const { unit, value } = distance;

    const convertedValue = (value * this.rules[unit]) / this.rules[convertTo];

    return {
      unit: convertTo,
      value: this.round(convertedValue),
    };
  };

  private round = (num: number) => {
    return Math.round(num * 100) / 100;
  };
}
