import React, { useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import ReactMarkdown from "react-markdown";
import PlusIcon from "src/assets/svg/plusIcon";
import clsx from "clsx";
import useOnClickOutside from "@/lib/hooks/useOutsideClick";
import useEscapeKey from "@/lib/hooks/useEscapeKey";
import useSessionStore from "@/lib/stores/useSessionStore";
import DynamicPrivacySettingsManager from "../privacySettingsManager";

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
          "absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center",
          isOpen ? "block" : "hidden"
        )}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div
          className="modal relative h-3/4 w-3/4 max-w-[50rem] overflow-x-hidden overflow-y-scroll bg-white p-10 shadow-xl"
          ref={ref}
        >
          <button
            onClick={() => toggleModal(false)}
            className="absolute right-0 top-0 rotate-45 p-2 text-blue-primary"
          >
            <PlusIcon />
          </button>
          <div>
            {content === "privacy" && <DynamicPrivacySettingsManager />}
            <ReactMarkdown children={t(`${content}Text`)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
