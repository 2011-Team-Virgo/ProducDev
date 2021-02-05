import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

const Analytics = () =>{
  // const user = useSelector(state=>state.user)

  const [data,setData] = useState({})
  useEffect(()=>{
    var userId = firebase.auth().currentUser.uid;
    firebase
    .database()
    .ref('users/' + userId)
    .once('value')
    .then((snapshot) => {
      setData(snapshot.val())
    });
  },[])
  
  console.log(data)
  

return(
  <h1>Hi {data.name}</h1>
  
) 
}

export default Analytics;
