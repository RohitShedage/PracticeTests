import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomeConnector";
import "./App.css";

export default function App(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
}
