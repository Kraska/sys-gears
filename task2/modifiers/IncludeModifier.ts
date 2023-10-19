import { FilterModifier } from "./FilterModifier";
import { Data } from "../types";

export type IncludeCondition = {
  include?: {}[];
};

export class IncludeModifier extends FilterModifier {
  include: {}[] | null;

  constructor(condition: IncludeCondition) {
    super();
    this.include = condition.include;
  }

  modify(data: Data): Data {
    return this.include
      ? data.filter((obj) => this.isIncluded(obj, this.include))
      : data;
  }

  private isIncluded(obj: {}, include: {}[]): boolean {
    return !!include.find((sdubObj) => this.partialContains(obj, sdubObj));
  }
}
