import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import FeedbackIcon from "src/assets/svg/feedback";

const FeedbackButton = () => {
  // using the state to avoid hydration errors
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const { t } = useTranslation("common");

  return (
    <>
      {isVisible && (
        <a
          href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
          target="_blank"
          className="flex items-center gap-1 text-white bg-blue hover:brighter p-2 font-noto"
          rel="noopener noreferrer"
        >
          <FeedbackIcon />
          <span>{t("sendFeedback")}</span>
        </a>
      )}
    </>
  );
};
export default FeedbackButton;
