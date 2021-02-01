
import {googleSignInPopup,googleProvider} from "../auth/google_signin"

//Action types
const SET_USER = 'SET_USER'

//Initial State
const initialState = {}

//Action Creators
const setUser = (user)=>
(
    {
        type: SET_USER,
        user
    }
)

export const setUserData= (user)=>{
    return async(dispatch)=>{
        try{
            dispatch(setUser(user))
        }catch(err){
            console.log(err)
        }
    }
}

export const googleSigninUser = () =>{
    return async(dispatch) => {
        try {
            const provider = await googleProvider()
            await googleSignInPopup(provider);
        } catch (err){
          console.log(err)
        }
      }
};

//Reducer
export default function workoutReducer(state = initialState, action){
    console.log(action)
    switch(action.type){
        case SET_USER:
            return {...state, user:action.user}
        default:
            return state
    }
}