import useTranslation from "next-translate/useTranslation";
import React from "react";

const FeedbackButton = () => {
  const { t } = useTranslation("common");
  return (
    <a
      href={`mailto:${t("feedbackMail")}?subject=${t(
        "feedbackSubject"
      )}&body=${encodeURIComponent(
        t("feedbackBody", {
          url: typeof window !== "undefined" ? window.location.href : "",
        })
      )}`}
      dangerouslySetInnerHTML={{ __html: t("sendFeedback") }}
    />
  );
};
export default FeedbackButton;
