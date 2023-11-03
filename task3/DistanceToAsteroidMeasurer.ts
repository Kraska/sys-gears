import { DistanceCalculator } from "./DictanceCalculator";
import { Coordinates } from "./Coordinates";

export interface DistanceToAsteroidMeasurer {
  measure(coordinates: Coordinates): number;
}

export class DistanceToAsteroidByCoordinatesMeasurer
  implements DistanceToAsteroidMeasurer
{
  private asteroidCoordinates: Coordinates;
  private distanceCalculator: DistanceCalculator;

  constructor(
    asteroidCoordinates: Coordinates,
    distanceCalculator: DistanceCalculator
  ) {
    this.asteroidCoordinates = asteroidCoordinates;
    this.distanceCalculator = distanceCalculator;
  }

  measure(probeCoordinates: Coordinates): number {
    return this.distanceCalculator.calculate(
      probeCoordinates,
      this.asteroidCoordinates
    );
  }
}
