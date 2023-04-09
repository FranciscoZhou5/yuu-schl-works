"use client";

import { Listbox, Transition } from "@headlessui/react";
import { ArrowLeft, CaretDown } from "@phosphor-icons/react";
import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import * as z from "zod";

const createSchoolWorkSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export default function newSchoolWork() {
  const [value, setValue] = useState({ endDate: null, startDate: null });
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    date: "",
  });

  const searchParams = useSearchParams();
  const schoolWorkType = searchParams.get("type") || "Trabalho";

  const schoolWorkTypes = ["Trabalho", "Apresentação", "Prova"];

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    console.log(formState);

    try {
      const validationResult = createSchoolWorkSchema.parse(formState);

      console.log(validationResult);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="max-w-[750px] pt-4 mx-auto px-4 md:px-8 lg:px-0">
      <form onSubmit={handleSubmitForm} className="h-[calc(100vh_+_100px)]">
        <div className="space-y-8 mt-12">
          <Link href="/" className="cursor-pointer flex items-center space-x-2">
            <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
            <span> Voltar </span>
          </Link>

          <div>
            <h2 className="text-base font-semibold leading-7">
              {schoolWorkType === "Trabalho" ? "Novo trabalho" : `Nova ${schoolWorkType.toLowerCase()}`}
            </h2>
            <p> Você criará um card que será visível na tela principal para todos. </p>
          </div>

          <div className="flex flex-col max-w-xs space-y-2">
            <label htmlFor="title">Título</label>
            <input
              name="title"
              value={formState.title}
              onChange={(event) => {
                setFormState((oldState) => ({
                  ...oldState,
                  [event.target.name]: event.target.value,
                }));
              }}
              type="text"
              id="title"
              className="bg-white dark:bg-zinc-800"
              placeholder={`O que é ${schoolWorkType === "Trabalho" ? "esse trabalho?" : `essa ${schoolWorkType.toLowerCase()}?`}`}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description">Descrição</label>
            <textarea
              placeholder={`O que eu preciso saber para tirar A ${
                schoolWorkType === "Trabalho" ? "no trabalho?" : `na ${schoolWorkType.toLowerCase()}?`
              }`}
              value={formState.description}
              name="description"
              id="description"
              onChange={(event) => {
                setFormState((oldState) => ({
                  ...oldState,
                  [event.target.name]: event.target.value,
                }));
              }}
              className="h-32 bg-white dark:bg-zinc-800"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label> Data </label>
            <Datepicker
              primaryColor="purple"
              placeholder={`${schoolWorkType === "Trabalho" ? "Para quando é o trabalho?" : `Quando é a ${schoolWorkType.toLowerCase()}?`}`}
              inputClassName="dark:bg-zinc-800 dark:border-0 dark:focus:ring-primary-500/50"
              i18n="pt-BR"
              useRange={false}
              asSingle={true}
              value={value}
              onChange={(newValue) => {
                //@ts-ignore
                setValue(newValue);
                setFormState((oldState) => ({
                  ...oldState,
                  date: newValue?.startDate as string,
                }));
              }}
            />
          </div>

          <Listbox defaultValue={schoolWorkTypes[0]}>
            <div className="relative md:max-w-[240px] w-full">
              <div className="space-y-2">
                <label> Tipo </label>
                <Listbox.Button className="h-10 shadow-sm w-full justify-between text-sm bg-white duration-200 flex items-center border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800 rounded-md px-2 md:px-3">
                  <span>{schoolWorkType}</span>

                  <CaretDown size={18} className="ml-2" />
                </Listbox.Button>
              </div>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="absolute mt-1 border border-zinc-200 dark:border-zinc-800 w-full rounded-md bg-slate-50 dark:bg-zinc-900"
              >
                <Listbox.Options className="py-1">
                  {schoolWorkTypes.map((item) => (
                    <Listbox.Option
                      as={Link}
                      href={`/sw/new?type=${item}`}
                      replace
                      key={Math.random()}
                      value={item}
                      className="w-full cursor-pointer"
                    >
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "dark:bg-zinc-800  bg-gray-200" : "dark:bg-zinc-900 dark:text-white text-gray-600 bg-white",
                            "px-2 duration-200 text-sm py-2"
                          )}
                        >
                          {item}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <div className="flex justify-end mt-24">
            <button className="duration-200 text-gray-200 bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-md text-sm">
              Criar {schoolWorkType.toLowerCase()}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
