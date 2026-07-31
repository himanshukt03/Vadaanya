export interface Stat {
  id: number;
  number: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: 1, number: 15000, suffix: "+", label: "Students in the talent test" },
  { id: 2, number: 400,   suffix: "+", label: "Scholarships & stipends" },
  { id: 3, number: 180,   suffix: "+", label: "Laptops given to students" },
  { id: 4, number: 15,    suffix: " yrs", label: "Of transforming lives" },
];
