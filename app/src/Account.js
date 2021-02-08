import React from 'react';
import firebase from 'firebase/app'
import {useDispatch, useSelector} from 'react-redux'
import {removeUserData} from './store/user'
export default function Account(props) {
  const {history} = props
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
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
      <button type="button" onClick={()=>signOut()}>Logout</button>
    </div>
  )
}
