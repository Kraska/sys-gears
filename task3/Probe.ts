import { DistanceToAsteroidMeasurer } from "./DistanceToAsteroidMeasurer";
import { Coordinates } from "./Coordinates";

export class Probe {
  coordinates: Coordinates;
  private distanceMeasurer: DistanceToAsteroidMeasurer;

  constructor(
    coordinates: Coordinates,
    distanceMeasurer: DistanceToAsteroidMeasurer
  ) {
    this.coordinates = coordinates;
    this.distanceMeasurer = distanceMeasurer;
  }

  getDistanceToAsteroid(): number {
    return this.distanceMeasurer.measure(this.coordinates);
  }
}
