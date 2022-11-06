export const NODETYPESTYLES = [
  { nodeType: "MediaObject", properties: { radius: 20 } },
  { nodeType: "Question", properties: { radius: 15 } },
  { nodeType: "SubQuestion", properties: { radius: 15 } },
  { nodeType: "Task", properties: { radius: 12 } },
  { nodeType: "SoftwareApplication", properties: { radius: 8 } },
];

export const ROOTNODES = [
  { label: "image", id: "http://dw.com/Image", color: "purple" },
  { label: "video", id: "http://dw.com/Video", color: "blue" },
  { label: "audio", id: "http://dw.com/Audio", color: "yellow" },
  { label: "source", id: "http://dw.com/Source", color: "red" },
  { label: "text", id: "http://dw.com/Text", color: "green" },
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
