import { STYLES } from "@/lib/const";

export const getNodeStyle = (nodeType, property) => {
  return STYLES.filter((style) => style.nodeType === nodeType)[0].properties[
    property
  ];
};

export const mergeGraphData = (previousGraph, newGraph) => {
  const mergedNodes = newGraph.nodes.map((newGraphNode) => {
    const existingPreviousGraphNode = previousGraph.nodes.filter(
      (previousGraphNode) => previousGraphNode.id === newGraphNode.id
    );
    
    return existingPreviousGraphNode.length > 0
      ? existingPreviousGraphNode[0]
      : newGraphNode;
  });

  const mergedLinks = newGraph.links.map((newGraphLink) => {
    const existingPreviousGraphLink = previousGraph.links.filter(
      ({
        source: { id: previousGraphLinkSourceID },
        target: { id: previousGraphLinkTargetID },
      }) =>
        newGraphLink.source === previousGraphLinkSourceID &&
        newGraphLink.target === previousGraphLinkTargetID
    );

    return existingPreviousGraphLink.length > 0
      ? existingPreviousGraphLink[0]
      : newGraphLink;
  });

  const mergedGraph = { nodes: mergedNodes, links: mergedLinks };

  console.log("previous graph data: ", previousGraph);
  console.log("new graph data: ", newGraph);
  console.log("merged graph data: ", mergedGraph);
  console.log("=========================");

  return mergedGraph;
};
