import { findLinkedNodes, findLinks, findNodeByID } from "@/lib/api/lib";
import { uniqBy } from "lodash";

export const searchByNodes = (nodes) => {
  const graph = { nodes: [], links: [] };

  nodes.map((nodeID) => {
    const partialGraph = { nodes: [], links: [] };
    const node = findNodeByID(nodeID);

    if (node) {
      partialGraph.nodes.push(node);

      findLinkedNodes(node.id).map((linkedNode) =>
        partialGraph.nodes.push(linkedNode)
      );

      findLinks(node.id).map((link) => partialGraph.links.push(link));

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
