export type Condition = {
  exclude?: {}[];
  include?: {}[];
  sortBy?: string[];
};
export type Data = {}[];

export type Input = {
  data: Data;
  condition: Condition;
};

export type Output = {
  result: Data;
};
