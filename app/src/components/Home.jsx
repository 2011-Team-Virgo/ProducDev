import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing(2),
    backgroundColor: "#B19F9E",
    color: "#FEFFFF",
    "&:hover": {
      opacity: "0.6"
    },
    marginTop: theme.spacing(1)
  },
  button: {
    height: "40px",
    width: "100px",
    backgroundColor: "#cebc81",
    border: "none",
    borderRadius: "2em",
    display: "inline-block",
    "&:hover": {
      cursor: "pointer",
      border: "solid white"
    }
  },
  image: {
    height: "407.995px",
    width: "726px"
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div id="mainContent">
      <button className={classes.button}>Get the Extension</button>
      <img
        className={classes.image}
        src="https://i.pinimg.com/originals/1d/b2/fe/1db2fe7e19861900a2d9260cd1272727.jpg"></img>
    </div>
  );
};

export default withRouter(Home);
