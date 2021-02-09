import React from "react";
import { makeStyles } from "@material-ui/core";
import DashboardView from "./DashboardView";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const Analytics = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <DashboardView/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;