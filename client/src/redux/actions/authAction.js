import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../constants.js";
import axios from "axios";
import { setAlert } from "./alertAction.js";
import setAuthToken from "../../utils/setAuthToken.js";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/
//  Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    // const config = {
    //     headers:{
    //         'Content-Type' : 'application/json'
    //     }
    // }

    const body = { name, email, password };

    try {
      const res = await axios.post("api/users/register", body);

      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser())

    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTRATION_FAIL,
      });
    }
  };

// Login user
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };


  try {
    const res = await axios.post("api/users/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser())

  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};


export const logout = () => dispatch =>{
    dispatch({type: CLEAR_PROFILE})
    
    dispatch({
        type: LOGOUT
    })

}