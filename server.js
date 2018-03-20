const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { ApolloEngine } = require('apollo-engine');
const depthLimit = require('graphql-depth-limit');
const bodyParser = require('body-parser');
const compression = require('compression');
const schema = require('./src/schema');

require('now-env');

const GRAPHQL_PORT = 3000;

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
});

const app = express();

app.use(compression());
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
    validationRules: [depthLimit(3)],
  })
);
app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

const PORT = process.env.PORT || GRAPHQL_PORT;

engine.listen(
  {
    port: PORT,
    graphqlPaths: ['/graphql'],
    expressApp: app,
    launcherOptions: {
      startupTimeout: 3000,
    },
  },
  () => console.log(`GraphiQL is now running on port ${PORT}`)
);
