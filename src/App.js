import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

export default function App(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  );
}
