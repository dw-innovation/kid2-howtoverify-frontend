import { ROOTNODES } from "@/lib/const";
import useAppContext from "@/lib/hooks/useAppContext";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";
import LensIcon from "src/assets/svg/lens";
import axios from "axios";

const SearchBox = () => {
  const { t } = useTranslation("common");

  const {
    setAppState,
    appState: {
      search: { queryString, category },
    },
  } = useAppContext();

  const handleSearch = async (queryString, category) => {
    setAppState((prev) => ({
      ...prev,
      search: { ...prev.search, showResults: true },
    }));
    if (category === "default") {
      return setAppState((prev) => ({
        ...prev,
        search: { ...prev.search, error: "DEFAULT_CATEGORY" },
      }));
    }
    if (!queryString) {
      return setAppState((prev) => ({
        ...prev,
        search: { ...prev.search, error: "QUERY_EMPTY" },
      }));
    }

    const result = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_SEARCH_API,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ queryString: queryString, category: category }),
    });

    setAppState((prev) => ({
      ...prev,
      search: { ...prev.search, results: result.data },
    }));
  };

  return (
    <div className="flex flex-row gap-1 font-montserrat">
      <input
        className="rounded-l-md p-2 flex-1"
        placeholder={t("searchBoxPlaceholder")}
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
      <div className="bg-white px-2">
        <select
          name="category"
          className="bg-white h-full"
          defaultValue="default"
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
      <button
        className="rounded-r-md bg-blue hover:bg-darkBlue aspect-square px-4"
        onClick={() => handleSearch(queryString, category)}
      >
        <LensIcon />
      </button>
    </div>
  );
};

export default SearchBox;
