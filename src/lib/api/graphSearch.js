import { Fetcher, Namespace, Store, SPARQLToQuery } from "rdflib";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";

const store = new Store();
const fetcher = new Fetcher(store);

// load ttl/rdf file
export const load = () => {
    const url = "https://raw.githubusercontent.com/apache/jena/main/jena-permissions/src/example/resources/org/apache/jena/security/example/example.ttl";
    fetcher.nowOrWhenFetched(url,  (ok, body, response) => {
        if (!ok) {
            console.log("Oops, something happened and couldn't fetch data " + body);
        } else if (response.onErrorWasCalled || response.status !== 200) {
            console.log('    Non-HTTP error reloading data! onErrorWasCalled=' + response.onErrorWasCalled + ' status: ' + response.status)
        } else {
            console.log("---data loaded---")

            /*const sparqlQuery = `PREFIX ex: <http://example.com/>
                SELECT ?s ?o
                WHERE ?s ex:msg ?o`;*/
            const sparqlQuery = "SELECT *";

            const query = SPARQLToQuery(sparqlQuery, false, store);

            store.query(query, (result) => {
                console.log('query ran');
                console.log(result);
            });

    /*        let ex = Namespace("http://example.com/");
            let rdf = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
            let msg = ex('msg');
            let msgTo = ex('to');
            let msgFrom = ex('from');
            let subj = ex('subj');

            console.log(store);


            let result = store.any(null, msgTo);

            console.log("result:", result);*/

            //
            // let nodes = store.list();
            // console.log("nodes: ", nodes);
        }
    })
}


// search nodes by name


// convert results to json
