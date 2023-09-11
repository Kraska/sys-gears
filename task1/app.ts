import { convert, normalizeRules, Rule } from "./converter";
import { getInput } from "./helpers";

const rules: Rule[] = require("./rules.json");

try {
  const normalizedRules = normalizeRules(rules);
  const res = convert(getInput(), normalizedRules);
  console.log(res);
} catch (e) {
  console.error((e as Error).message);
}
