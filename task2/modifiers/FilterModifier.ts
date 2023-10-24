import { Modifier } from "./Modifier";
import { Data } from "../types";

export abstract class FilterModifier<ITEM> implements Modifier<ITEM> {
  abstract modify(data: Data<ITEM>): Data<ITEM>;

  partialContains(item: ITEM, subItem: Partial<ITEM>) {
    const subProps = Object.getOwnPropertyNames(subItem);

    const isContain = !subProps.find((subProp) => {
      const isContain = item[subProp] === subItem[subProp];
      return !isContain;
    });

    return isContain;
  }
}
