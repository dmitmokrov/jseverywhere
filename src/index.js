require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const depthLimit = require("graphql-depth-limit");

const { ApolloServer } = require("apollo-server-express");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

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
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
      const token = req.headers.authorization;
      const user = getUser(token);
      return { models, user };
    },
  });

  app.use(helmet());
  app.use(cors());
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
