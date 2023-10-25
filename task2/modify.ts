import { ExcludeModifier } from "./modifiers/ExcludeModifier";
import { IncludeModifier } from "./modifiers/IncludeModifier";
import { SortModifier } from "./modifiers/SortModifier";
import { Data, Input, Output } from "./types";

export const modify = <ITEM>(input: Input<ITEM>): Output<ITEM> => {
  const { data, condition } = input;

  const modifiers = [
    new IncludeModifier<ITEM>(condition),
    new ExcludeModifier<ITEM>(condition),
    new SortModifier<ITEM>(condition),
  ];

  const result: Data<ITEM> = modifiers.reduce(
    (res, modifier) => modifier.modify(res),
    data
  );

  return { result };
};
