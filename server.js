import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { ApolloEngine } from 'apollo-engine';
import depthLimit from 'graphql-depth-limit';
import bodyParser from 'body-parser';
import compression from 'compression';
import schema from './src/schema';

require('dotenv').config();

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
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen(
  {
    port: GRAPHQL_PORT,
    graphqlPaths: ['/graphql'],
    expressApp: app,
    launcherOptions: {
      startupTimeout: 3000,
    },
  },
  () =>
    console.log(
      `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
);
