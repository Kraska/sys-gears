import { AsteroidFinder, Result } from "../task3/AsteroidFinder";
import { Coordinates } from "../task3/Coordinates";
import { distanceCalculator } from "../task3/DictanceCalculator";
import {
  DistanceToAsteroidByCoordinatesMeasurer,
  DistanceToAsteroidMeasurer,
} from "../task3/DistanceToAsteroidMeasurer";
import { Probe } from "../task3/Probe";
import { ProbesProvider } from "../task3/ProbesProvider";

class FixedProbesProvider implements ProbesProvider {
  private distanceToAsteroidMeasurer: DistanceToAsteroidMeasurer;
  private points: Coordinates[];

  constructor(
    distanceToAsteroidMeasurer: DistanceToAsteroidMeasurer,
    points: Coordinates[]
  ) {
    this.distanceToAsteroidMeasurer = distanceToAsteroidMeasurer;
    this.points = points;
  }

  getProbeAtTheStartAsix(): Probe {
    return this.getStaticProbe(this.points[0]);
  }
  getProbeOnAsixX(): Probe {
    return this.getStaticProbe(this.points[1]);
  }
  getProbeOnAsixY(): Probe {
    return this.getStaticProbe(this.points[2]);
  }
  getProbeOnAsixZ(): Probe {
    return this.getStaticProbe(this.points[3]);
  }

  private getStaticProbe(point: Coordinates) {
    return new Probe(point, this.distanceToAsteroidMeasurer);
  }
}

function getDistanceMeasurer(
  asteroidCoordinates: Coordinates
): DistanceToAsteroidMeasurer {
  return new DistanceToAsteroidByCoordinatesMeasurer(
    asteroidCoordinates,
    distanceCalculator
  );
}

function testCase(
  asteroid: Coordinates,
  probesCoordinates: Coordinates[],
  expectedResult: Result
) {
  const probesProvider = new FixedProbesProvider(
    getDistanceMeasurer(asteroid),
    probesCoordinates
  );

  const result = new AsteroidFinder(
    probesProvider,
    distanceCalculator
  ).findAsteroid();

  console.dir(result, { depth: null });

  expect(result).toEqual(expectedResult);
}

describe("Task3. ", () => {
  test("Asteroid situeted on asix X. So only 2 probes are enought ", () => {
    const asteroidCoordinates = { x: 2, y: 0, z: 0 };
    const probesCoordinates = [
      { x: 0, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
    ];

    testCase(asteroidCoordinates, probesCoordinates, {
      result: {
        location: asteroidCoordinates,
        probes: {
          count: 2,
          coordinates: probesCoordinates,
        },
      },
    });
  });

  test("Asteroid { x: 2, y: 2, z: 2 }. We need 3 probes to find it ", () => {
    const asteroidCoordinates = { x: 2, y: 2, z: 2 };
    const probesCoordinates = [
      { x: 0, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
      { x: 0, y: 4, z: 0 },
    ];

    testCase(asteroidCoordinates, probesCoordinates, {
      result: {
        location: asteroidCoordinates,
        probes: {
          count: 3,
          coordinates: probesCoordinates,
        },
      },
    });
  });
});
