import { USER_LOADING_CHANGED, ACCOUNT_CHANGED, USER } from "../types";

const INITIAL_STATE = {
  name: "",
  password: "",
  isLogin: false,
  loading: false,
  message: "",
  isAuthenticated: false,
  loggedUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACCOUNT_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case USER_LOADING_CHANGED:
      return {
        ...state,
        loading: INITIAL_STATE.loading
      };
    case USER.TOKEN_FETCHED: {
      return {
        ...state,
        isLogin: action.payload
      };
    }
    case USER.LOGIN_SUCCESS: {
      const loginSuccess = !!action.payload;
      return {
        ...state,
        isAuthenticated: loginSuccess,
        loggedUser: action.payload
      };
    }
    case USER.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        loggedUser: null
      };
    }
    default:
      return state;
  }
};
