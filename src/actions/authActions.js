import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Login
export const loginUser = (userData,history) => dispatch => {
  axios.post(`${process.env.REACT_APP_API_URL}:3000/login`, userData)
    .then(res => {
       history.push("/")
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    }
    )
    .catch(err => console.log("Error in registerUser"))
}


// Set logged in user
export const setCurrentUser = decoded_data => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded_data
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
