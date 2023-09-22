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

const input: Input = {
  data: [
    { user: "mike@mail.com", rating: 20, disabled: false },
    { user: "greg@mail.com", rating: 14, disabled: false },
    { user: "john@mail.com", rating: 25, disabled: true },
  ],
  condition: { exclude: [{ disabled: true }], sortBy: ["rating"] },
};

console.log(modify(input));
