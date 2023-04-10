import { SchoolWork, Subject } from "@/@types";
import Badge, { BadgeColors } from "../Badge";
import { DateTime } from "luxon";
import { MouseEventHandler } from "react";
import { subjectsColors } from "@/common/subjectsColors";

interface ISchoolWorkCardProps {
  data: SchoolWork;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function SchoolWorkCard({ data: { date, id, subjects, title }, onClick }: ISchoolWorkCardProps) {
  function generateDateMessage(date: string) {
    const today = DateTime.now();

    const targetDate = DateTime.fromISO(date);
    const currentWeekSunday = today.plus({ days: 7 - today.weekday });
    const day = targetDate.toFormat("dd/MM", { locale: "pt-BR" });

    if (currentWeekSunday < targetDate) {
      return `Próxima ${targetDate.toFormat("EEEE", { locale: "pt-BR" })}, ${day}`;
    } else {
      const weekday = targetDate.toFormat("EEEE", { locale: "pt-BR" });

      return `${targetDate.weekday > 5 ? "Nesse" : "Nessa"} ${weekday}, ${day}`;
    }
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer mx-auto h-24 flex flex-col w-full lg:md:w-56 shadow-sm p-2 border rounded-md duration-200 border-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-800 dark:border-zinc-800"
    >
      <div className="flex-grow">
        <h3 className="font-medium">{title}</h3>

        {subjects.map((sub) => (
          <Badge key={Math.random()} color={subjectsColors[sub]}>
            {sub}
          </Badge>
        ))}
      </div>

      <div>
        <p>{generateDateMessage(date)}</p>
      </div>
    </div>
  );
}
