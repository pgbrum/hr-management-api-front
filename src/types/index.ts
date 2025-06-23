export type Benefit = {
  id: string;
  name: string;
  value: number;
};

export type Position = {
  id: string;
  title: string;
  salary: number;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  positionId: Position | null;
  benefitIds: string[];
  benefits?: Benefit[] | undefined;
};