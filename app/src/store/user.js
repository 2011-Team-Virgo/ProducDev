

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
            const {displayName,email,photoURL,uid} = user
            dispatch(setUser({displayName,email,photoURL,uid }))
        }catch(err){
            console.log(err)
        }
    }
}

//Reducer
export default function workoutReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return action.user
        default:
            return state
    }
}