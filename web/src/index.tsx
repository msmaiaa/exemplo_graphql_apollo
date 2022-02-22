import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const server_url = "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: server_url,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("gql_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//  aqui nós usamos utilizamos o "link" para setar o token automaticamente em todas as requests com o setContext
//  o padrão seria passar a chave "uri" com o valor sendo a url da api
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const AppWrapper = () => {
  return (
    <ApolloProvider client={client}>
      <App />
      <ToastContainer />
    </ApolloProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

reportWebVitals();
