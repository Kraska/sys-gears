import { FilterModifier } from "./FilterModifier";
import { Data } from "../types";

export type ExcludeCondition<ITEM> = {
  exclude?: Partial<ITEM>[];
};

export class ExcludeModifier<ITEM> extends FilterModifier<ITEM> {
  exclude: Partial<ITEM>[] | null;

  constructor(condition: ExcludeCondition<ITEM>) {
    super();
    this.exclude = condition.exclude;
  }

  modify(data: Data<ITEM>): Data<ITEM> {
    return this.exclude
      ? data.filter((obj) => this.isExcluded(obj, this.exclude))
      : data;
  }

  private isExcluded(item: ITEM, exclude: Partial<ITEM>[]): boolean {
    return !exclude.find((sdubItem) => this.partialContains(item, sdubItem));
  }
}
