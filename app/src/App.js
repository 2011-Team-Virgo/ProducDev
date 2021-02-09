import "./style/App.css";
import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Analytics from "./components/Analytics";
import Account from "./components/Account";
import Signin from "./components/Signin";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/analytics"
          render={(props) => <Analytics {...props} />}
        />
        <Route
          exact
          path="/account"
          render={(props) => <Account {...props} />}
        />
        <Route exact path="/signin" render={(props) => <Signin {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
