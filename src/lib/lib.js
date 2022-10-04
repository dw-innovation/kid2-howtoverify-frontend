import { STYLES } from "@/lib/const";

export const getNodeStyle = (nodeType, property) => {
  return STYLES.filter(
    (style) => style.nodeType === nodeType.replace("http://dw.com/", "")
  )[0]?.properties[property];
};
