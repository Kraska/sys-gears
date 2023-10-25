import { ProcessArgv } from "../helpers";
import { modify } from "./modify";
import { Input } from "./types";

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

/**
 * Check if really json type is Input. If isn't then throw Error.
 * @param json
 */
function checkInput<INPUT>(json: {}) {
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
}
