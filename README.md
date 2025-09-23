<img width="1280" height="200" alt="Github-Banner__htv" src="https://github.com/user-attachments/assets/47682c9c-74a1-4bf6-bd70-0bf3fc563a63" />

# NextJS frontend for the KID2 knowledge graph website on verification worflows

This frontend application renders and explorable network graph of knowledge on verification workflows. To get the app up and running perform the following steps:

1. clone the repository
2. create a `.env` file in the root directory and set the environment variable `NEXT_PUBLIC_GRAPH_API`
3. run `npm install` to install the dependencies
4. run `npm run dev` to spin up the development server

- run `npm run build` to build the app
- run `npm run start` to serve (locally) a previously built version of the app

## Update texts

The text content of the app is stored in a `.json` file in this repository under `/locales/en/common.json`. Update the respective strings and restart or rebuild the app. In the strings you are allowed to use HTML tags that will be rendered in the respective place.
