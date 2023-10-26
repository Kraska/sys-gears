import { getInput } from "./helper";
import { Convertor } from "./Convertor";
import { RawRule } from "./rules/RawRule";
import { RulesProvider } from "./rules/RulesProvider";

const commonRules: RawRule[] = require("./data/rules.json");
const additionalRules: RawRule[] = require("./data/addidtionalRules.json");

try {
  const rules = new RulesProvider().provide(commonRules, additionalRules);
  const res = new Convertor(rules).convert(getInput());
  console.log(res);
} catch (e) {
  console.error((e as Error).message);
}
