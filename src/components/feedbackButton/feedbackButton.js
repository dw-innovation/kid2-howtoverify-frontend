import React, { useState, useRef, useEffect } from "react";
import FeedbackIcon from "src/assets/svg/feedback";
import useTranslation from "next-translate/useTranslation";

const FeedbackButton = () => {
  const { t } = useTranslation("common");
  const [stripeWidth, setStripeWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setStripeWidth(ref?.current?.clientWidth);
  }, [ref]);

  return (
    <>
      <a
        href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
        target="_blank"
        className="flex items-center gap-1 text-white bg-blue-primary hover:brighter p-2 font-noto cursor-pointer fixed right-0 z-[100] bottom-1/4"
        rel="noopener noreferrer"
        style={{ transform: `translateX(${hover ? 0 : stripeWidth + 8}px)` }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className="pr-1">
          <FeedbackIcon />
        </div>
        <span ref={ref}>{t("sendFeedback")}</span>
      </a>
    </>
  );
};
export default FeedbackButton;
