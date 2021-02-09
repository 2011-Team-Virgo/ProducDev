import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';

const Analytics = () =>{
  const user = useSelector(state=>state.user)
  console.log(user)

return(
  <h1>Hi {user.displayName || user.email}</h1>
  
) 
}

export default Analytics;