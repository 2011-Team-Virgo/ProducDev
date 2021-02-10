import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";
import * as d3 from "d3";

const Analytics = () => {
  // const user = useSelector(state=>state.user)

  const [data, setData] = useState({});
  useEffect(() => {
    var userId = firebase.auth().currentUser.id;
    firebase
      .database()
      .ref("users/" + userId)
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);

  return <svg height="80" width="95"></svg>;
};

export default Analytics;
