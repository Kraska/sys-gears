import { Probe } from "./Probe";
import { DistanceToAsteroidMeasurer } from "./DistanceToAsteroidMeasurer";
import { CoordinatesProvider } from "./CoordinatesProvider";

export interface ProbesProvider {
  getProbeAtTheStartAsix(): Probe;
  getProbeOnAsixX(): Probe;
  getProbeOnAsixY(): Probe;
  getProbeOnAsixZ(): Probe;
}

export class StandartProbesProvider implements ProbesProvider {
  private coordinatesProvider: CoordinatesProvider;
  private distanceMeasurer: DistanceToAsteroidMeasurer;

  constructor(
    coordinatesProvider: CoordinatesProvider,
    distanceMeasurer: DistanceToAsteroidMeasurer
  ) {
    this.coordinatesProvider = coordinatesProvider;
    this.distanceMeasurer = distanceMeasurer;
  }

  getProbeAtTheStartAsix(): Probe {
    return new Probe(
      this.coordinatesProvider.getPoint(0, 0, 0),
      this.distanceMeasurer
    );
  }

  getProbeOnAsixX(): Probe {
    return new Probe(
      this.coordinatesProvider.getPoint(undefined, 0, 0),
      this.distanceMeasurer
    );
  }

  getProbeOnAsixY(): Probe {
    return new Probe(
      this.coordinatesProvider.getPoint(0, undefined, 0),
      this.distanceMeasurer
    );
  }
  getProbeOnAsixZ(): Probe {
    return new Probe(
      this.coordinatesProvider.getPoint(0, 0, undefined),
      this.distanceMeasurer
    );
  }
}
