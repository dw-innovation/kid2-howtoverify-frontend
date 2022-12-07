import React, { useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
import PlusIcon from "src/assets/svg/plusIcon";
import clsx from "clsx";
import useOnClickOutside from "@/lib/hooks/useOutsideClick";
import useEscapeKey from "@/lib/hooks/useEscapeKey";
import useSessionStore from "@/lib/stores/useSessionStore";

const Modal = () => {
  const { t } = useTranslation("footer");

  const ref = useRef(null);
  const isOpen = useSessionStore((state) => state.modal.isOpen);
  const toggleModal = useSessionStore((state) => state.toggleModal);
  const content = useSessionStore((state) => state.modal.content);

  useOnClickOutside(ref, () => toggleModal(false));

  useEscapeKey(() => toggleModal(false));

  return (
    <>
      <div
        className={clsx(
          "absolute w-screen h-screen flex items-center justify-center top-0 left-0 z-50",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div
          className="bg-white shadow-xl w-3/4 h-3/4 p-10 relative modal overflow-x-hidden overflow-y-scroll"
          ref={ref}
        >
          <button
            onClick={() => toggleModal(false)}
            className="absolute right-0 top-0 p-2 text-blue rotate-45"
          >
            <PlusIcon />
          </button>
          <div>
            <ReactMarkdown children={t(`${content}Text`)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
