import { Subject } from "@/@types";
import Badge, { BadgeColors } from "../Badge";
import React from "react";

interface ISubjectBadgeProps {
  children: React.ReactNode;
  subject: Subject;
}

export default function SubjectBadge({ children, subject }: ISubjectBadgeProps) {
  const subjectsColors: { [k in Subject]: BadgeColors } = {
    LPO: "purple",
    BIO: "green",
    QUI: "cyan",
    LIN: "default",
    HIS: "teal",
    CLI: "indigo",
    MAT: "pink",
    ESP: "sky",
    FIS: "emerald",
    GEO: "violet",
    EDF: "salem",
    EST: "royal-blue",
    LIT: "cello",
    FIL: "wistful",
    SET: "hoki",
    SOC: "shiraz",
  };

  return <Badge color={subjectsColors[subject]}>{children}</Badge>;
}
