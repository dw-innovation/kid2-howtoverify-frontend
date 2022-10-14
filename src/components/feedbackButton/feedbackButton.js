import useTranslation from "next-translate/useTranslation";
import React from "react";

const FeedbackButton = () => {
  const { t } = useTranslation("common");
  return (
    <a
      href={`mailto:innovation@dw.com?subject=Feedback&body=${encodeURIComponent(
        `Hey,\n\nI have feedback on the ${
          typeof window !== "undefined" && window.location.href
        }\n\nBest`
      )}`}
    >
      {t("sendFeedback")}
    </a>
  );
};
export default FeedbackButton;
