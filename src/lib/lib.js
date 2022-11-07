import { NODETYPESTYLES, ROOTNODES, PREFIX } from "@/lib/const";
import axios from "axios";

export const addPrefix = (string) => `${PREFIX}${string}`;

export const removePrefix = (string) => string.replace(PREFIX, "");

export const getNodeColor = (rootNode, property) => {
  return ROOTNODES.filter((node) => node.id === rootNode)[0]?.color[property];
};

export const getNodeRadius = (nodeType) =>
  NODETYPESTYLES.filter((style) => style.nodeType === removePrefix(nodeType))[0]
    ?.properties["radius"];

export const addNodeToPath = (nodeID, level, pathNodes) => {
  if (pathNodes.length <= level) {
    return [...pathNodes, nodeID];
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

export const validateLink = (pathNodes, link) => {
  return (pathNodes.includes(link.source) && pathNodes.includes(link.target)) ||
    pathNodes.at(-1) === link.source
    ? true
    : false;
};
