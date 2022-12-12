import React from "react";
import useSessionStore from "@/lib/stores/useSessionStore";

const ContentWrapper = ({ children }) => {
  const modalIsOpen = useSessionStore((state) => state.modal.isOpen);

  return (
    <div
      className="w-screen h-screen relative bg-lightGrey hidden md:flex flex-col"
      style={{ filter: modalIsOpen ? "blur(4px)" : "" }}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
