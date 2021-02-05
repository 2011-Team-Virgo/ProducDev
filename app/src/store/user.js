

//Action types
const SET_USER = 'SET_USER'
const REMOVE_USER = "REMOVE_USER"

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
const removeUser=()=>
(
    {
        type:REMOVE_USER
    }
)

export const setUserData= (user)=>{
    return async(dispatch)=>{
        try{
            const {displayName,email,photoURL,uid} = user
            dispatch(setUser({displayName,email,photoURL,uid }))
        }catch(err){
            console.log(err)
        }
    }
}
export const removeUserData=()=>{
    console.log("remove")
    return async(dispatch)=>{
        try{
            dispatch(removeUser)
        }catch(err){
            console.log(err)
        }
    }
}

//Reducer
export default function workoutReducer(state = initialState, action){
    console.log(action)
    switch(action.type){
        case SET_USER:
            return action.user
        case REMOVE_USER:
            return {}
        default:
            return state
    }
}