import { useState } from "react";
import { createContext, useContext } from "react";
import graphData from "@/data/sample.json";

export const initialState = {
  graph: {
    data: graphData,
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
