import { findLinkedNodes, findLinks, findNodeByID } from "@/lib/api/lib";

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

  const uniqueNodes = graph.nodes
    .map((node) => node.id)
    .map((id) => graph.nodes.find((a) => a.id === id));

  graph.nodes = uniqueNodes;
  return graph;
};

export const searchByText = (_) => {};
