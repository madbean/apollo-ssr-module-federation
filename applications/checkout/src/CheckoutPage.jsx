import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Frame from "home/Frame";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh"
});

const CheckoutPage = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Frame page="checkout" />
      </ApolloProvider>
    </Provider>
  );
};

ReactDOM.render(<CheckoutPage />, document.getElementById("app"));
