import { Modifier } from "./Modifier";
import { Data } from "../types";
import { Comporator } from "../comporators/Comporator";
import { ascComporator } from "../comporators/ASCComporator";

export type SortByCondition = {
  sortBy?: string[];
};

export class SortModifier<ITEM> implements Modifier<ITEM> {
  sortBy: string[] | null;
  comporator: Comporator;

  constructor({
    condition,
    comporator = ascComporator,
  }: {
    condition: SortByCondition;
    comporator?: Comporator;
  }) {
    this.sortBy = condition.sortBy;
    this.comporator = comporator;
  }

  modify(data: Data<ITEM>): Data<ITEM> {
    if (!this.sortBy) {
      return data.sort((item1, item2) =>
        JSON.stringify(item1).localeCompare(JSON.stringify(item2))
      );
    }

    let res = data;
    for (const field of this.sortBy) {
      res = res.sort((item1, item2) =>
        this.comporator.compare(item1[field], item2[field])
      );
    }
    return res;
  }
}
