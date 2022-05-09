import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { IS_LOGGED_IN } from "./utils/query";

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

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.API_URI,
});

const cache = new InMemoryCache(cacheSettings);

const query = {
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
};

cache.writeQuery(query);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

client.onResetStore(() => client.writeQuery(query));

const app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  app
);
