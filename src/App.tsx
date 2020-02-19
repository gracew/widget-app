import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import logo from "./logo.svg";

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    </Router>
  );
}

export default App;
