export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type Result = {
  result: {
    lcation: Coordinates;
    probes: {
      count: number;
      coordinates: Coordinates[];
    };
  };
};

const toString = (coordinates: Coordinates): string => {
  const { x, y, z } = coordinates;
  return `(${x}, ${y}, ${z})`;
};

export const generateCoordinates = (
  maxX: number = 100,
  maxY: number = 100,
  maxZ: number = 100
): Coordinates => {
  return {
    x: generateNum(maxX),
    y: generateNum(maxY),
    z: generateNum(maxZ),
  };
};

const generateNum = (max: number) => {
  return Math.round(Math.random() * max);
};

/**
 * R1 - distance from 1 zond (with coordinates (0, 0, 0))
 */
export const calculateR1 = (asteroidCoordinates: Coordinates): number => {
  const { x, y, z } = asteroidCoordinates;
  return Math.sqrt(x * x + y * y + z * z);
};

/**
 * R2 - distance from 2 zond (with coordinates (0, 1000, 0))
 */
export const calculateR2 = (asteroidCoordinates: Coordinates): number => {
  const { x, y, z } = asteroidCoordinates;
  return Math.sqrt(x * x + (100 - y) * (100 - y) + z * z);
};

/**
 * R3 - distance from 3 zond (with coordinates (1000, 0, 0))
 */
export const calculateR3 = (asteroidCoordinates: Coordinates): number => {
  const { x, y, z } = asteroidCoordinates;
  return Math.sqrt((100 - x) * (100 - x) + y * y + z * z);
};

export const calculateAsteroidCoordinates = (
  r1: number,
  r2: number,
  r3: number
): Coordinates => {
  const x = Math.round((1 / 200) * (r1 * r1 - r3 * r3 + 10000));
  const y = Math.round((1 / 200) * (r1 * r1 - r2 * r2 + 10000));
  const z = Math.round(Math.sqrt(r1 * r1 - y * y - x * x));

  return { x, y, z };
};

const run = () => {
  const asteroidCoordinates: Coordinates = generateCoordinates();
  {
    console.log(
      `Random asteroid coordinates: ${toString(asteroidCoordinates)}`
    );
  }
  const r1 = calculateR1(asteroidCoordinates);
  console.log(`Distance from zond1 (0, 0, 0) to asteroid: ${r1}`);

  const r2 = calculateR2(asteroidCoordinates);
  console.log(`Distance from zond2 (0, 100, 0) to asteroid: ${r2}`);

  const r3 = calculateR3(asteroidCoordinates);
  console.log(`Distance from zond3 (100, 0, 0) to asteroid: ${r3}`);

  const coordinates = calculateAsteroidCoordinates(r1, r2, r3);
  // console.log(`Calculated coordinates: ${toString(coordinates)}`);

  const result: Result = {
    result: {
      lcation: coordinates,
      probes: {
        count: 3,
        coordinates: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: 100, z: 0 },
          { x: 100, y: 0, z: 0 },
        ],
      },
    },
  };

  console.log("Result: ", JSON.stringify(result));
};

run();
