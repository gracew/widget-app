import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthAPI } from "./components/apis/AuthAPI";
import { CustomizeAPI } from "./components/apis/CustomizeAPI";
import { DeployAPI } from "./components/apis/DeployAPI";
import { EditFields } from "./components/apis/EditFields";
import { EditOperations } from "./components/apis/EditOperations";
import { ListAPIs } from "./components/apis/ListAPIs";
import { NewAPI } from "./components/apis/NewAPI";
import { TestAPI } from "./components/apis/TestAPI";
import { Navbar } from "./components/Navbar";
import { Tests } from "./components/Tests";
import {
  AUTH_API,
  CUSTOMIZE_API,
  DEPLOY_API,
  EDIT_FIELDS,
  EDIT_OPERATIONS,
  LIST_APIS,
  NEW_API,
  TESTS,
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
            <Route path={NEW_API} exact={true} component={NewAPI} />
            <Route
              path={EDIT_FIELDS(":id")}
              exact={true}
              component={EditFields}
            />
            <Route
              path={EDIT_OPERATIONS(":id")}
              exact={true}
              component={EditOperations}
            />
            <Route path={AUTH_API(":id")} exact={true} component={AuthAPI} />
            <Route
              path={CUSTOMIZE_API(":id")}
              exact={true}
              component={CustomizeAPI}
            />
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

            <Route path={TESTS} exact={true} component={Tests} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
