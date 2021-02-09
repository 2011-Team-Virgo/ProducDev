import React from 'react';
import firebase from 'firebase/app'
import {useDispatch, useSelector} from 'react-redux'
import {removeUserData} from '../store/user'
export default function Account(props) {
  const {history} = props
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  console.log("user", user)
  function signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {

      dispatch(removeUserData())
      history.push("/");
    }).catch((error) => {
      console.log(error)
    });
    // [END auth_sign_out]
  }
  return (
    <div>
        <div id="name" className="userInfo">
          <h4>name:</h4>
          <h2>{user.displayName||"N/A"}</h2>
        </div>
        <div id="email" className="userInfo">
          <h4>email:</h4>
          <h2>{user.email||"N/A"}</h2>
        </div>
        <div>
          <button type="button" onClick={()=>signOut()}>Logout</button>
        </div>
      </div>
  )
}