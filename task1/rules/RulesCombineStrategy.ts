import { Rules } from "./Rules";

export interface RulesCombineStrategy {
  combine(commonRules: Rules, additionalRules: Rules): Rules;
}

class OverwriteRepeatedRulesCombineStrategy implements RulesCombineStrategy {
  combine(commonRules: Rules, additionalRules: Rules): Rules {
    return { ...commonRules, ...additionalRules };
  }
}

class DoNotOverwriteRepeatedRulesCombineStrategy
  implements RulesCombineStrategy
{
  combine(commonRules: Rules, additionalRules: Rules): Rules {
    return { ...additionalRules, ...commonRules };
  }
}

class OnlyAdditionalRulesCombineStrategy implements RulesCombineStrategy {
  combine(commonRules: Rules, additionalRules: Rules): Rules {
    return additionalRules;
  }
}

export const overwriteRepeatedRulesCombineStrategy =
  new OverwriteRepeatedRulesCombineStrategy();

export const doNotOverwriteRepeatedRulesCombineStrategy =
  new DoNotOverwriteRepeatedRulesCombineStrategy();

export const onlyAdditionalRulesCombineStrategy =
  new OnlyAdditionalRulesCombineStrategy();
