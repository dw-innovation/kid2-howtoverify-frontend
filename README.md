# NextJS frontend for the KID2 knowledge graph website on verification worflows

This frontend application renders and explorable network graph of knowledge on verification workflows. To get the app up and running perform the following steps:
- clone the repository
- put the network graph data as `.ttl` file in the `/public` directory
- create a `.env` file in the root directory and set the environment variable `NEXT_PUBLIC_GRAPH_TTL` to the file name of the graph data file
- run `npm install` to install the dependencies
- run `npm run dev` to spin up the development server
- run `npm run build` to build the project
- run `npm run start` to serve (locally) a previously built version of the app   
## Update the graph data
Replace the `.ttl` file that lives in `/public` and change the environment variable accordingly if you change the file name. 