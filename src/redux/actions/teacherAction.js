import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { showLoadmask, hideLoadmask } from 'react-redux-loadmask';
import { USER_CHANGED, TEACHERS } from '../types';
import { config } from '../../utils';
// const { ROOT_URL, REST_APIs } = config;

const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;

export const formChanged = value => ({
  type: USER_CHANGED,
  payload: value,
});
export const selectedTeacher = teacher => ({
  type: TEACHERS.SET_TEACHER,
  payload: teacher,
});
export const saveTeacher = ({
  name,
  email,
  userName,
  phone,
  history,
}) => () => {
  // dispatch
  const addTeachder = baseURL + REST_API.User.AddTeacher;
  axios
    .post(addTeachder, {
      Email: email,
      Name: name,
      UserName: userName,
      Phone: phone,
    })
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        toastr.success('Fuldført', 'Instruktør Created');
        // dispatch({
        //   type: TEACHERS.ADD_TEACHER
        // });
        history.push('undervisere');
      } else {
        toastr.error('Fejl', 'Fejl i bruger eller kode');
      }
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Der skete en fejl.');
    });
};
export const updateTeacher = ({
  id,
  name,
  email,
  userName,
  phone,
  history,
}) => () => {
  // dispatch
  const updateTeachder = baseURL + REST_API.User.UpdateTeacher;
  axios
    .post(updateTeachder, {
      Id: id,
      Email: email,
      Name: name,
      UserName: userName,
      Phone: phone,
    })
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        toastr.success('Fuldført', 'Instruktør oprette');
        // dispatch({
        //   type: TEACHERS.ADD_TEACHER
        // });
        history.push('undervisere');
      } else {
        toastr.error('Fejl', 'Fejl i bruger eller kode');
      }
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Der skete en fejl.');
    });
};
export const getTeacher = () => dispatch => {
  dispatch(showLoadmask());
  const getTeach = baseURL + REST_API.User.GetTeachers;
  axios
    .get(getTeach)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: TEACHERS.GET_TEACHERS,
          payload: baseModel.data,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      dispatch(hideLoadmask());
    });
};
export const deleteTeacher = authId => dispatch => {
  dispatch(showLoadmask());
  const getTeach = `${baseURL + REST_API.User.Delete}?authId=${authId}`;
  axios
    .delete(getTeach)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: TEACHERS.DELETE_TEACHER,
          payload: true,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      dispatch(hideLoadmask());
    });
};
