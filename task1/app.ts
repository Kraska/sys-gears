import { getInput } from "./helper";
import { convert, normalizeRules, Rule } from "./converter";

const rules: Rule[] = require("./rules.json");

try {
  const normalizedRules = normalizeRules(rules);
  const res = convert(getInput(), normalizedRules);
  console.log(res);
} catch (e) {
  console.error((e as Error).message);
}
