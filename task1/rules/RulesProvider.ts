import { RawRule } from "./RawRule";
import {
  overwriteRepeatedRulesCombineStrategy,
  RulesCombineStrategy,
} from "./RulesCombineStrategy";
import {
  overwriteRepitedAbreviationRulesNormalizer,
  RulesNormalizer,
} from "./RulesNormalizer";

export class RulesProvider {
  private rulesNormalizer: RulesNormalizer;
  private combileStrategy: RulesCombineStrategy;

  constructor(
    rulesNormalizer: RulesNormalizer = overwriteRepitedAbreviationRulesNormalizer,
    combileStrategy: RulesCombineStrategy = overwriteRepeatedRulesCombineStrategy
  ) {
    this.combileStrategy = combileStrategy;
    this.rulesNormalizer = rulesNormalizer;
  }

  provide(commonRules: RawRule[], additionalRules: RawRule[]) {
    return this.combileStrategy.combine(
      this.rulesNormalizer.normalize(commonRules),
      this.rulesNormalizer.normalize(additionalRules)
    );
  }
}
