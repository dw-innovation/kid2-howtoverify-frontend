export const NODETYPESTYLES = [
  { nodeType: "MediaObject", properties: { radius: 40 } },
  { nodeType: "Question", properties: { radius: 30 } },
  { nodeType: "SubQuestion", properties: { radius: 25 } },
  { nodeType: "Task", properties: { radius: 20 } },
  { nodeType: "SoftwareApplication", properties: { radius: 15 } },
];

export const ROOTNODES = [
  {
    label: "Image",
    id: "http://dw.com/Image",
    color: { name: "purple", value: "#791EBF" },
  },
  {
    label: "Video",
    id: "http://dw.com/Video",
    color: { name: "blue", value: "#23A6F0" },
  },
  {
    label: "Audio",
    id: "http://dw.com/Audio",
    color: { name: "yellow", value: "#DBC700" },
  },
  {
    label: "Source",
    id: "http://dw.com/Source",
    color: { name: "red", value: "#E3336A" },
  },
  {
    label: "Text",
    id: "http://dw.com/Text",
    color: { name: "green", value: "#40A51A" },
  },
];

export const PREFIX = "http://dw.com/";

export const SAFELIST = [
  "comment",
  "applicationUrl",
  "publisher",
  "usageInfo",
  "aboutUrl",
  "howTo",
  "remarks",
];

export const LINKLENGTHS = [50, 40, 30, 15];

export const LINKLENGTHFACTORS = [
  { minWidth: 0, factor: 0.8 },
  { minWidth: 640, factor: 0.9 },
  { minWidth: 768, factor: 1 },
  { minWidth: 1024, factor: 1.2 },
  { minWidth: 1280, factor: 1.5 },
  { minWidth: 1536, factor: 1.8 },
];

export const RADIUSFACTORS = [
  { minWidth: 0, factor: 0.8 },
  { minWidth: 640, factor: 0.9 },
  { minWidth: 768, factor: 1 },
  { minWidth: 1024, factor: 1.1 },
  { minWidth: 1280, factor: 1.2 },
  { minWidth: 1536, factor: 1.4 },
];

