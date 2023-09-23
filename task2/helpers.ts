import { Input } from "./types";

export const getInput = (): Input => {
  const argv2Example = "./task2/input.json";
  const path = process.argv[2];

  if (!path) {
    throw Error(
      `You need specify path to input.json! For example '${argv2Example}'`
    );
  }

  const fs = require("fs");
  const json: Input = JSON.parse(fs.readFileSync(path));

  checkInput(json);

  return json;
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
