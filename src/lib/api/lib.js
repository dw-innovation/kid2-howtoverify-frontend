import { Fetcher, Store } from "rdflib";

export const store = new Store();

export const load = async () => {
    const fetcher = new Fetcher(store);
    const url = `${typeof window !== "undefined" && window.location.href}${
        process.env.NEXT_PUBLIC_GRAPH_TTL
    }`;

    try {
        await fetcher.load(url);
    } catch (error) {
        console.log("Oops, something happened: ", error);
    }
};

export const convertToJSON = () => {
    // TODO: add conversion function
};