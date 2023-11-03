import { Coordinates } from "./Coordinates";
import { DistanceCalculator } from "./DictanceCalculator";
import { Probe } from "./Probe";
import { ProbesProvider } from "./ProbesProvider";

export type Result = {
  result: {
    location: Coordinates;
    probes: {
      count: number;
      coordinates: Coordinates[];
    };
  };
};

export class AsteroidFinder {
  private probesProvider: ProbesProvider;
  private distanceCalculator: DistanceCalculator;

  constructor(
    probesProvider: ProbesProvider,
    distanceCalculator: DistanceCalculator
  ) {
    this.probesProvider = probesProvider;
    this.distanceCalculator = distanceCalculator;
  }

  findAsteroid = (): Result => {
    const probe0 = this.probesProvider.getProbeAtTheStartAsix();
    const probe1 = this.probesProvider.getProbeOnAsixX();

    const r0 = probe0.getDistanceToAsteroid();
    const r1 = probe1.getDistanceToAsteroid();

    const distance01 = this.distanceCalculator.calculate(
      probe0.coordinates,
      probe1.coordinates
    );

    const probes = [probe0, probe1];

    if (distance01 === r0 + r1) {
      // тоді астероїд знаходиться на осі X
      return this.makeResult({ x: r0, y: 0, z: 0 }, probes);
    } else {
      const probe2 = this.probesProvider.getProbeOnAsixY();
      const r2 = probe2.getDistanceToAsteroid();

      const x1 = probe1.coordinates.x;
      const y2 = probe2.coordinates.y;

      const x = Math.round((1 / (2 * x1)) * (r0 ** 2 - r1 ** 2 + x1 ** 2));
      const y = Math.round((1 / (2 * y2)) * (r0 ** 2 - r2 ** 2 + y2 ** 2));
      const z = Math.round(Math.sqrt(r0 ** 2 - x ** 2 - y ** 2));

      probes.push(probe2);
      return this.makeResult({ x, y, z }, probes);
    }
  };

  makeResult(location: Coordinates, probes: Probe[]): Result {
    return {
      result: {
        location,
        probes: {
          count: probes.length,
          coordinates: probes.map(({ coordinates }) => coordinates),
        },
      },
    };
  }
}
