export type Subject =
  | "LPO"
  | "BIO"
  | "QUI"
  | "EST"
  | "LIN"
  | "MAT"
  | "ESP"
  | "FIL"
  | "EDF"
  | "HIS"
  | "CLI"
  | "FIS"
  | "SOC"
  | "GEO"
  | "LIT"
  | "SET";

export interface SchoolWork {
  id: string;
  title: string;
  description: string;
  subjects: Subject[];
  date: string;
}
