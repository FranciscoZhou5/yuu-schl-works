"use client";

import { SchoolWork } from "@/@types";
import SchoolWorkCard from "@/components/SchoolWorkCard";
import SchoolWorkDetailModal from "@/components/SchoolWorkDetailModal";
import { Listbox, Transition } from "@headlessui/react";
import { CaretDown, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import classNames from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function App() {
  const [data, setData] = useState<SchoolWork[]>([]);
  const [schoolWorkDetailModalIsOpen, setSchoolWorkDetailModalIsOpen] = useState(false);
  const [activeSchoolWork, setActiveSchoolWork] = useState<SchoolWork | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/school-works`, { next: { revalidate: 10 } });
      const data: SchoolWork[] = await response.json();

      setData(data);
    }

    getData();
  }, []);

  const handleOpenSWDetail = useCallback((schoolWork: SchoolWork) => {
    setActiveSchoolWork(schoolWork);
    setSchoolWorkDetailModalIsOpen(true);
  }, []);

  const filteredSchoolWorks =
    query === ""
      ? data
      : data.filter((schoolWork) => schoolWork.title.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

  const schoolWorkTypes = ["Trabalho", "Apresentação", "Prova"];

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <SchoolWorkDetailModal
            isOpen={schoolWorkDetailModalIsOpen}
            onClose={() => {
              setSchoolWorkDetailModalIsOpen(false);
            }}
            activeSchoolWork={activeSchoolWork}
          />,
          document.body
        )}

      <main className="max-w-[950px] pt-4 mx-auto px-4 md:px-8 lg:px-0">
        <div className="h-10 flex">
          <div className="h-full w-full flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md">
            <MagnifyingGlass size={18} className="mx-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="outline-none border-0 bg-transparent text-sm h-full w-full"
            />
          </div>

          <Listbox defaultValue={schoolWorkTypes[0]}>
            <div className="relative h-10 ml-2">
              <Listbox.Button className="h-full text-sm dark:text-gray-400  text-gray-600 hover:bg-gray-200 hover:text-black dark:hover:text-white duration-200 flex items-center border border-zinc-200 dark:hover:bg-zinc-800 dark:border-zinc-800 rounded-md px-2 md:px-3">
                Adicionar
                <CaretDown size={18} className="ml-2" />
              </Listbox.Button>

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
                      key={Math.random()}
                      value={item}
                      className="w-full cursor-pointer"
                    >
                      {({ active, selected }) => (
                        <div
                          className={classNames(
                            active ? "dark:bg-zinc-800 bg-gray-200" : "dark:text-gray-400 text-gray-600",
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
        </div>

        <div className="grid justify-center grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {query === ""
            ? data.map((item) => <SchoolWorkCard onClick={() => handleOpenSWDetail(item)} key={item.id} data={item} />)
            : filteredSchoolWorks.map((item) => <SchoolWorkCard onClick={() => handleOpenSWDetail(item)} key={item.id} data={item} />)}
        </div>
      </main>
    </>
  );
}
