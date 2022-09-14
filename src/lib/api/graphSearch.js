import { Fetcher, Store, SPARQLToQuery } from "rdflib";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";

const store = new Store();
const fetcher = new Fetcher(store);

export const load = async () => {
  const url =
    "https://raw.githubusercontent.com/apache/jena/main/jena-permissions/src/example/resources/org/apache/jena/security/example/example.ttl";
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
