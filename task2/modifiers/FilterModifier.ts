import { Modifier } from "./Modifier";
import { Data } from "../types";

export abstract class FilterModifier implements Modifier {
  abstract modify(data: Data): Data;

  partialContains(object: {}, subObject: {}) {
    const subProps = Object.getOwnPropertyNames(subObject);

    const isContain = !subProps.find((subProp) => {
      const isContain = object[subProp] === subObject[subProp];
      return !isContain;
    });

    return isContain;
  }
}
