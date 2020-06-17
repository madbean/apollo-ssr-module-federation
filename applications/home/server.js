import express from "express";
import path from "path";

import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';
import { InMemoryCache } from "apollo-cache-inmemory";

import React from "react";
import { renderToString } from "react-dom/server";

import Frame from "./src/Frame";

const Html = ({ content, state }) => {
  return (
    <html>
      <head>
        <script src="http://localhost:8080/remoteEntry.js"></script>
        <script src="http://localhost:8081/remoteEntry.js"></script>
        <script src="http://localhost:8082/remoteEntry.js"></script>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }} />
        <script src="http://localhost:8080/main.js"></script>
      </body>
    </html>
  );
}

const app = express();

app.use(express.static(path.resolve( __dirname, "../dist")));

app.use((req, res) => {
  const endpoint = 'https://graphql-pokemon.now.sh'

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: endpoint,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Frame page={req.originalUrl} />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(App).then((content) => {
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;
  
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
    res.end();
  });
});

app.listen( 5000 );