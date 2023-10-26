import { Rules } from "./Rules";
import { RawRule } from "./RawRule";

export interface RulesNormalizer {
  normalize(rules: RawRule[]): Rules;
}

class OverwriteRepitedAbreviationRulesNormalizer implements RulesNormalizer {
  normalize = (rules: RawRule[]): Rules => {
    return rules.reduce(
      (result, rule) => ({ ...result, ...this.normalizeRule(rule) }),
      { mm: 1 }
    );
  };

  private normalizeRule = (rule: RawRule): Rules => {
    const { abbreviation, inMillimeters } = rule;
    return abbreviation.reduce(
      (rules, name) => ({ ...rules, [name]: inMillimeters }),
      {}
    );
  };
}

export const overwriteRepitedAbreviationRulesNormalizer =
  new OverwriteRepitedAbreviationRulesNormalizer();
