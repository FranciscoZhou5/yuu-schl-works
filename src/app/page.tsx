"use client";

import { SchoolWork } from "@/@types";
import SchoolWorkCard from "@/components/SchoolWorkCard";
import SchoolWorkDetailModal from "@/components/SchoolWorkDetailModal";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Home() {
  const [data, setData] = useState<SchoolWork[]>([]);
  const [schoolWorkDetailModalIsOpen, setSchoolWorkDetailModalIsOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/school-works`, { next: { revalidate: 10 } });
      const data: SchoolWork[] = await response.json();

      setData(data);
    }

    getData();
  }, []);

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <SchoolWorkDetailModal isOpen={schoolWorkDetailModalIsOpen} onClose={() => setSchoolWorkDetailModalIsOpen(false)} />,
          document.body
        )}

      <main className="max-w-[950px] pt-4 mx-auto px-4 md:px-8 lg:px-0">
        <div className="grid justify-center grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item) => (
            <SchoolWorkCard onClick={() => setSchoolWorkDetailModalIsOpen(true)} key={item.id} data={item} />
          ))}
        </div>
      </main>
    </>
  );
}
