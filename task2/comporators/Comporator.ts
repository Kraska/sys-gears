export interface Comporator {
  compare<VALUE>(value1: VALUE, value2: VALUE): number;
}
