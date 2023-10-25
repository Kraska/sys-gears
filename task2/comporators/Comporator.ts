export interface Comparator<ITEM extends Record<string, any>> {
  compare(
    comparedFields: (keyof ITEM)[] | undefined,
    item1: ITEM,
    item2: ITEM
  ): number;
}
