import {
  calculateAsteroidCoordinates,
  calculateR1,
  calculateR2,
  calculateR3,
} from "../task3/app";

describe("Task3. ", () => {
  test("Case1", () => {
    const coordinates = { x: 10, y: 10, z: 10 };

    const calculatedCoordinates = calculateAsteroidCoordinates(
      calculateR1(coordinates),
      calculateR2(coordinates),
      calculateR3(coordinates)
    );

    expect(calculatedCoordinates).toEqual(coordinates);
  });

  test("Case2", () => {
    const coordinates = { x: 0, y: 10, z: 10 };

    const calculatedCoordinates = calculateAsteroidCoordinates(
      calculateR1(coordinates),
      calculateR2(coordinates),
      calculateR3(coordinates)
    );

    expect(calculatedCoordinates).toEqual(coordinates);
  });

  test("Case1", () => {
    const coordinates = { x: 100, y: 0, z: 0 };

    const calculatedCoordinates = calculateAsteroidCoordinates(
      calculateR1(coordinates),
      calculateR2(coordinates),
      calculateR3(coordinates)
    );

    expect(calculatedCoordinates).toEqual(coordinates);
  });
});
