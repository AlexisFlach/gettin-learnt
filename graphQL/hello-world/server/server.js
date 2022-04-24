const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  schema {
    Query: query
  }
  type Query {
    greeting: String
  }
`;

// needs to match the structure of our type definitions
const resolvers = {
  Query: {
    greeting: () => 'Hello World'
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen({ port: 9000 })
  .then((serverInfo) => console.log(`Server running at ${serverInfo.url}`))