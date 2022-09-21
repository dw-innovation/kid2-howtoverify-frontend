import { useState } from "react";
import { createContext, useContext } from "react";

export const initialState = {
  graph: {
    data: { nodes: [], links: [] },
    pathNodes: ["it-image"],
    dimensions: { width: 100, height: 100 },
  },
};

const context = createContext(initialState);

export const Provider = ({ children }) => {
  const { Provider } = context;
  const [appState, setAppState] = useState(initialState);

  return <Provider value={{ appState, setAppState }}>{children}</Provider>;
};

const useAppContext = () => useContext(context);

export default useAppContext;
