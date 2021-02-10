import React from 'react';
import firebase from 'firebase/app'
import {useDispatch, useSelector} from 'react-redux'
import {removeUserData} from '../store/user'
//Material-ui
import { 
  Container, 
  Grid, 
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
  profCont:{
    display:"flex",
    justifyContent:"center",
    paddingTop:"5%"
  },
  profileImg:{
    height:"30vh",
    width:"30vh",
    margin:"auto"
  }
}))
export default function Account(props) {
  const {history} = props
  const classes = useStyles()
  const dispatch = useDispatch();
  const user = useSelector(state=>state.userState.user) || {}
  console.log(user)
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
    <Container>
      <Grid container spacing={2}>
        <Grid item md={6}>
          
            <h2>Name:{user.displayName||"N/A"}</h2>
          
            <h2>email: {user.email||"N/A"}</h2>
        </Grid>
        <Grid item md={6}>
          <div className={classes.profCont}>
            {<img className={classes.profileImg} src={user.photoURL}/> || <img className={classes.profileImg} src="/public/img/no-image-avaiable.jpg"/>}
          </div>
          <div>
            <button type="button" onClick={()=>signOut()}>Logout</button>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}