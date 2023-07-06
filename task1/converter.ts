type Input = {
  distance: {
    unit: string;
    value: number;
  };
  convertTo: string;
};

type Output = {
  unit: string;
  value: number;
};

type Rule = {
  unit: string;
  abbreviation: string[];
  siEquivalent: {
    unit: "m" | "mm";
    value: number;
  };
};

type Rules = {
  [abbreviation: string]: number;
};

const convert = (json: Input, rulesList: Rule[]): Output => {
  const rules: Rules = rulesList.reduce(
    (accum, { abbreviation, siEquivalent }) => {
      abbreviation.forEach((name) => {
        const { value, unit } = siEquivalent;
        accum[name] = unit == "m" ? value * 1000 : value;
      });
      return accum;
    },
    { m: 1000 }
  );

  const { distance, convertTo } = json;
  const { unit, value } = distance;

  const convertedValue = (value * rules[unit]) / rules[convertTo];

  return {
    unit: convertTo,
    value: Math.round(convertedValue * 100) / 100,
  };
};

const rulesList: Rule[] = [
  {
    unit: "inch",
    abbreviation: ["in", "'"],
    siEquivalent: { unit: "mm", value: 25.4 },
  },
  {
    unit: "foot",
    abbreviation: ["ft", '"'],
    siEquivalent: { unit: "mm", value: 304.8 },
  },
];

const json = { distance: { unit: "m", value: 0.5 }, convertTo: "ft" };

const res = convert(json, rulesList);

console.log(res);
