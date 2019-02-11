import axios from "axios";
import {
  ACCOUNT_CHANGED,
  USER_LOADING_CHANGED,
  GENERIC_ACTIONS,
  USER
} from "../types";
import { toastr } from "react-redux-toastr";
import { config } from "../../utils";
import { AjaxService } from "../../utils";
import { createBrowserHistory } from "history";
import { showLoadmask, hideLoadmask } from "react-redux-loadmask";
const rp = require("request-promise");
const history = createBrowserHistory();
//const { ROOT_URL, REST_APIs } = config;
const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;
const Account = config.REST_APIs.Account;

export const formChanged = value => {
  return {
    type: ACCOUNT_CHANGED,
    payload: value
  };
};

export const login = loginModel => {
  return dispatch => {
    const loginUrl = baseURL + Account.LogIn;
    var options = {
      method: "POST",
      uri: loginUrl,
      form: {
        Username: loginModel.Email,
        Password: loginModel.Password,
        grant_type: "password"
      },
      headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */
        // Is set automatically
      }
    };
    dispatch(showLoadmask());
    rp(options)
      .then(function(response) {
        const jsonData = JSON.parse(response);
        if (jsonData) {
          localStorage.setItem("state", jsonData.access_token);
          dispatch({
            type: USER.TOKEN_FETCHED,
            payload: true
          });
        } else {
          dispatch(hideLoadmask());
          toastr.error("Login Failed", "Invalid Username or Password");
        }
      })
      .catch(function(err) {
        dispatch(hideLoadmask());
        toastr.error("Login Failed", "Invalid Username or Password");
      });
  };
};

export const validateLoggedUser = () => {
  return dispatch => {
    let accessToken = localStorage.getItem("state");
    if (accessToken != null) {
      const validateUserURL = baseURL + REST_API.Account.ValidateLoggedUser;
      dispatch(showLoadmask());
      axios
        .get(validateUserURL)
        .then(response => {
          dispatch(hideLoadmask());
          const baseModel = response.data;
          if (baseModel.success) {
            dispatch({
              type: USER.LOGIN_SUCCESS,
              payload: baseModel.data
            });
          } else {
            localStorage.removeItem("state");
            dispatch({
              type: USER.LOGIN_SUCCESS,
              payload: null
            });
          }
          dispatch(hideLoadmask());
        })
        .catch(error => {
          // Log Exception
          dispatch(hideLoadmask());
        });
    } else {
    }
  };
};

export const logoutUser = (history) => {
  const logOutURL = baseURL + REST_API.Account.LogOff;
  return dispatch => {
    axios
      .get(logOutURL)
      .then(response => {
        const baseModel = response.data;
        dispatch(hideLoadmask());
        if (baseModel.success) {
          dispatch({
            type: USER.LOGOUT_SUCCESS,
            payload: null
          });
          localStorage.removeItem("state");
          history.push("login")

        }
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
      });
  };
};
export const resetPassword = (model,history) => {
  const resetPasswordURL = baseURL + REST_API.Account.ResetPassword;
  return dispatch => {
    dispatch(showLoadmask());
    axios
      .post(resetPasswordURL, model)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch(hideLoadmask());
          toastr.success("Success", "Password Updated.");
          dispatch({
            type: USER.LOGOUT_SUCCESS,
            payload: null
          });
          localStorage.removeItem("state");
          history.push("login")
        }
        else{
          toastr.error("Error", baseModel.message);
        }
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(showLoadmask());
      });
  };
};
export const createAdmin = (model,history) => {
  const register = baseURL + REST_API.Account.Register;
  return dispatch => {
    dispatch(showLoadmask());
    axios
      .post(register, model)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch(hideLoadmask());
          toastr.success("Success", "Admin Created.");
          history.push("/undervisere")
        }
        else{
          toastr.error("Error", baseModel.message);
        }
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(showLoadmask());
      });
  };
};
