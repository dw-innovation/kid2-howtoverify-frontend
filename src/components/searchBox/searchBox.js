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
      className="flex flex-row font-montserrat mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(queryString);
      }}
    >
      <div className="bg-blue-primary aspect-square px-4 flex justify-center items-center">
        <LensIcon />
      </div>
      <AutoCompleteSearch />
    </form>
  );
};

export default SearchBox;
