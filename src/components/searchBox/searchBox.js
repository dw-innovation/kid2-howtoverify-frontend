import { ROOTNODES } from "@/lib/const";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import LensIcon from "src/assets/svg/lens";

const SearchBox = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-row gap-1 font-noto">
      <input
        className="rounded-l-md p-2 flex-1"
        placeholder={t("searchBoxPlaceholder")}
      />{" "}
      <select name="category" className="bg-white h-full" defaultValue="default">
        <option value="default" disabled>
          {t("searchCategory")}
        </option>
        {ROOTNODES.map((node, index) => (
          <option value={node.id} key={index}>
            {node.label}
          </option>
        ))}
      </select>
      <button className="rounded-r-md bg-blue hover:bg-darkBlue h-full px-2">
        <LensIcon />
      </button>
    </div>
  );
};

export default SearchBox;
