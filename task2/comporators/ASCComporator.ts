import { Comporator } from "./Comporator";

class ASCComporator implements Comporator {
  mapValueTypeToComporator = {
    string: this.compareString,
    number: this.compareNumber,
    boolean: this.compareBoolean,
    object: this.compareObject,
  };

  compare<VALUE>(value1: VALUE, value2: VALUE): number {
    return this.mapValueTypeToComporator[typeof value1](value1, value2);
  }

  private compareString(value1: string, value2: string): number {
    return value1.localeCompare(value2);
  }

  private compareNumber(value1: number, value2: number): number {
    return value1 - value2;
  }

  private compareBoolean(value1: boolean, value2: boolean): number {
    return Number(value1) - Number(value2);
  }

  private compareObject(value1: object, value2: object): number {
    return JSON.stringify(value1).localeCompare(JSON.stringify(value2));
  }
}

export const ascComporator = new ASCComporator();
