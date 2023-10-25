import { modify, Input } from "../task2/modify";

describe("Task2. Filter & Sort", () => {
  test("Filter by include, sort by email", () => {
    type User = {
      name: string;
      email: string;
    };

    const input: Input<User> = {
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
    type User = {
      user: string;
      rating: number;
      disabled: boolean;
    };

    const input: Input<User> = {
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

  test("Parallel sorting", () => {
    type User = {
      user: string;
      rating: number;
      comments: number;
    };

    const input: Input<User> = {
      data: [
        { user: "user1@mail.com", rating: 20, comments: 5 },
        { user: "user2@mail.com", rating: 20, comments: 1 },
        { user: "user3@mail.com", rating: 10, comments: 4 },
      ],
      condition: { sortBy: ["rating", "comments"] },
    };

    const expectedResult = {
      result: [
        { user: "user3@mail.com", rating: 10, comments: 4 },
        { user: "user2@mail.com", rating: 20, comments: 1 },
        { user: "user1@mail.com", rating: 20, comments: 5 },
      ],
    };

    expect(modify(input)).toEqual(expectedResult);
  });
});
