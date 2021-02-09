import React from "react";
import firebase from "firebase";

export default class Account extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      displayName: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        email: user.email,
        displayName: user.displayName
      });
    });
  }

  render() {
    return (
      <div>
        <div id="name" className="userInfo">
          <h4>name:</h4>
          <h2>{this.state.displayName}</h2>
        </div>
        <div id="email" className="userInfo">
          <h4>email:</h4>
          <h2>{this.state.email}</h2>
        </div>
      </div>
    );
  }
}
