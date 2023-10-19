import { ProcessArgv } from "../helpers";
import { ExcludeCondition, ExcludeModifier } from "./modifiers/ExcludeModifier";
import { IncludeCondition, IncludeModifier } from "./modifiers/IncludeModifier";
import { SortByCondition, SortModifier } from "./modifiers/SortModifier";
import { Data, Output } from "./types";

export type Condition = IncludeCondition & ExcludeCondition & SortByCondition;

export type Input = {
  data: Data;
  condition: Condition;
};

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

/**
 * Check if really json type is Input. If isn't then throw Error.
 * @param json
 */
const checkInput = (json: any) => {
  const input = json as Input;

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

try {
  const processArgv = new ProcessArgv(
    2,
    "path to input.json",
    "./task2/input.json"
  );
  const json = processArgv.getJsonFromFile();
  checkInput(json);
  console.log(modify(json as Input));
} catch (e) {
  console.error((e as Error).message);
}
