"use client";

import { SchoolWork } from "@/@types";
import SchoolWorkCard from "@/components/SchoolWorkCard";
import SchoolWorkDetailModal from "@/components/SchoolWorkDetailModal";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
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
        <div className="h-10 bg-gray-200 dark:bg-zinc-800 flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md ">
          <MagnifyingGlass size={18} className="mx-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar..."
            className="outline-none bg-transparent text-sm h-full w-full"
          />
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
