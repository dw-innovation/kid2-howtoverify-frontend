export const SOFTWAREAPPLICATIONPATH = [
  {
    fill: "#B050FA",
    clipRule: "evenodd",
    fillRule: "evenodd",
    stroke: "rgba(0,0,0,.4)",
    d: "M53.497.083l2.75 8.379a21.844 21.844 0 016.985 2.75l6.975-5.115 10.707 8.836-3.263 8.379a29.553 29.553 0 013.722 6.517l8.378.917 2.75 13.493-7.911 4.19c-.468 2.328-.917 5.123-1.403 7.443l6.05 6.05-6.975 12.1-8.846-1.834c-1.834 1.394-3.722 3.254-5.583 4.657l.468 8.837-13.026 4.656-5.583-7.452c-2.304.467-4.68.467-6.985 0l-5.114 7.452-13.036-4.656.468-9.305a26.878 26.878 0 01-5.583-4.656l-8.836 1.833-6.518-11.632 6.05-6.976a16.948 16.948 0 01-1.402-6.985L.834 44.239l2.32-13.493 8.845-1.393c.917-2.329 2.329-4.19 3.722-6.518l-3.254-7.91 10.23-8.837 7.452 4.647a40.417 40.417 0 016.976-2.32l2.75-8.377 13.622.045z",
  },
];
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
