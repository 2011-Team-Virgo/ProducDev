import React from "react";
import { setUserData } from "../store/user";
import { useDispatch } from "react-redux";
//Material-UI
import {
  FormControlLabel,
  Avatar,
  Button,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Checkbox
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

function handleGoogle(dispatch) {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */

      // The signed-in user info.
      var user = result.user;
      // ...
      writeUserData(user.uid, user.displayName, user.email);

      dispatch(setUserData(user));
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}

function handleGitHub() {
  const provider = new firebase.auth.GithubAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function writeUserData(userId, name, email) {
  console.log(userId);
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      name: name,
      email: email
    });
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ProducDev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#19181A",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#A16E83"
  },
  github: {
    backgroundColor: "#000000",
    color: "#F5f5f5",
    marginTop: theme.spacing(0.8),
    marginBottom: theme.spacing(2.5)
  },
  google: {
    backgroundColor: "#4285F4",
    color: "#f5f5f5",
    marginTop: theme.spacing(2.5)
  },
  ghicon: {
    marginRight: theme.spacing(1.5)
  }
}));

export default function Signin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Button
            type="submit"
            fullWidth
            className={classes.google}
            variant="contained"
            onClick={handleGoogle}>
            Continue with Google
          </Button>
          <Button
            type="submit"
            fullWidth
            className={classes.github}
            variant="contained"
            onClick={handleGitHub}>
            <GitHubIcon className={classes.ghicon} />
            Continue with Github
          </Button>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
