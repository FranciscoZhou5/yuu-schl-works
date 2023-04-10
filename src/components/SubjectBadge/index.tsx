import { Subject } from "@/@types";
import Badge, { BadgeColors } from "../Badge";
import React from "react";
import { subjectsColors } from "@/common/subjectsColors";

interface ISubjectBadgeProps {
  children: React.ReactNode;
  subject: Subject;
}

export default function SubjectBadge({ children, subject }: ISubjectBadgeProps) {
  return <Badge color={subjectsColors[subject]}>{children}</Badge>;
}
