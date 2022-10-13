import { STYLES } from "@/lib/const";
import axios from "axios";

export const getNodeStyle = (nodeType, property) => {
  return STYLES.filter(
    (style) => style.nodeType === nodeType.replace("http://dw.com/", "")
  )[0]?.properties[property];
};

export const addNodeToPath = (nodeID, level, pathNodes) => {
  if (pathNodes.length <= level) {
    return [...pathNodes, nodeID] ;
  } else {
    const history = Object.assign([], pathNodes);
    history[level] = nodeID;
    return history.slice(0, level + 1);
  }
};

export const fetchGraphData = async (pathNodes, setAppState) => {
  const result = await axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_GRAPH_API,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ click_history: pathNodes }),
  });

  setAppState((prev) => ({
    ...prev,
    graph: {
      ...prev.graph,
      data: result.data,
    },
  }));
};