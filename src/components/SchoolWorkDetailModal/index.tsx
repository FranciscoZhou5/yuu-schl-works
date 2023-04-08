import { SchoolWork } from "@/@types";
import { Dialog, Transition } from "@headlessui/react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect } from "react";
import Modal from "../Modal";

interface ISchoolWorkDetailModalProps {
  isOpen: boolean;
  onClose(): void;
  activeSchoolWork: SchoolWork | null;
}

export default function SchoolWorkDetailModal({ isOpen, onClose, activeSchoolWork }: ISchoolWorkDetailModalProps) {
  const formatDate = useCallback((date: string) => {
    const d = DateTime.fromISO(date);

    return `${d.toFormat("dd/LL", { locale: "pt-BR" })}, ${d.toFormat("EEEE", { locale: "pt-BR" })}.`;
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block w-full max-w-md py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 dark:bg-zinc-800 shadow-xl rounded-2xl">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 px-6">
          {activeSchoolWork?.title}
        </Dialog.Title>

        <div className="mt-1 pb-2 border-b border-zinc-200 dark:border-zinc-600 px-6">
          <span> Para {formatDate(activeSchoolWork?.date as string)} </span>
        </div>

        <div className="h-12 flex items-center px-6">
          <p> {activeSchoolWork?.description?.length === 0 ? "Sem descrição" : activeSchoolWork?.description} </p>
        </div>

        <div className="px-6">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
