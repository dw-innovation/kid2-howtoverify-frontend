import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

const FeedbackButton = () => {
  const { t } = useTranslation("common");

  const [url, setUrl] = useState("");

  useEffect(() => {
    typeof window !== "undefined" ? setUrl(window.location.href) : "";
  }, []);

  return (
    <>
      <a
        href={`mailto:${t("feedbackMail")}?subject=${t(
          "feedbackSubject"
        )}&body=${encodeURIComponent(
          t("feedbackBody", {
            url: url,
          })
        )}`}
        dangerouslySetInnerHTML={{ __html: t("sendFeedback") }}
      />
    </>
  );
};
export default FeedbackButton;
