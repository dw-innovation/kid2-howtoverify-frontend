import { getLinkedNodes, getLinks, getNodeByID } from "@/lib/api/lib";
import { uniqBy } from "lodash";

export const searchByNodes = (pathNodes) => {
  const graph = { nodes: [], links: [] };

  pathNodes.map((nodeID) => {
    const partialGraph = { nodes: [], links: [] };
    const node = getNodeByID(nodeID);

    if (node) {
      partialGraph.nodes.push(node);

      getLinkedNodes(node.id).map((linkedNode) =>
        partialGraph.nodes.push(linkedNode)
      );

      getLinks(node.id).map((link) => partialGraph.links.push(link));

      partialGraph.links.map((link) => graph.links.push(link));

      partialGraph.nodes.map((partialNode) => graph.nodes.push(partialNode));
    }
  });

  const uniqueNodes = uniqBy(graph.nodes, "id").map((node) => ({
    ...node,
    vx: 0,
    vy: 0,
  }));

  graph.nodes = uniqueNodes;
  return graph;
};

export const searchByText = (_) => {};
