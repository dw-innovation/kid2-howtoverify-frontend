import React from "react";

const FeedbackButton = () => (
  <a
    href={`mailto:innovation@dw.com?subject=Feedback&body=${encodeURIComponent(
      `Hey,\n\nI have feedback on the ${window.location.href}\n\nBest`
    )}`}
  >
    send feedback
  </a>
);
export default FeedbackButton;
