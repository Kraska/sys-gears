import { FilterModifier } from "./FilterModifier";
import { Data } from "../types";

export type IncludeCondition<ITEM> = {
  include?: Partial<ITEM>[];
};

export class IncludeModifier<ITEM> extends FilterModifier<ITEM> {
  include: Partial<ITEM>[] | null;

  constructor(condition: IncludeCondition<ITEM>) {
    super();
    this.include = condition.include;
  }

  modify(data: Data<ITEM>): Data<ITEM> {
    return this.include
      ? data.filter((obj) => this.isIncluded(obj, this.include))
      : data;
  }

  private isIncluded(obj: ITEM, include: Partial<ITEM>[]): boolean {
    return !!include.find((sdubObj) => this.partialContains(obj, sdubObj));
  }
}
