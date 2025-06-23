// Estrutura base dos desafios de qualidade (sem textos traduzíveis)
// Para internacionalização, os textos serão montados no componente Quality

export interface ChallengeData {
  type: string;
  solution: number;
  options: any[];
}

export const challengesData: ChallengeData[] = [
  {
    type: "button",
    solution: 1,
    options: []
  },
  {
    type: "contrast",
    solution: 3,
    options: [
      { bg: "#1A365D", fg: "#63B3ED" },
      { bg: "#2D3748", fg: "#EDF2F7" },
      { bg: "#744210", fg: "#F6E05E" },
      { bg: "#4A5568", fg: "#CBD5E0" }
    ]
  },
  {
    type: "code",
    solution: 1,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "multiple",
    solution: 2,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "multiple",
    solution: 1,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "code",
    solution: 1,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "form",
    solution: 3,
    options: [
      { type: "email" },
      { type: "tel" },
      { pattern: "\\d{5}-\\d{3}" },
      { type: "text" }
    ]
  },
  {
    type: "multiple",
    solution: 2,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "code",
    solution: 3,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  },
  {
    type: "multiple",
    solution: 2,
    options: [
      { type: "string" },
      { type: "string" },
      { type: "string" },
      { type: "string" }
    ]
  }
]; 