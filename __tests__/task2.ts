import { modify, Input } from "../task2/app";

describe("Task2. Filter & Sort", () => {
  test("Filter by include, sort by email", () => {
    const input: Input = {
      data: [
        { name: "John", email: "john2@mail.com" },
        { name: "John", email: "john1@mail.com" },
        { name: "Jane", email: "jane@mail.com" },
      ],
      condition: { include: [{ name: "John" }], sortBy: ["email"] },
    };

    const expectedResult = {
      result: [
        { name: "John", email: "john1@mail.com" },
        { name: "John", email: "john2@mail.com" },
      ],
    };

    expect(modify(input)).toEqual(expectedResult);
  });

  test("Filter by exclude, sort by rating", () => {
    const input: Input = {
      data: [
        { user: "mike@mail.com", rating: 20, disabled: false },
        { user: "greg@mail.com", rating: 14, disabled: false },
        { user: "john@mail.com", rating: 25, disabled: true },
      ],
      condition: { exclude: [{ disabled: true }], sortBy: ["rating"] },
    };

    const expectedResult = {
      result: [
        { user: "greg@mail.com", rating: 14, disabled: false },
        { user: "mike@mail.com", rating: 20, disabled: false },
      ],
    };

    expect(modify(input)).toEqual(expectedResult);
  });
});
