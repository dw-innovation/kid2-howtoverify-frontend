import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import LensIcon from "src/assets/svg/lens";
import { getIndex, handleSearch } from "@/lib/lib";
import AutoCompleteResults from "../autoCompleteResults";

const SearchBox = () => {
  const { t } = useTranslation("common");

  const {
    setAppState,
    appState: {
      search: { queryString, category },
    },
  } = useAppContext();

  useEffect(() => {
    getIndex(setAppState);
  }, []);

  return (
    <form
      className="flex flex-row gap-1 font-montserrat"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(queryString, category, setAppState);
      }}
    >
      <div className="rounded-l-md bg-white px-2">
        <select
          name="category"
          className="bg-white h-full"
          value={category}
          onChange={(e) =>
            setAppState((prev) => ({
              ...prev,
              search: { ...prev.search, category: e.target.value, error: "" },
            }))
          }
        >
          <option value="default" disabled>
            {t("searchCategory")}
          </option>
          {ROOTNODES.map((node, index) => (
            <option value={node.id} key={index}>
              {node.label}
            </option>
          ))}
        </select>
      </div>
      <AutoCompleteResults/>
      <button
        className="rounded-r-md bg-blue hover:bg-darkBlue aspect-square px-4"
        onClick={() => handleSearch(queryString, category, setAppState)}
        type="submit"
      >
        <LensIcon />
      </button>
    </form>
  );
};

export default SearchBox;
