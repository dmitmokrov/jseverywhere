require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
];

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Session invalid");
    }
  }
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const db = require("./db");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
      const user = getUser(token);
      console.log(user);
      return { models, user };
    },
  });

  db.connect(DB_HOST);
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
  app.get("/", (req, res) => res.send("Hello World!"));
  app.listen({ port }, () => {
    console.log(
      `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startApolloServer(typeDefs, resolvers);
