import { Modifier } from "./Modifier";
import { Data, Condition } from "../types";

export class SortModifier implements Modifier {
  sortBy: string[] | null;

  constructor(condition: Condition) {
    this.sortBy = condition.sortBy;
  }

  modify(data: Data): Data {
    if (!this.sortBy) {
      return data.sort((item1, item2) =>
        JSON.stringify(item1).localeCompare(JSON.stringify(item2))
      );
    }

    let res = data;
    for (const field of this.sortBy) {
      res = res.sort((item1, item2) =>
        this.compare(item1[field], item2[field])
      );
    }
    return res;
  }

  private compare(value1: any, value2: any): number {
    // todo cases when types of value1 and value2 is differnt
    if (typeof value1 == "number") {
      return value1 - value2;
    } else if (typeof value1 == "string") {
      return value1.localeCompare(value2);
    } else if (value1 instanceof Object) {
      return JSON.stringify(value1).localeCompare(JSON.stringify(value2));
    } else {
      throw Error(`Unexpected type for value "${value1}"`);
    }
  }
}
