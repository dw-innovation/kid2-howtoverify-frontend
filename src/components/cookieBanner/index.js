import dynamic from "next/dynamic";

const DynamicCookieBanner = dynamic(() => import("./cookieBanner"), {
  ssr: false,
});

export default DynamicCookieBanner;
