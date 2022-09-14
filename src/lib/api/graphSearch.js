import { Fetcher, Namespace, Store, SPARQLToQuery } from "rdflib";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";

const store = new Store();
const fetcher = new Fetcher(store);

// load ttl/rdf file
export const load = () => {
  const url =
    "https://raw.githubusercontent.com/apache/jena/main/jena-permissions/src/example/resources/org/apache/jena/security/example/example.ttl";
  fetcher.nowOrWhenFetched(url, (ok, body, response) => {
    if (!ok) {
      console.log("Oops, something happened and couldn't fetch data " + body);
    } else if (response.onErrorWasCalled || response.status !== 200) {
      console.log(
        "    Non-HTTP error reloading data! onErrorWasCalled=" +
          response.onErrorWasCalled +
          " status: " +
          response.status
      );
    } else {
      console.log("---data loaded---");

      const sparqlQuery = `SELECT *
            WHERE {
                ?subject ?predicate ?object .
            }
            LIMIT 10`;

      const query = SPARQLToQuery(sparqlQuery, false, store);

      store.query(query, (result) => {
        console.log("query ran");
        console.log("result: ",result);
      });
    }
  });
};

// search nodes by name

// convert results to json
