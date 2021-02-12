import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../colors";
import { useMediaQuery } from "@material-ui/core";
import { AutorenewTwoTone } from "@material-ui/icons";

const { red, darkBlue, lightBlue } = colors;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    margin: "10px"
  },
  button: {
    display: "flex",
    alignSelf: "center",
    height: "37px",
    width: "100px",
    backgroundColor: red,
    border: "none",
    borderRadius: "2em",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
      border: "1px solid" + darkBlue
    },
    "&:active": {
      backgroundColor: lightBlue,
      border: "none"
    }
  },
  words: {
    textAlign: "center",
    margin: "8vh"
  },
  graph: {
    margin: "10px",
    padding: "10px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    height: "auto",
    width: "auto"
  }
}));

const mobileStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Home = () => {
  const clickHandler = (e) => {
    window.open(
      "https://marketplace.visualstudio.com/items?itemName=fsa-producdev.producdev",
      "_blank"
    );
  };
  const classes = useStyles();
  const mobileClasses = mobileStyles();

  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <div
      id="mainContent"
      className={isTablet ? mobileClasses.root : classes.root}>
      <div className={classes.info}>
        <p className={classes.words}>
          ProducDev is an extension built to track various metrics of your
          productivity within VSCode.
        </p>
        <button
          className={classes.button}
          onClick={clickHandler}
          alt="click to get the extension">
          Get the Extension
        </button>
      </div>
      <img
        className={classes.graph}
        alt="graph"
        src="https://i.pinimg.com/originals/1d/b2/fe/1db2fe7e19861900a2d9260cd1272727.jpg"></img>
    </div>
  );
};

export default withRouter(Home);
