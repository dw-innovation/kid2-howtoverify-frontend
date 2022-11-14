import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import LensIcon from "src/assets/svg/lens";
import { handleSearch } from "@/lib/lib";

const SearchBox = () => {
  const { t } = useTranslation("common");

  const {
    setAppState,
    appState: {
      search: { queryString, category },
    },
  } = useAppContext();

  return (
    <div className="flex flex-row gap-1 font-montserrat">
      <div className="rounded-l-md bg-white px-2">
        <select
          name="category"
          className="bg-white h-full"
          defaultValue="default"
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
      <input
        className="p-2 flex-1"
        placeholder={t("searchBoxPlaceholder")}
        disabled={category === "default"}
        onChange={(e) =>
          setAppState((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              queryString: e.target.value,
              showResults: true,
            },
          }))
        }
      />

      <button
        className="rounded-r-md bg-blue hover:bg-darkBlue aspect-square px-4"
        onClick={() => handleSearch(queryString, category, setAppState)}
      >
        <LensIcon />
      </button>
    </div>
  );
};

export default SearchBox;
