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

export const getStrength = (graphWidth) => {
  return graphWidth / -1.6;
};

export const getSizeFactor = (graphWidth) => {
  return graphWidth / 1500;
};

export const triggerTracking = async () => {
  await axios({
    method: "get",
    url: process.env.NEXT_PUBLIC_MATOMO_URL,
    params: {
      idsite: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      rec: 1,
      url: encodeURIComponent(window?.location?.href),
      rand: Math.floor(Math.random() * 10000000),
      res: `${window?.screen?.availWidth}x${window?.screen?.availHeight}`,
      ua: encodeURIComponent(window?.navigator?.userAgent)
    },
  });
};
