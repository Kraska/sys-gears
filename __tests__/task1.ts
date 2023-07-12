import { convert, normalizeRules, Rule } from "../task1/converter";

const rules: Rule[] = [
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
  {
    unit: "km",
    abbreviation: ["km"],
    siEquivalent: { unit: "m", value: 1000 },
  },
  {
    unit: "yard",
    abbreviation: ["yd"],
    siEquivalent: { unit: "m", value: 0.9144 },
  },
];

const normalizedRules = normalizeRules(rules);
console.log("normalizedRules = ", normalizedRules);

describe("Task1. Converter", () => {
  test("0.5 m => 1.64 ft", () => {
    const json = { distance: { unit: "m", value: 0.5 }, convertTo: "ft" };
    const res = convert(json, normalizedRules);

    expect(res).toEqual({ unit: "ft", value: 1.64 });
  });

  test("500 mm => 1.64 ft", () => {
    const json = { distance: { unit: "mm", value: 500 }, convertTo: "ft" };
    const res = convert(json, normalizedRules);

    expect(res).toEqual({ unit: "ft", value: 1.64 });
  });

  test("1 km => 3280.84 ft", () => {
    const json = { distance: { unit: "km", value: 1 }, convertTo: "ft" };
    const res = convert(json, normalizedRules);

    expect(res).toEqual({ unit: "ft", value: 3280.84 });
  });

  test("1 m => 1.09 yd", () => {
    const json = { distance: { unit: "m", value: 1 }, convertTo: "yd" };
    const res = convert(json, normalizedRules);

    expect(res).toEqual({ unit: "yd", value: 1.09 });
  });

  test("1 yd => 914.4 mm", () => {
    const json = { distance: { unit: "yd", value: 1 }, convertTo: "mm" };
    const res = convert(json, normalizedRules);

    expect(res).toEqual({ unit: "mm", value: 914.4 });
  });
});
