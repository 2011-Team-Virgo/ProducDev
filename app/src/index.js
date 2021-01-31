import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import history from './history';
import { Router } from 'react-router-dom';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAe9TREuTK9UgMRKcibsnRPZnH7VRIQqZE',
  authDomain: 'producdev-1277b.firebaseapp.com',
  databaseURL: 'https://producdev-1277b-default-rtdb.firebaseio.com',
  projectId: 'producdev-1277b',
  storageBucket: 'producdev-1277b.appspot.com',
  messagingSenderId: '908605484955',
  appId: '1:908605484955:web:9cd8ccead875a6d40a3b3e',
  measurementId: 'G-WG6Z0ZHZVM',
};

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
firebase.initializeApp(firebaseConfig);
