import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../Page";
import Data from "./Data";
import ActivityByProject from "./ActivityByProject";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/user.js";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
  },
  title:{
    color:"#ff7a59",
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { user, userData } = useSelector((state) => state.userState);

  //user and userData
  const { projects } = userData || {};

  useEffect(() => {
    const data = user ? dispatch(fetchUserData(user.id)) : null;
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <h1 className={classes.title}>Select your project and file.</h1>
        
          <Data projects={projects} />
          
      </Container>
    </Page>
  );
};

export default Dashboard;
