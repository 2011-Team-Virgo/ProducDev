import React from "react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../store/user";

//Material-ui
import {
  Container,
  Grid,
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profCont: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5%",
    borderRadius: "30%",
    margin: "5%",
    padding: "5%",
  },
  profileImg: {
    height: "30vh",
    width: "30vh",
  },
  profInfo: {
    margin: "5%",
    padding: "5%",
  },
  profBtn: {
    paddingTop: "5%",
  },
  infoGrid: {
    order: 2,
    fontSize: "8px",
    [theme.breakpoints.up(`768`)]: {
      order: 1,
      fontSize: "12px",
    },
    margin: "auto",
  },
  imgGrid: {
    order: 1,
    [theme.breakpoints.up(`768`)]: {
      order: 2,
    },
    margin: "auto",
  },
}));
export default function Account(props) {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user) || {};
  console.log(user);
  function signOut() {
    // [START auth_sign_out]
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(removeUserData());
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // [END auth_sign_out]
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid className={classes.infoGrid} item wrap="nowrap" md={6}>
          <Card className={classes.profInfo}>
            <CardContent>
              <h1> Welcome {user.displayName || user.email || "user"}</h1>
              <h2>{user.displayName ? `Name: ${user.displayName}` : null}</h2>
              <h2>{user.email ? `Email: ${user.email}` : null}</h2>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid className={classes.imgGrid} item md={6}>
          <Card className={classes.profCont}>
            <CardMedia>
              <img
                alt={""}
                className={classes.profileImg}
                src={user.photoURL}
              />
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
