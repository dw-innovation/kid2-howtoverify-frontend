import { create } from "zustand";
import produce from "immer";

const useSessionStore = create((set) => ({
  pathNodes: [],
  addPathNode: (nodeID, level) =>
    set(
      produce((draft) => {
        if (draft.pathNodes.length <= level) {
          draft.pathNodes.push(nodeID);
        } else {
          console.log("replacing node at level", level, "with", nodeID);
          const history = Object.assign([], draft.pathNodes);
          history[level] = nodeID;
          draft.pathNodes = history.slice(0, level + 1);
        }
      })
    ),
  clearPathNodes: () =>
    set(
      produce((draft) => {
        draft.pathNodes = [];
      })
    ),
  resetRootNode: (nodeID) =>
    set(
      produce((draft) => {
        draft.pathNodes = [nodeID];
      })
    ),
  replacePathNodes: (nodeIDs) =>
    set(
      produce((draft) => {
        draft.pathNodes = nodeIDs;
      })
    ),
  truncatePathNodes: (position) =>
    set(
      produce((draft) => {
        draft.pathNodes = draft.pathNodes.slice(0, position + 1);
      })
    ),
  modal: {
    isOpen: false,
    content: "",
  },
  toggleModal: (state) =>
    set(
      produce((draft) => {
        draft.modal.isOpen = state === undefined ? !draft.modal.isOpen : state;
      })
    ),
  setModalContent: (contentString) =>
    set(
      produce((draft) => {
        draft.modal.content = contentString;
      })
    ),
  search: {
    queryString: "",
    results: [],
    index: [],
    showResults: false,
    error: "",
    isLoading: false,
  },
  setSearchQueryString: (newQueryString) =>
    set(
      produce((draft) => {
        draft.search.queryString = newQueryString;
      })
    ),
  clearSearchQueryString: () =>
    set(
      produce((draft) => {
        draft.search.queryString = "";
      })
    ),
  setSearchResults: (newResults) =>
    set(
      produce((draft) => {
        draft.search.results = newResults;
      })
    ),
  setSearchIndex: (newIndex) =>
    set(
      produce((draft) => {
        draft.search.index = newIndex;
      })
    ),
  toggleShowResults: (state) =>
    set(
      produce((draft) => {
        draft.search.showResults =
          state === undefined ? !draft.search.showResults : state;
      })
    ),
  toggleIsLoading: (state) =>
    set(
      produce((draft) => {
        draft.search.isLoading =
          state === undefined ? !draft.search.isLoading : state;
      })
    ),
  footerHeight: 0,
  setFooterHeight: (height) =>
    set(
      produce((draft) => {
        draft.footerHeight = height;
      })
    ),
  headerHeight: 0,
  setHeaderHeight: (height) =>
    set(
      produce((draft) => {
        draft.headerHeight = height;
      })
    ),
}));

export default useSessionStore;
