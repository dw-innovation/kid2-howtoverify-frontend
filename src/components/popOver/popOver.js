import useAppContext from "@/lib/hooks/useAppContext";
import useSessionStore from "@/lib/stores/useSessionStore";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const PopOver = () => {
  const showPopOver = useSessionStore((state) => state.popOver.isOpen);
  const togglePopOver = useSessionStore((state) => state.togglePopOver);

  const [displayPopOver, setDisplayPopOver] = useState(false);

  const { t } = useTranslation("common");

  const spring = useSpring({ opacity: showPopOver ? 1 : 0 });

  useEffect(() => {
    if (showPopOver) {
      setDisplayPopOver(true);
      setTimeout(() => togglePopOver(false), 4000);
    } else {
      setTimeout(() => setDisplayPopOver(false), 100000);
    }
  }, [showPopOver]);

  return (
    <>
      {displayPopOver && (
        <animated.div style={spring}>
          <div
            className="absolute bg-darkBlue p-2 rounded-sm z-50 mx-auto mb-2 right-0 left-0 bottom-0 w-max shadow-md font-bold text-white"
            dangerouslySetInnerHTML={{ __html: t("urlCopied") }}
          />
        </animated.div>
      )}
    </>
  );
};

export default PopOver;
