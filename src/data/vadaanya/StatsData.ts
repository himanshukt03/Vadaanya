export interface Stat {
  id: number;
  number: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: 1, number: 5000, suffix: "+", label: "Students Supported" },
  { id: 2, number: 15,   suffix: "+", label: "Years of Impact" },
  { id: 3, number: 800,  suffix: "+", label: "Scholarships Awarded" },
  { id: 4, number: 12,   suffix: "+", label: "Districts Reached" },
];
