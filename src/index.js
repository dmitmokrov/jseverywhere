require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];
  
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: async () => await models.Note.find(),
    note: async (parent, {id}) => await models.Note.findById(id),
  },
  Mutation: {
    newNote: async (parent, {content}) => {
      return await models.Note.create({
        content,
        author: 'Adam Scott',
      });
    }
  }
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const db = require('./db');
  const server = new ApolloServer({ typeDefs, resolvers });

  db.connect(DB_HOST);
  await server.start();
  server.applyMiddleware({ app, path: '/api' });
  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen({ port }, () => {
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
