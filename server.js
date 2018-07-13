const { ApolloServer } = require('apollo-server');
const depthLimit = require('graphql-depth-limit');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(3)],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
