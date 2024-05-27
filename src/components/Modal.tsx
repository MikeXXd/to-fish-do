import { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface ModalProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  // onSave: () => void;
}

const Modal = ({ isOpen: showModal, title, onClose, children }: ModalProps) => {
  useHotkeys("esc", onClose);
  useHotkeys("tab", onClose);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all">
            <div className="relative flex w-full my-6 mx-1  max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-200 outline-none focus:outline-none">
                {/*header*/}
                <div className="mx-auto pt-5 ">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
