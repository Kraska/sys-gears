import { getInput } from "./helpers";
import { ExcludeModifier } from "./modifiers/ExcludeModifier";
import { IncludeModifier } from "./modifiers/IncludeModifier";
import { SortModifier } from "./modifiers/SortModifier";
import { Data, Input, Output } from "./types";

export const modify = (input: Input): Output => {
  const { data, condition } = input;

  const modifiers = [
    new IncludeModifier(condition),
    new ExcludeModifier(condition),
    new SortModifier(condition),
  ];

  const result: Data = modifiers.reduce(
    (res, modifier) => modifier.modify(res),
    data
  );

  return { result };
};

try {
  console.log(modify(getInput()));
} catch (e) {
  console.error((e as Error).message);
}
