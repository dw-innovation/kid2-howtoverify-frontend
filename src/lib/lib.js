import { STYLES } from "@/lib/const";

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