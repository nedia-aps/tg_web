import axios from "axios";
import { USER_CHANGED, TEACHERS } from "../types";
import { config } from "../../utils";
import { toastr } from "react-redux-toastr";
import { showLoadmask, hideLoadmask } from "react-redux-loadmask";
//const { ROOT_URL, REST_APIs } = config;

const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;

export const formChanged = value => {
  return {
    type: USER_CHANGED,
    payload: value
  };
};
export const selectedTeacher = teacher => {
  return {
    type: TEACHERS.SET_TEACHER,
    payload: teacher
  };
};
export const saveTeacher = ({ name, email,userName, phone,history }) => {
  return dispatch => {
    const addTeachder = baseURL + REST_API.User.AddTeacher;
    axios
      .post(addTeachder, { Email: email, Name: name,UserName:userName,Phone:phone })
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          toastr.success("Fuldført", "Teacher Created");
          dispatch({
            type: TEACHERS.ADD_TEACHER
          });
          //history.push("teachers")
        }
        else{
          toastr.error("Fejl", "Fejl i bruger eller kode");
        }
      })
      .catch(error => {
        toastr.error("Fejl", "There is some issue.");
      });
  };
};
export const updateTeacher = ({ id,name, email,userName, phone,history }) => {
  return dispatch => {
    const updateTeachder = baseURL + REST_API.User.UpdateTeacher;
    axios
      .post(updateTeachder, {Id:id, Email: email, Name: name,UserName:userName,Phone:phone })
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          toastr.success("Fuldført", "Teacher Updated");
          dispatch({
            type: TEACHERS.ADD_TEACHER
          });
          history.push("undervisere")
        }
        else{
          toastr.error("Fejl", "Fejl i bruger eller kode");
        }
      })
      .catch(error => {
        toastr.error("Fejl", "There is some issue.");
      });
  };
};
export const getTeachder = () => {
  return dispatch => {
    dispatch(showLoadmask());
    const getTeachder = baseURL + REST_API.User.GetTeachers;
    axios
      .get(getTeachder)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: TEACHERS.GET_TEACHERS,
            payload: baseModel.data
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        dispatch(hideLoadmask());
      });
  };
};
export const deleteTeacher = (authId) => {
  return dispatch => {
    dispatch(showLoadmask());
    const getTeachder = baseURL + REST_API.User.Delete+'?authId='+authId;
    axios
      .delete(getTeachder)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: TEACHERS.DELETE_TEACHER,
            payload: true
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        dispatch(hideLoadmask());
      });
  };
};


