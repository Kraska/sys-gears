import { Coordinates } from "./Coordinates";

export interface DistanceCalculator {
  calculate(point1: Coordinates, point2: Coordinates): number;
}

class StandartDistanceCalculator implements DistanceCalculator {
  calculate(point1: Coordinates, point2: Coordinates): number {
    const { x: x1, y: y1, z: z1 } = point1;
    const { x: x2, y: y2, z: z2 } = point2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
  }
}

export const distanceCalculator = new StandartDistanceCalculator();
