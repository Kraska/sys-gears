import { AsteroidFinder } from "./AsteroidFinder";
import { RandomCoordinatesProvider } from "./CoordinatesProvider";
import { distanceCalculator } from "./DictanceCalculator";
import { DistanceToAsteroidByCoordinatesMeasurer } from "./DistanceToAsteroidMeasurer";
import { StandartProbesProvider } from "./ProbesProvider";

const coordinatesProvider = new RandomCoordinatesProvider({
  maxX: 100,
  maxY: 100,
  maxZ: 100,
});

/**
 * Вхідні параметри: Для вибору координат астероїда необхідно написати функцію,
 * яка згенерує випадкове місцезнаходження астероїда a(x, y, z).
 */
const asteroidCoordinates = coordinatesProvider.getPoint();

/*
 * Вхідні параметри: Також необхідно підготувати окрему функцію, яка,
 * отримавши координати зонда, буде повертати відстань між ним та точкою a.
 */
const distanceToAsteroidMeasurer = new DistanceToAsteroidByCoordinatesMeasurer(
  asteroidCoordinates,
  distanceCalculator
);
console.log("asteroidCoordinates = ", asteroidCoordinates);

const probesProvider = new StandartProbesProvider(
  coordinatesProvider,
  distanceToAsteroidMeasurer
);

const asteroidFinder = new AsteroidFinder(probesProvider, distanceCalculator);

const foundCoordinates = asteroidFinder.findAsteroid();

console.log("foundCoordinates = ", foundCoordinates);
