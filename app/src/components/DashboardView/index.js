import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../Page";
import Data from "./Data";
import ActivityByProject from "./ActivityByProject";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/user";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.userState);

  //user and userData
  const { projects } = userData || {};

  useEffect(() => {
    const data = user ? dispatch(fetchUserData(user.id)) : null;
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Data projects={projects} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <ActivityByProject projects={projects} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
