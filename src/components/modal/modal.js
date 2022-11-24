import React, { useRef } from "react";
import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
import PlusIcon from "src/assets/svg/plusIcon";
import clsx from "clsx";
import useOnClickOutside from "@/lib/hooks/useOutsideClick";

const Modal = () => {
  const { t } = useTranslation("footer");

  const ref = useRef(null);

  const {
    appState: {
      modal: { isOpen, content },
    },
    setAppState,
  } = useAppContext();

  const closeModal = () =>
    setAppState((prev) => ({
      ...prev,
      modal: { ...prev.modal, isOpen: false },
    }));

  useOnClickOutside(ref, closeModal);

  return (
    <>
      <div
        className={clsx(
          "absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-50",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="bg-white shadow-xl w-3/4 h-3/4 p-5 relative modal overflow-y-auto overflow-x-hidden" ref={ref}>
          <button
            onClick={closeModal}
            className="absolute right-0 top-0 p-2 text-blue rotate-45"
          >
            <PlusIcon />
          </button>
          <ReactMarkdown children={t(`${content}Text`)} />
        </div>
      </div>
    </>
  );
};

export default Modal;
