import { Modifier } from "./Modifier";
import { Data } from "../types";
import { Comparator } from "../comporators/Comporator";
import { ascParallelComporator } from "../comporators/ParallelComporator";

export type SortByCondition<ITEM> = {
  sortBy?: (keyof ITEM)[];
};

export class SortModifier<ITEM> implements Modifier<ITEM> {
  sortBy: (keyof ITEM)[] | undefined;
  comporator?: Comparator<ITEM>;

  constructor(
    condition: SortByCondition<ITEM>,
    comporator: Comparator<ITEM> = ascParallelComporator
  ) {
    this.sortBy = condition.sortBy;
    this.comporator = comporator;
  }

  modify(data: Data<ITEM>): Data<ITEM> {
    const getCompareFn = (item1: ITEM, item2: ITEM) =>
      this.comporator.compare(this.sortBy, item1, item2);

    return data.sort(getCompareFn);
  }
}
