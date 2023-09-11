export type Input = {
  distance: {
    unit: string;
    value: number;
  };
  convertTo: string;
};

export type Output = {
  unit: string;
  value: number;
};
