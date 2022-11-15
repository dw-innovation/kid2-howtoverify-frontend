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
          href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
          dangerouslySetInnerHTML={{ __html: t("sendFeedback") }}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </>
  );
};
export default FeedbackButton;
