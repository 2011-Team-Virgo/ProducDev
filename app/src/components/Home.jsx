import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap"
  },
  info: {
    display: "flex",
    alignContent: "space-around",
    flexDirection: "column",
    p: {
      color: "black"
    }
  },
  button: {
    height: "37px",
    width: "100px",
    backgroundColor: "#e54b4b",
    border: "none",
    borderRadius: "2em",
    outline: "none",
    "&:hover": {
      margin: "10px",
      height: "50px",
      width: "115px",
      cursor: "pointer",
      border: " solid #032b43"
    },
    "&:active": {
      backgroundColor: "#2ec4b6",
      border: "none"
    }
  },
  image: {
    margin: "10px",
    padding: "10px",
    height: "407.995px",
    width: "726px"
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
  return (
    <div id="mainContent" className={classes.root}>
      <div className={classes.info}>
        <p>
          ProducDev is an extension built to track various metrics of your
          productivity within VSCode.{" "}
        </p>
        <button
          className={classes.button}
          onClick={clickHandler}
          alt="click to get the extension">
          Get the Extension
        </button>
      </div>
      <img
        className={classes.image}
        alt="graph"
        src="https://i.pinimg.com/originals/1d/b2/fe/1db2fe7e19861900a2d9260cd1272727.jpg"></img>
    </div>
  );
};

export default withRouter(Home);
