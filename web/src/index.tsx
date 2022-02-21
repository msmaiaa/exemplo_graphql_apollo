import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const server_url = "http://localhost:4000/graphql";
const client = new ApolloClient({
  uri: server_url,
  cache: new InMemoryCache(),
});

const AppWrapper = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

reportWebVitals();
