import React from "react";

const FeedbackButton = () => (
  <a
    href={`mailto:innovation@dw.com?subject=Feedback&body=${encodeURIComponent(
      `Hey, I have feedback on the ${window.location.href} Best`
    )}`}
  >
    send feedback
  </a>
);
export default FeedbackButton;
