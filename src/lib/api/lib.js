import { Fetcher, Store } from "rdflib";
import { Namespace } from "rdflib";

const RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const DW = Namespace("http://dw.com/");

const nodeType = RDF("type");
const link = DW("link");
const nodeName = DW("name");

export const store = new Store();

export const loadGraph = async () => {
  const fetcher = new Fetcher(store);
  const url = `${typeof window !== "undefined" && window.location.href}${
    process.env.NEXT_PUBLIC_GRAPH_TTL
  }`;

  try {
    await fetcher.load(url);
  } catch (error) {
    console.log("Couldn't load graph. Error message: ", error);
  }
};

export const getLinkedNodes = (nodeID) => {
  const nodes = [];

  let resultLinks = store.each(DW(nodeID), link, undefined);

  resultLinks.map(({ value: linkNodeID }) => {
    nodes.push(getNodeByID(linkNodeID.replace("http://dw.com/", "")));
  });

  return nodes;
};

export const getLinks = (nodeID) => {
  const links = [];

  let resultLinks = store.each(DW(nodeID), link, undefined);

  resultLinks.map(({ value: linkNodeID }) => {
    links.push({
      source: nodeID,
      target: getNodeByID(linkNodeID.replace("http://dw.com/", "")).id,
    });
  });

  return links;
};

export const getNodeByID = (nodeID) => {
  let resultType = store.each(
    DW(nodeID.replace("http://dw.com/", "")),
    nodeType,
    undefined
  );

  const node = {};

  if (resultType.length > 0) {
    let resultName = store.each(DW(nodeID), nodeName, undefined);
    node.name = resultName[0].value;
    node.type = resultType[0].value;
    node.id = nodeID;

    return node;
  } else {
    return false;
  }
};

export const addNodeToPath = (nodeID, level, pathNodes) => {
  if (pathNodes.click_history.length <= level) {
    return { click_history: [...pathNodes.click_history, nodeID] };
  } else {
    const history = Object.assign([], pathNodes.click_history);
    history[level] = nodeID;
    return { click_history: history.slice(0, level + 1) };
  }
};
