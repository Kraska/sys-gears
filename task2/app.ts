export type Condition = {
  exclude?: {}[];
  include?: {}[];
  sortBy?: string[];
};

type Data = {}[];

export type Input = {
  data: Data;
  condition: Condition;
};

export type Output = {
  result: Data;
};

export const modify = (input: Input): Output => {
  const { data, condition } = input;
  let result = filter(data, condition.include, condition.exclude);
  result = sort(result, condition.sortBy);
  return { result };
};

const filter = (data: Data, include: {}[], exclude: {}[]): Data => {
  const filteredData = data
    .filter((obj) => isIncluded(obj, include))
    .filter((obj) => !isExcluded(obj, exclude));
  return filteredData;
};

const isIncluded = (obj: {}, include: {}[]): boolean => {
  return !include || !!include.find((sdubObj) => partialContains(obj, sdubObj));
};

const isExcluded = (obj: {}, exclude: {}[]): boolean => {
  return exclude && !!exclude.find((sdubObj) => partialContains(obj, sdubObj));
};

const sort = (data: Data, sortBy: string[]): Data => {
  if (!sortBy) {
    return data.sort((item1, item2) =>
      JSON.stringify(item1).localeCompare(JSON.stringify(item2))
    );
  }

  let res = data;
  for (const field of sortBy) {
    res = res.sort((item1, item2) => compare(item1[field], item2[field]));
  }
  return res;
};

const compare = (value1: any, value2: any): number => {
  // todo cases when types of value1 and value2 is differnt
  if (typeof value1 == "number") {
    return value1 - value2;
  } else if (typeof value1 == "string") {
    return value1.localeCompare(value2);
  } else if (value1 instanceof Object) {
    return JSON.stringify(value1).localeCompare(JSON.stringify(value2));
  } else {
    throw Error(`Unexpected type for value "${value1}"`);
  }
};

const partialContains = (object: {}, subObject: {}) => {
  const subProps = Object.getOwnPropertyNames(subObject);

  const isContain = !subProps.find((subProp) => {
    const isContain = object[subProp] === subObject[subProp];
    return !isContain;
  });

  return isContain;
};
