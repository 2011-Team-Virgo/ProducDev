import "./style/App.css";
import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Analytics from "./components/Analytics";
import Account from "./components/Account";
import Signin from "./components/Signin";
import File404 from "./components/404";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({});

function App() {
  const classes = useStyles();
  const user = useSelector((state) => state.userState.user);
  return (
    <div className={classes.container}>
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/signin" render={(props) => <Signin {...props} />} />
        {user && (
          <Switch>
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
          </Switch>
        )}
        <Route component={File404} />
        {/* Displays our Login component as a fallback */}
      </Switch>
    </div>
  );
}

export default App;
