import axios from "axios";
import { toastr } from "react-redux-toastr";
import { showLoadmask, hideLoadmask } from "react-redux-loadmask";
import {
  ACCOUNT_CHANGED,
  USER
} from "../types";
import { config } from "../../utils";

const rp = require("request-promise");
// const { ROOT_URL, REST_APIs } = config;
const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;
const Account = config.REST_APIs.Account;

export const formChanged = value => ({
  type: ACCOUNT_CHANGED,
  payload: value
});

export const login = loginModel => dispatch => {
  const loginUrl = baseURL + Account.LogIn;
  const options = {
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
      .then((response) => {
        const jsonData = JSON.parse(response);
        if (jsonData) {
          localStorage.setItem("state", jsonData.access_token);
          dispatch({
            type: USER.TOKEN_FETCHED,
            payload: true
          });
        } else {
          dispatch(hideLoadmask());
          toastr.error("Login fejl", "Fejl i bruger eller kode");
        }
      })
      .catch((err) => {
        dispatch(hideLoadmask());
        toastr.error("Login fejl", "Fejl i bruger eller kode");
      });
};

export const validateLoggedUser = () => dispatch => {
  const accessToken = localStorage.getItem("state");
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
          history.push("login");
        }
      })
      .catch(error => {
        toastr.error("Error", "Prøv igen senere.");
      });
  };
};
export const resetPassword = (model, history) => {
  const resetPasswordURL = baseURL + REST_API.Account.ResetPassword;
  return dispatch => {
    dispatch(showLoadmask());
    axios
      .post(resetPasswordURL, model)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch(hideLoadmask());
          toastr.success("Fuldført", "Password Updated.");
          dispatch({
            type: USER.LOGOUT_SUCCESS,
            payload: null
          });
          localStorage.removeItem("state");
          history.push("login");
        } else {
          toastr.error("Error", baseModel.message);
        }
      })
      .catch(error => {
        toastr.error("Error", "Prøv igen senere.");
        dispatch(showLoadmask());
      });
  };
};
export const createAdmin = (model, history) => {
  const register = baseURL + REST_API.Account.Register;
  return dispatch => {
    dispatch(showLoadmask());
    axios
      .post(register, model)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch(hideLoadmask());
          toastr.success("Fuldført", "Admin Created.");
          history.push("/undervisere");
        } else {
          toastr.error("Error", baseModel.message);
        }
      })
      .catch(error => {
        toastr.error("Error", "Prøv igen senere.");
        dispatch(showLoadmask());
      });
  };
};
