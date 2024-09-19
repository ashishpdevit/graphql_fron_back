const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query');
const  getUserFromToken = require('./middleware/getUserFromToken');

const server = new ApolloServer({
  typeDefs,
  // resolvers,
  resolvers: {
    Query,
    Mutation,
  },
  context: async ({ req }) => {
    const userInfo = await getUserFromToken(req.headers.authorization)
    return userInfo;
  }
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});