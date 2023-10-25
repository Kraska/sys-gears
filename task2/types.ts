import { ExcludeCondition } from "./modifiers/ExcludeModifier";
import { IncludeCondition } from "./modifiers/IncludeModifier";
import { SortByCondition } from "./modifiers/SortModifier";

export type Data<ITEM> = ITEM[];

export type Condition<ITEM> = IncludeCondition<ITEM> &
  ExcludeCondition<ITEM> &
  SortByCondition<ITEM>;

export type Input<ITEM> = {
  data: Data<ITEM>;
  condition: Condition<ITEM>;
};
export type Output<ITEM> = {
  result: Data<ITEM>;
};
