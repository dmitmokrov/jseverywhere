import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const cacheSettings = {
  typePolicies: {
    Query: {
      fields: {
        noteFeed: {
          keyArgs: false,
          merge(existing, incoming) {
            const existingNotes = existing ? existing.notes : [];
            return {
              notes: [...existingNotes, ...incoming.notes],
              cursor: incoming.cursor,
              hasNextPage: incoming.hasNextPage,
            };
          },
        },
      },
    },
  },
};

const client = new ApolloClient({
  uri: process.env.API_URI,
  cache: new InMemoryCache(cacheSettings),
  connectToDevTools: true,
});

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  app
);
