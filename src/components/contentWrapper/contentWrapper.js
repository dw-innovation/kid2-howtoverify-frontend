import React from "react";
import useSessionStore from "@/lib/stores/useSessionStore";
import { useSpring, animated } from "react-spring";

const ContentWrapper = ({ children }) => {
  const modalIsOpen = useSessionStore((state) => state.modal.isOpen);
  const blurStyle = useSpring({
    filter: modalIsOpen ? `blur(4px)` : `blur(0px)`,
  });

  return (
    <animated.div
      className="w-screen h-screen max-h-screen relative bg-lightGrey hidden md:flex flex-col"
      style={blurStyle}
    >
      {children}
    </animated.div>
  );
};

export default ContentWrapper;
