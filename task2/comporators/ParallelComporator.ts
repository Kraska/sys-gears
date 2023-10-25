import { ascComporator } from "./ASCValueComparator";
import { ValueComparator } from "./ValueComparator";
import { Comparator } from "./Comporator";

export class ParallelComporator<ITEM> implements Comparator<ITEM> {
  private valueComporator: ValueComparator;

  constructor(valueComporator: ValueComparator) {
    this.valueComporator = valueComporator;
  }

  compare: (
    comparedFields: (keyof ITEM)[] | undefined,
    item1: ITEM,
    item2: ITEM
  ) => number = (comparedFields, item1, item2) => {
    if (!comparedFields) {
      return this.valueComporator.compare(item1, item2);
    }

    return comparedFields.reduce((previousFieldCompareResult, field) => {
      // do comparing by `field` only if comparison by prev field return `0`
      return (
        previousFieldCompareResult ||
        this.valueComporator.compare(item1[field], item2[field])
      );
    }, 0);
  };
}

export const ascParallelComporator = new ParallelComporator(ascComporator);
