import { convert, Rules } from "./converter2";
import { getInput } from "./helpers";

const rules: Rules = require("./rules2.json");

try {
  const res = convert(getInput(), rules);
  console.log(res);
} catch (e) {
  console.error((e as Error).message);
}
