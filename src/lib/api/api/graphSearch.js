import { SPARQLToQuery } from "rdflib";
import { store } from "@/lib/api/lib"

export const searchByNodes = (_) => {
/*
    let RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    let DW = Namespace("http://dw.com/");
    let nodeType = RDF('type');
    let link = DW('link');
    let nodeName = DW('name');
    let nodeQ = DW('q-image-who');
    let nodeItImage = DW('it-image');

    let results = store.each(undefined, nodeType, 'inputType');
    results.map(result => console.log(result))
*/

    /*
    var queryString = "PREFIX ex:  <http://example.com/> \n"+
        "SELECT ?msg \n"+
        "WHERE {\n"+
        " ?msg ex:from bob . \n" +
        "}";
     */

const queryString = "PREFIX dw:  <http://dw.com/> \n"+
    "SELECT ?obj \n"+
    "WHERE {\n"+
    " dw:it-image dw:link ?obj . \n" +
    "}";


    /*
    const queryString = `
                        SELECT ?o
                        WHERE {
                            :it-image :link ?o .
                        }
                        `;

     */

    const query = SPARQLToQuery(queryString, false, store);

    store.query(query, (result) => {
        console.log("query ran");
        console.log("query result: ", result);
    });
}

export const searchByText = (_) => {

}
