import dynamic from "next/dynamic";

const DynamicAutoCompleteSearch = dynamic(() => import("./autoCompleteSearch"), {
  ssr: false,
});

export default DynamicAutoCompleteSearch;
