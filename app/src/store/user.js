import axios from "axios";

//Action types
const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";
const FETCH_USER_DATA = "FETCH_USER_DATA";

//Initial State
const initialState = {};

//Action Creators
const setUser = (user) => ({
  type: SET_USER,
  user,
});
const removeUser = () => ({
  type: REMOVE_USER,
  user: {},
});

const _fetchUserData = (userData) => ({
  type: FETCH_USER_DATA,
  userData,
});

export const fetchUserData = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://producdev-1277b-default-rtdb.firebaseio.com/users/${id}.json`
      );
      dispatch(_fetchUserData(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setUserData = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const id = Number(user.providerData[0].uid);
      const { displayName, email, photoURL } = user;
      console.log("user:", user);
      dispatch(setUser({ displayName, email, photoURL, id }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUserData = () => {
  console.log("remove");
  return async (dispatch) => {
    try {
      console.log("here");
      dispatch(removeUser());
    } catch (err) {
      console.log(err);
    }
  };
};

//Reducer
export default function userReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return action.user;
    case FETCH_USER_DATA:
      return { ...state, userData: action.userData };
    default:
      return state;
  }
}
