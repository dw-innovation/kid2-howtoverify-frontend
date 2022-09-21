import { STYLES } from "@/lib/const";

export const getNodeStyle = (nodeType, property) => {
  return STYLES.filter((style) => style.nodeType === nodeType)[0].properties[property];
};
