export const SOFTWAREAPPLICATIONPATH = [
  {
    fill: "#B050FA",
    clipRule: "evenodd",
    fillRule: "evenodd",
    stroke: "rgba(0,0,0,.4)",
    d: "M22.497 89.174c-1.54 1.29-3.86 1.11-5.2-.41l-9.79-11.12c-1.33-1.51-1.22-3.85.24-5.21l4.41-4.1c1.47-1.36 2.33-4.07 1.94-6.02l-1.88-9.27c-.4-1.96-2.25-4.11-4.13-4.8l-5.65-2.07c-1.88-.69-2.89-2.79-2.24-4.71l4.72-14.04c.64-1.91 2.72-2.98 4.63-2.4l5.75 1.77c1.91.59 4.69-.01 6.19-1.33l7.1-6.25c1.5-1.32 2.44-4 2.1-5.97l-1.04-5.93c-.35-1.97.97-3.89 2.96-4.3l14.53-2.94c1.98-.4 3.94.86 4.39 2.81l1.34 5.87c.45 1.95 2.36 4.06 4.25 4.69l8.97 3.02c1.9.64 4.69.11 6.22-1.17l4.62-3.86c1.54-1.29 3.86-1.11 5.2.41l9.79 11.12c1.33 1.51 1.22 3.85-.24 5.21l-4.41 4.1c-1.47 1.36-2.33 4.07-1.94 6.02l1.88 9.27c.4 1.96 2.25 4.11 4.12 4.8l5.65 2.07c1.88.69 2.89 2.79 2.24 4.71l-4.73 14.04c-.64 1.91-2.72 2.99-4.63 2.4l-5.75-1.77c-1.91-.59-4.69.01-6.19 1.33l-7.1 6.25c-1.5 1.32-2.44 4-2.1 5.97l1.04 5.93c.34 1.97-.97 3.89-2.96 4.3l-14.52 2.94c-1.98.4-3.94-.86-4.39-2.81l-1.34-5.87c-.45-1.95-2.36-4.06-4.25-4.69l-8.97-3.02c-1.9-.64-4.69-.11-6.22 1.17l-4.62 3.86h.01z",
  },
];
export const NODETYPESTYLES = [
  { nodeType: "MediaObject", properties: { radius: 40 } },
  { nodeType: "Question", properties: { radius: 30 } },
  { nodeType: "SubQuestion", properties: { radius: 25 } },
  { nodeType: "Task", properties: { radius: 20 } },
  { nodeType: "SoftwareApplication", properties: { radius: 10 } },
];

export const ROOTNODES = [
  {
    name: "Image",
    id: "http://dw.com/Image",
    color: { name: "purple", value: "#791EBF" },
  },
  {
    name: "Video",
    id: "http://dw.com/Video",
    color: { name: "blue", value: "#23A6F0" },
  },
  {
    name: "Audio",
    id: "http://dw.com/Audio",
    color: { name: "yellow", value: "#DBC700" },
  },
  {
    name: "Source",
    id: "http://dw.com/Source",
    color: { name: "red", value: "#E3336A" },
  },
  {
    name: "Text",
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
