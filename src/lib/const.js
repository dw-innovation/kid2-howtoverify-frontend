export const NODETYPESTYLES = [
  { nodeType: "MediaObject", properties: { radius: 20 } },
  { nodeType: "Question", properties: { radius: 15 } },
  { nodeType: "SubQuestion", properties: { radius: 15 } },
  { nodeType: "Task", properties: { radius: 12 } },
  { nodeType: "SoftwareApplication", properties: { radius: 8 } },
];

export const ROOTNODES = [
  {
    label: "image",
    id: "http://dw.com/Image",
    color: { name: "purple", value: "#791EBF" },
  },
  {
    label: "video",
    id: "http://dw.com/Video",
    color: { name: "blue", value: "#23A6F0" },
  },
  {
    label: "audio",
    id: "http://dw.com/Audio",
    color: { name: "yellow", value: "#DBC700" },
  },
  {
    label: "source",
    id: "http://dw.com/Source",
    color: { name: "red", value: "#E3336A" },
  },
  {
    label: "text",
    id: "http://dw.com/Text",
    color: { name: "green", value: "#40A51A" },
  },
];

export const PREFIX = "http://dw.com/";

export const SAFELIST = [
  "id",
  "commment",
  "name",
  "applicationUrl",
  "publisher",
  "usageInfo",
  "aboutUrl",
];
