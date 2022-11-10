import { useState } from "react";
import { createContext, useContext } from "react";

export const initialState = {
  graph: {
    data: { nodes: [], links: [] },
    pathNodes: [],
    dimensions: { width: 100, height: 100 },
  },
  showPopOver: false,
  search: {
    queryString: "",
    category: "default",
    results: [
      [
        { label: "Video", id: "http://dw.com/Video" },
        { label: "What", id: "http://dw.com/What" },
      ],
      [
        { label: "Image", id: "http://dw.com/Image" },
        { label: "How", id: "http://dw.com/How" },
      ],
    ],
    showResults: false,
    error: "",
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
