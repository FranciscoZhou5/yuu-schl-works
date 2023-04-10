import { Subject } from "@/@types";

export const subjectsNameShort: Subject[] = [
  "LPO",
  "BIO",
  "QUI",
  "EST",
  "LIN",
  "MAT",
  "ESP",
  "FIL",
  "EDF",
  "HIS",
  "CLI",
  "FIS",
  "SOC",
  "GEO",
  "LIT",
  "SET",
];

export const completeSubjectsNameHandler: { [K in Subject]: string } = {
  BIO: "Biologia",
  CLI: "Conv. em Inglês",
  EDF: "Educ. física",
  ESP: "Espanhol",
  EST: "Estatística",
  FIL: "Filosofia",
  FIS: "Física",
  GEO: "Geografia",
  HIS: "História",
  LIN: "Inglês",
  LIT: "Literatura e Arte",
  LPO: "Português",
  MAT: "Matemática",
  QUI: "Química",
  SET: "Soluções em Tecnologia",
  SOC: "Sociologia",
};
