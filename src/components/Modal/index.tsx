import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose(): void;

  className?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children, className }: IModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* <div className="inline-block w-full max-w-md py-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-50 dark:bg-zinc-800 shadow-xl rounded-2xl">
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
            </div> */}
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
