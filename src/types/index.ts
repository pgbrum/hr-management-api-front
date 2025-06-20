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
  position: Position | null;
  benefits: string[];
};