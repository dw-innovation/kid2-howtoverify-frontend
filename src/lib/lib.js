import {
  NODETYPESTYLES,
  ROOTNODES,
  PREFIX,
  LINKLENGTHS,
  LINKLENGTHFACTORS,
  RADIUSFACTORS,
} from "@/lib/const";
import axios from "axios";

export const addPrefix = (string) => `${PREFIX}${string}`;

export const removePrefix = (string) => string.replace(PREFIX, "");

export const getNodeColor = (rootNode, property) => {
  return ROOTNODES.filter((node) => node.id === rootNode)[0]?.color[property];
};

export const getNodeRadius = (nodeType) =>
  NODETYPESTYLES.filter((style) => style.nodeType === removePrefix(nodeType))[0]
    ?.properties["radius"] * getFactor("RADIUS");

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
    url: `${process.env.NEXT_PUBLIC_API}graph`,
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

export const getStrength = (graphHeight) => {
  return graphHeight * -1.2;
};

export const getSizeFactor = (graphHeight) => {
  return graphHeight / 1200;
};

export const trackAction = async (action, payload = "") => {
  const params = {
    idsite: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    rec: 1,
    rand: Math.floor(Math.random() * 10000000),
    res: `${window?.screen?.availWidth}x${window?.screen?.availHeight}`,
    ua: window?.navigator?.userAgent,
    action_name: action,
  };

  switch (action) {
    case "search":
      params = {
        ...params,
        search: payload,
      };
      break;

    case "searchResultClick":
    case "trailClick":
    case "mediaTypeSelectorClick":
    case "graphClick":
      params = {
        ...params,
        url: payload,
      };
      break;

    case "externalLink":
      params = {
        ...params,
        link: payload,
        url: payload,
      };
      break;

    default:
      params = {
        ...params,
        url: window?.location?.href,
      };
  }

  await axios({
    method: "get",
    url: process.env.NEXT_PUBLIC_MATOMO_URL,
    params,
  });
};

export const generateURL = (pathNodes) =>
  `${window?.location?.origin}${pathNodes
    .map((node) => `/${removePrefix(node)}`)
    .join("")}`;

export const getLinkLength = (level, pathLength) =>
  (LINKLENGTHS[level] ? LINKLENGTHS[level] : LINKLENGTHS.at(-1)) *
  getFactor("LINKLENGTH") *
  (1 - 1 / (10 - pathLength));

export const handleSearch = async (queryString, category, setAppState) => {
  setAppState((prev) => ({
    ...prev,
    search: { ...prev.search, showResults: true, isLoading: true },
  }));

  if (category === "default") {
    return setAppState((prev) => ({
      ...prev,
      search: { ...prev.search, error: "DEFAULT_CATEGORY" },
    }));
  }

  if (!queryString) {
    return setAppState((prev) => ({
      ...prev,
      search: { ...prev.search, error: "QUERY_EMPTY" },
    }));
  }

  trackAction("search", `${removePrefix(category)}: ${queryString}`);

  const result = await axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API}search`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ query: queryString, category: category }),
  });

  setAppState((prev) => ({
    ...prev,
    search: { ...prev.search, results: result.data, isLoading: false },
  }));
};

export const getIndex = async (setAppState) => {
  const result = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API}getIndex`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  setAppState((prev) => ({
    ...prev,
    search: { ...prev.search, index: result.data },
  }));
};

export const filterIndex = (index, category) =>
  index
    .filter(({ categories }) => categories.includes(category))
    .map((el) => ({ ...el, value: el.name }));

const getFactor = (type) => {
  switch (type) {
    case "LINKLENGTH":
      return LINKLENGTHFACTORS.filter(
        (item) => item.minWidth < window.innerWidth
      ).at(-1).factor;
    default:
      return RADIUSFACTORS.filter(
        (item) => item.minWidth < window.innerWidth
      ).at(-1).factor;
  }
};
