import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from "react-router-dom";

import Frame from "home/Frame";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh",
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const CheckoutPage = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Frame page="checkout" />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};

ReactDOM.hydrate(<CheckoutPage />, document.getElementById("app"));
