import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PlusIcon from "src/assets/svg/plusIcon";
import { useDetectClickOutside } from "react-detect-click-outside";
import clsx from "clsx";

const Modal = () => {
  const { t } = useTranslation("footer");

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

  return (
    <>
      <div
        className={clsx(
          "absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-50",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="bg-white shadow-xl w-3/4 h-3/4 p-2 relative">
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
