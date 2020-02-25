import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { DefineAPI } from "./components/DefineAPI";
import { DeployAPI } from "./components/DeployAPI";
import { ListAPIs } from "./components/ListAPIs";
import { Navbar } from "./components/Navbar";
import { ALL, DEPLOY, NEW } from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:8080/query"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={Navbar} />
        <div className="App">
          <Switch>
            <Route path={NEW} exact={true} component={DefineAPI} />
            <Route path={"/:id" + DEPLOY} exact={true} component={DeployAPI} />
            <Route path={ALL} exact={true} component={ListAPIs} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
