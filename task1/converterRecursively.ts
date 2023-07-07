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

type Rules = {
  [name: string]: {
    unit: string;
    value: number;
  };
};

const convertRecursively = (json: Input, rules: Rules): Output => {
  const { distance, convertTo } = json;
  const { unit, value } = distance;

  const rule = rules[unit];
  console.log(value, unit, rule);
  const newValue = value / rule.value;

  if (rule.unit != convertTo) {
    const newJson = {
      distance: {
        value: newValue,
        unit: rule.unit,
      },
      convertTo,
    };
    return convertRecursively(newJson, rules);
  } else {
    return {
      unit: convertTo,
      value: Math.round(newValue * 100) / 100,
    };
  }
};

const rules: Rules = {
  in: { unit: "mm", value: 25.4 },
  ft: { unit: "mm", value: 304.8 },
  m: { unit: "mm", value: 1000 },
};

const json2 = { distance: { unit: "m", value: 0.5 }, convertTo: "ft" };

const result = convertRecursively(json2, rules);

console.log(result);
