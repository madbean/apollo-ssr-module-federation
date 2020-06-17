import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Frame from "./Frame";
import store from "checkout/store";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh"
});

const HomePage = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Frame page="home" />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<HomePage />, document.getElementById("app"));
