import React from "react";
import useSessionStore from "@/lib/stores/useSessionStore";
import { useSpring, animated } from "react-spring";

const ContentWrapper = ({ children }) => {
  const modalIsOpen = useSessionStore((state) => state.modal.isOpen);
  const blurStyle = useSpring({
    filter: modalIsOpen ? `blur(6px)` : `blur(0px)`,
  });

  return (
    <animated.div
      className="relative flex-col hidden w-screen h-screen max-h-screen overflow-hidden max-w-screen bg-lightGrey md:flex"
      style={blurStyle}
    >
      {children}
    </animated.div>
  );
};

export default ContentWrapper;
