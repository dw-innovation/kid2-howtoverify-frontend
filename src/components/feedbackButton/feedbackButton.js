import React from "react";
import FeedbackIcon from "src/assets/svg/feedback";
import ReactTooltip from "react-tooltip";
import useTranslation from "next-translate/useTranslation";

const FeedbackButton = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <a
        href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
        target="_blank"
        className="flex items-center gap-1 text-white bg-blue hover:brighter p-2 font-noto cursor-pointer fixed right-0 z-[100] bottom-1/4"
        rel="noopener noreferrer"
        data-tip={t("sendFeedback")}
      >
        <FeedbackIcon />
      </a>
      <ReactTooltip />
    </>
  );
};
export default FeedbackButton;
