import { Convertor } from "../task1/Convertor";
import { RawRule } from "../task1/rules/RawRule";
import { RulesProvider } from "../task1/rules/RulesProvider";

const commonRules: RawRule[] = [
  {
    unit: "meter",
    abbreviation: ["m"],
    inMillimeters: 1000,
  },
  {
    unit: "inch",
    abbreviation: ["in", "'"],
    inMillimeters: 25.4,
  },
  {
    unit: "foot",
    abbreviation: ["ft", '"'],
    inMillimeters: 304.8,
  },
];

const additionalRules = [
  {
    unit: "km",
    abbreviation: ["km"],
    inMillimeters: 1000000,
  },
  {
    unit: "yard",
    abbreviation: ["yd"],
    inMillimeters: 914.4,
  },
];

const rules = new RulesProvider().provide(commonRules, additionalRules);
const convertor = new Convertor(rules);

describe("Task1. Converter", () => {
  test("0.5 m => 1.64 ft", () => {
    const json = { distance: { unit: "m", value: 0.5 }, convertTo: "ft" };
    const res = convertor.convert(json);

    expect(res).toEqual({ unit: "ft", value: 1.64 });
  });

  test("500 mm => 1.64 ft", () => {
    const json = { distance: { unit: "mm", value: 500 }, convertTo: "ft" };
    const res = convertor.convert(json);

    expect(res).toEqual({ unit: "ft", value: 1.64 });
  });

  test("1 km => 3280.84 ft", () => {
    const json = { distance: { unit: "km", value: 1 }, convertTo: "ft" };
    const res = convertor.convert(json);

    expect(res).toEqual({ unit: "ft", value: 3280.84 });
  });

  test("1 m => 1.09 yd", () => {
    const json = { distance: { unit: "m", value: 1 }, convertTo: "yd" };
    const res = convertor.convert(json);

    expect(res).toEqual({ unit: "yd", value: 1.09 });
  });

  test("1 yd => 914.4 mm", () => {
    const json = { distance: { unit: "yd", value: 1 }, convertTo: "mm" };
    const res = convertor.convert(json);

    expect(res).toEqual({ unit: "mm", value: 914.4 });
  });
});
