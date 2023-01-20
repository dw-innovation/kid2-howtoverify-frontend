import React, { useEffect } from "react";
import LensIcon from "src/assets/svg/lens";
import { getIndex, handleSearch } from "@/lib/lib";
import AutoCompleteSearch from "../autoCompleteSearch";
import useSessionStore from "@/lib/stores/useSessionStore";

const SearchBox = () => {
  const queryString = useSessionStore((state) => state.search.queryString);

  useEffect(() => {
    getIndex();
  }, []);

  return (
    <form
      className="flex flex-row font-montserrat"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(queryString);
      }}
      id="featureTour-6"
    >
      <div className="flex aspect--1-1 items-center justify-center bg-blue-primary px-4">
        <LensIcon />
      </div>
      <div className="flex w-full">
        <AutoCompleteSearch />
      </div>
    </form>
  );
};

export default SearchBox;
