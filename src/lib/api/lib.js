import { Fetcher, Store } from "rdflib";
import { Namespace } from "rdflib";

const RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const DW = Namespace("http://dw.com/");
const SCHEMA = Namespace("https://schema.org/");

const nodeType = RDF("type");
const nodeName = SCHEMA("name");

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

  let resultLinks = store.match(null, null, DW(nodeID));

  if (resultLinks.length === 0) {
    resultLinks = store.match(DW(nodeID), null, null);
    resultLinks.forEach((st) => {
      if (st.object.termType === "NamedNode") {
        let stObject = getNodeByID(
          st.object.value.replace("http://dw.com/", "")
        );
        if (typeof stObject.id !== "undefined") {
          nodes.push(stObject);
        }
      }
    });
  } else {
    resultLinks.forEach((st) => {
      let stSubject = getNodeByID(
        st.subject.value.replace("http://dw.com/", "")
      );
      if (st.subject.termType === "NamedNode") {
        if (typeof stSubject.id !== "undefined") {
          nodes.push(stSubject);
        }
      }
    });
  }

  return nodes;
};

export const getLinks = (nodeID) => {
  const links = [];

  let resultLinks = store.match(null, null, DW(nodeID));

  if (resultLinks.length === 0) {
    resultLinks = store.match(DW(nodeID), null, null);
    resultLinks.forEach((st) => {
      if (
        st.object.termType === "NamedNode" &&
        st.subject.termType === "NamedNode"
      ) {
        let target = getNodeByID(
          st.object.value.replace("http://dw.com/", "")
        ).id;

        if (typeof target !== "undefined") {
          links.push({
            source: getNodeByID(st.subject.value.replace("http://dw.com/", ""))
              .id,
            target: target,
          });
        }
      }
    });
  } else {
    resultLinks.forEach((st) => {
      if (
        st.subject.termType === "NamedNode" &&
        st.object.termType === "NamedNode"
      ) {
        let target = getNodeByID(
          st.subject.value.replace("http://dw.com/", "")
        ).id;

        if (typeof target !== "undefined") {
          links.push({
            source: getNodeByID(st.object.value.replace("http://dw.com/", ""))
              .id,
            target: getNodeByID(st.subject.value.replace("http://dw.com/", ""))
              .id,
          });
        }
      }
    });
  }

  return links;
};

export const getNodeByID = (nodeID) => {
  let resultType = store.each(DW(nodeID), nodeType, undefined);

  const node = {};

  if (resultType.length > 0) {
    let resultName = store.each(DW(nodeID), nodeName, undefined);
    node.name = resultName[0].value;
    node.type = resultType[0].value.replace("http://dw.com/", "");
    node.id = nodeID;

    return node;
  } else {
    return false;
  }
};

export const addNodeToPath = (nodeID, pathNodes) => {
  const newNode = getNodeByID(nodeID);

  switch (newNode.type) {
    case "MediaObject":
      return [nodeID];
    case "Question":
      return [pathNodes[0], nodeID];
    case "Workflow":
      return [pathNodes[0], pathNodes[1], nodeID];
    case "Tool":
      return [pathNodes[0], pathNodes[1], pathNodes[2], nodeID];
  }
};
