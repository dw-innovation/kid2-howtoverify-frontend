import useAppContext from "@/lib/hooks/useAppContext";
import React, { useEffect } from "react";
import LensIcon from "src/assets/svg/lens";
import { getIndex, handleSearch } from "@/lib/lib";
import AutoCompleteResults from "../autoCompleteResults";

const SearchBox = () => {
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
      className="flex flex-row gap-1 font-montserrat mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(queryString, category, setAppState);
      }}
    >
      <div className="rounded-l-md bg-blue aspect-square px-4 flex justify-center items-center">
        <LensIcon />
      </div>
      <AutoCompleteResults />
    </form>
  );
};

export default SearchBox;
