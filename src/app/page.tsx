import Badge from "@/components/Badge";
import { supabase } from "@/lib/supabase";
import { DateTime } from "luxon";
import Link from "next/link";

interface SchoolWork {
  id: string;
  title: string;
  subjects: string[];
  date: Date;
}

export default async function Home() {
  function generateDateMessage(date: Date) {
    const today = DateTime.now();

    const targetDate = DateTime.fromJSDate(date);
    const currentWeekSunday = today.plus({ days: 7 - today.weekday });
    const day = targetDate.toFormat("dd/MM", { locale: "pt-BR" });

    if (currentWeekSunday < targetDate) {
      return `Próxima ${targetDate.toFormat("EEEE", { locale: "pt-BR" })}, ${day}`;
    } else {
      const weekday = targetDate.toFormat("EEEE", { locale: "pt-BR" });

      return `${targetDate.weekday > 5 ? "Nesse" : "Nessa"} ${weekday}, ${day}`;
    }
  }

  // const data = await getData();

  return (
    <main className="max-w-[950px] pt-4 mx-auto px-4 md:px-8 lg:px-0">
      <div className="grid justify-center grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* {data.map(({ date, id, title, subjects }) => (
          <Link
            href={`/i/${String(id)}`}
            key={id}
            className="cursor-pointer mx-auto h-24 flex flex-col w-full lg:md:w-56 shadow-sm p-2 border rounded-md duration-200 border-zinc-200 hover:bg-gray-300 dark:hover:bg-zinc-800  dark:border-zinc-800"
          >
            <div className="flex-grow">
              <h3 className="font-medium">{title}</h3>

              {subjects.map((sub) => (
                <Badge key={Math.random()} color="purple">
                  {sub}
                </Badge>
              ))}
            </div>

            <div>
              <p>{generateDateMessage(date)}</p>
            </div>
          </Link>
        ))} */}
      </div>

      <Badge color="purple">Olá</Badge>
      <Badge color="green">Olá</Badge>
      <Badge color="cyan">Olá</Badge>
      <Badge color="default">Olá</Badge>
      <Badge color="yellow">Olá</Badge>
      <Badge color="teal">Olá</Badge>
      <Badge color="indigo">Olá</Badge>
      <Badge color="pink">Olá</Badge>
      <Badge color="sky">Olá</Badge>
      <Badge color="emerald">Olá</Badge>
    </main>
  );
}
