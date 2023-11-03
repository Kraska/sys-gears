import { Coordinates } from "./Coordinates";

export interface CoordinatesProvider {
  getPoint(
    x?: number | undefined,
    y?: number | undefined,
    z?: number | undefined
  ): Coordinates;
}

class Area {
  maxX: number;
  maxY: number;
  maxZ: number;
}

export class RandomCoordinatesProvider implements CoordinatesProvider {
  private area: Area;

  constructor(area: Area) {
    this.area = area;
  }

  getPoint(
    x?: number | undefined,
    y?: number | undefined,
    z?: number | undefined
  ): Coordinates {
    return {
      x: x === undefined ? this.generateNum(this.area.maxX) : x,
      y: y === undefined ? this.generateNum(this.area.maxY) : y,
      z: z === undefined ? this.generateNum(this.area.maxZ) : z,
    };
  }

  generateNum(max: number) {
    return Math.round(Math.random() * max);
  }
}
