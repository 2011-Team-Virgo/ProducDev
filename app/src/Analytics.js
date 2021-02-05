import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase/app";

class Analytics extends React.Component {
  render() {
    const { email, name } = firebase.auth().currentUser;
    return (
      <div>
        <div>{name}</div>
      </div>
    );
  }
}

export default withRouter(Analytics);
