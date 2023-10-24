import { ProcessArgv } from "../helpers";
import { ExcludeCondition, ExcludeModifier } from "./modifiers/ExcludeModifier";
import { IncludeCondition, IncludeModifier } from "./modifiers/IncludeModifier";
import { SortByCondition, SortModifier } from "./modifiers/SortModifier";
import { Data, Output } from "./types";

export type Condition<ITEM> = IncludeCondition<ITEM> &
  ExcludeCondition<ITEM> &
  SortByCondition;

export type Input<ITEM> = {
  data: Data<ITEM>;
  condition: Condition<ITEM>;
};

export const modify = <ITEM>(input: Input<ITEM>): Output<ITEM> => {
  const { data, condition } = input;

  const modifiers = [
    new IncludeModifier<ITEM>(condition),
    new ExcludeModifier<ITEM>(condition),
    new SortModifier<ITEM>({ condition }),
  ];

  const result: Data<ITEM> = modifiers.reduce(
    (res, modifier) => modifier.modify(res),
    data
  );

  return { result };
};

/**
 * Check if really json type is Input. If isn't then throw Error.
 * @param json
 */
const checkInput = <INPUT>(json: {}) => {
  const input = json as Input<INPUT>;

  if (input.data == undefined) {
    throw Error('Input json should contain field "data"');
  }
  if (input.condition == undefined) {
    throw Error('Input json should contain field "condition"');
  }
  if (input.data.length == undefined) {
    throw Error('Wrong format of input json. Field "data" should be an array.');
  }
  if (typeof input.condition != "object") {
    throw Error(
      'Wrong format of input json. Field "condition" should be an object.'
    );
  }
};

type User = {
  user: string;
  rating: number;
  disabled: boolean;
};

try {
  const processArgv = new ProcessArgv<Input<User>>(
    2,
    "path to input.json",
    "./task2/input.json"
  );
  const json: Input<User> = processArgv.getJsonFromFile();
  checkInput(json);
  console.log(modify(json as Input<User>));
} catch (e) {
  console.error((e as Error).message);
}
