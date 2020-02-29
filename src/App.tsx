import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthAPI } from "./components/AuthAPI";
import { DefineAPI } from "./components/DefineAPI";
import { DeployAPI } from "./components/DeployAPI";
import { ListAPIs } from "./components/ListAPIs";
import { Navbar } from "./components/Navbar";
import { TestAPI } from "./components/TestAPI";
import {
  AUTH_API,
  DEPLOY_API,
  EDIT_API,
  LIST_APIS,
  NEW_API,
  TEST_API
} from "./routes";

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
            <Route path={NEW_API} exact={true} component={DefineAPI} />
            <Route path={EDIT_API(":id")} exact={true} component={DefineAPI} />
            <Route path={AUTH_API(":id")} exact={true} component={AuthAPI} />
            <Route
              path={DEPLOY_API(":id")}
              exact={true}
              component={DeployAPI}
            />
            <Route
              path={TEST_API(":id", ":deployId")}
              exact={true}
              component={TestAPI}
            />
            <Route path={LIST_APIS} exact={true} component={ListAPIs} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
