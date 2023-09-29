import { ProcessArgv } from "../helpers";
import { Input } from "./types";

/**
 * Check if really json type is Input
 * @param json
 * @returns
 */
export const isInput = (json: any): json is Input => {
  const input = json as Input;
  return (
    input.distance != undefined &&
    input.distance.unit != undefined &&
    typeof input.distance.unit === "string" &&
    input.distance.value != undefined &&
    typeof input.distance.value === "number" &&
    input.convertTo != undefined &&
    typeof input.convertTo === "string"
  );
};

export const getInput = (): Input => {
  const inputExample = "{ distance: { unit: m, value: 0.5 }, convertTo: ft }";
  const input = new ProcessArgv(2, "input", inputExample).getJson();

  if (!isInput(input)) {
    throw Error(`Wrong format of input. Example: ${inputExample}`);
  }
  return input;
};
