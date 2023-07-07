import { convert, normalizeRules, Rule } from "../converter";

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
];

describe("Task1. Converter", () => {
  // beforeEach(() => {});

  test("0.5m => 1.64ft", () => {
    const json = { distance: { unit: "m", value: 0.5 }, convertTo: "ft" };
    const res = convert(json, normalizeRules(rules));

    expect(res).toEqual({ unit: "ft", value: 1.64 });
  });
});
