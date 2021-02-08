import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import history from "./history";
import { Router } from "react-router-dom";
import firebase from "firebase/app";
import firebaseConfig from "./firebase/firebase_config";
import "firebase/auth";
import "firebase/database";
import { Provider } from "react-redux";
import store from "./store/index";

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
