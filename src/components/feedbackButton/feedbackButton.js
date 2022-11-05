import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

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
          href={`mailto:${t("feedbackMail")}?subject=${t(
            "feedbackSubject"
          )}&body=${encodeURIComponent(
            t("feedbackBody", {
              url: window.location.href,
            })
          )}`}
          dangerouslySetInnerHTML={{ __html: t("sendFeedback") }}
        />
      )}
    </>
  );
};
export default FeedbackButton;
