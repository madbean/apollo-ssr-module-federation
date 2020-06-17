import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Frame from "home/Frame";
import store from "checkout/store";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh"
});

const SearchPage = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Frame page="search" />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<SearchPage />, document.getElementById("app"));
