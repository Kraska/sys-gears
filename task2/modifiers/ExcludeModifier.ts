import { FilterModifier } from "./FilterModifier";
import { Data, Condition } from "../types";

export class ExcludeModifier extends FilterModifier {
  exclude: {}[] | null;

  constructor(condition: Condition) {
    super();
    this.exclude = condition.exclude;
  }

  modify(data: Data): Data {
    return this.exclude
      ? data.filter((obj) => this.isExcluded(obj, this.exclude))
      : data;
  }

  private isExcluded(obj: {}, exclude: {}[]): boolean {
    return !exclude.find((sdubObj) => this.partialContains(obj, sdubObj));
  }
}
