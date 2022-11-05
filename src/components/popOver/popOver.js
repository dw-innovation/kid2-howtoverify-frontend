import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

const PopOver = () => {
  const {
    appState: { showPopOver },
    setAppState,
  } = useAppContext();

  const { t } = useTranslation("common");

  const spring = useSpring({ opacity: showPopOver ? 1 : 0 });

  useEffect(() => {
    if (showPopOver) {
      setTimeout(
        () => setAppState((prev) => ({ ...prev, showPopOver: false })),
        4000
      );
    }
  }, [showPopOver]);

  return (
    <>
      <animated.div style={spring}>
        <div
          className="absolute bg-darkBlue p-2 rounded-sm z-20 mx-auto mb-2 right-0 left-0 w-max shadow-md font-bold text-white"
          dangerouslySetInnerHTML={{ __html: t("urlCopied") }}
        />
      </animated.div>
    </>
  );
};

export default PopOver;
