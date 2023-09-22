import { Data } from "../types";

export interface Modifier {
  modify(data: Data): Data;
}
