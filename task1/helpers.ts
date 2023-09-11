import { Input } from "./types";
import { toJson } from "really-relaxed-json";

export const getInput = () => {
  const argv2Example = "{ distance: { unit: m, value: 0.5 }, convertTo: ft }";

  if (!process.argv[2]) {
    throw Error(
      `You need specify second argument! For example '${argv2Example}'`
    );
  }
  const json: Input = JSON.parse(toJson(process.argv[2]));

  if (!isInput(json)) {
    throw Error(`Wrong format of second argument. Example: ${argv2Example}`);
  }

  return json;
};

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
