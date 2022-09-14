import { Fetcher, Store, SPARQLToQuery } from "rdflib";

const store = new Store();
const fetcher = new Fetcher(store);

export const load = async () => {
  const url = `${typeof window !== "undefined" && window.location.href}${
    process.env.NEXT_PUBLIC_GRAPH_TTL
  }`;

  try {
    await fetcher.load(url);

    const queryString = `SELECT *
                WHERE {
                    ?subject ?predicate ?object .
                }
                LIMIT 10`;

    const query = SPARQLToQuery(queryString, false, store);

    store.query(query, (result) => {
      console.log("query ran");
      console.log("query result: ", result);
    });
  } catch (error) {
    console.log("Oops, something happened: ", error);
  }
};

// search nodes by name

// convert results to json
