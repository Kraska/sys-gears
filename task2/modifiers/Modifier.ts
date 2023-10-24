import { Data } from "../types";

export interface Modifier<ITEM> {
  modify(data: Data<ITEM>): Data<ITEM>;
}
