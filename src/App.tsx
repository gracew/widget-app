import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthAPI } from "./components/AuthAPI";
import { DefineAPI } from "./components/DefineAPI";
import { NameAPI } from "./components/NameAPI";
import { Navbar } from "./components/Navbar";
import { TryAPI } from "./components/TryAPI";

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <div className="App">
        <Switch>
          <Route path="/" exact={true} component={NameAPI} />
          <Route path="/define" exact={true} component={DefineAPI} />
          <Route path="/auth" exact={true} component={AuthAPI} />
          <Route path="/try" exact={true} component={TryAPI} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
