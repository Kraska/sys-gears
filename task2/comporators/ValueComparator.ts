export interface ValueComparator {
  compare<VALUE>(value1: VALUE, value2: VALUE): number;
}
