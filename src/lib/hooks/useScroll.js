import { useEffect, useState } from "react";

function useScroll(ref) {
  const [scrollPositions, setScrollPositions] = useState({
    left: 0,
    right: 0,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleScroll = () => {
      setScrollPositions({
        left: ref.current.scrollLeft,
        right:
          ref.current.scrollWidth -
          ref.current.scrollLeft -
          ref.current.clientWidth,
      });
    };

    ref.current.addEventListener("scroll", handleScroll);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return scrollPositions;
}

export default useScroll;
