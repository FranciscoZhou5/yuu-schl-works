"use client";

import { useSearchParams } from "next/navigation";

export default function NewSW() {
  const searchParams = useSearchParams();

  const schoolWorkType = searchParams.get("type") || "Trabalho";

  return (
    <main className="max-w-[750px] pt-4 mx-auto px-4 md:px-8 lg:px-0">
      <form>
        <div className="space-y-8 mt-12">
          <div>
            <h2 className="text-base font-semibold leading-7">
              {schoolWorkType === "Trabalho" ? "Novo trabalho" : `Nova ${schoolWorkType.toLowerCase()}`}
            </h2>
            <p> Você criará um card que será visível na tela principal para todos. </p>
          </div>

          <div className="flex flex-col max-w-xs space-y-2">
            <label htmlFor="title">Título</label>
            <input type="text" id="title" className="shadow-sm ring-1 ring-slate-100 dark:ring-zinc-700 ring-inset" />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Descrição</label>
            <textarea
              name="description"
              id="description"
              className="shadow-sm ring-1 ring-slate-100 dark:ring-zinc-700 ring-inset"
            ></textarea>
          </div>
        </div>
      </form>
    </main>
  );
}
