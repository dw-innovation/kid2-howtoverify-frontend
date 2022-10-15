import { useState, useEffect } from "react";

const useLocation = () => {
  const [path, setPath] = useState(window.location.pathname);

  const listenToStateUpdate = () => {
    const windowPath = window.location.pathname;
    setPath(windowPath);
  };

  useEffect(() => {
    window.addEventListener("popstate", listenToStateUpdate);
    
    return () => {
      window.removeEventListener("popstate", listenToStateUpdate);
    };
  }, []);

  return path;
};

export default useLocation;
