import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { showLoadmask, hideLoadmask } from 'react-redux-loadmask';
import { USER_CHANGED, CLASSES, DASHBOARD } from '../types';
import { config } from '../../utils';

const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;
export const formChanged = value => ({
  type: USER_CHANGED,
  payload: value,
});
export const classFormReset = () => ({
  type: CLASSES.CLASS_FORM_RESET,
});
export const saveUser = ({ name, email }) => {
  console.log(name, email);
};

export const saveClass = ({
  name,
  startDate,
  endDate,
  IsRepeatable,
  Teachers,
  DayOfClass,
  time,
  EndTimeOfClass,
  TotalClasses,
  TotalStudent,
  MaleStudent,
  FeMaleStudent,
}) => dispatch => {
  dispatch(showLoadmask());
  const addClass = baseURL + REST_API.Class.AddClass;
  axios
    .post(addClass, {
      Name: name,
      IsRepeatable,
      Teachers,
      DayOfClass,
      StartDateTime: startDate,
      EndDateTime: endDate,
      TimeOfClass: time,
      EndTimeOfClass,
      TotalClasses,
      TotalStudent,
      MaleStudent,
      FeMaleStudent,
    })
    .then(response => {
      dispatch(hideLoadmask());
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.ADD_CLASS,
        });
        toastr.success('Fuldført', 'Hold er coprettet.');
      }
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
      dispatch(hideLoadmask());
    });
};
export const updateClass = ({
  classId,
  name,
  startDate,
  endDate,
  IsRepeatable,
  Teachers,
  DayOfClass,
  time,
  EndTimeOfClass,
  TotalClasses,
  TotalStudent,
  MaleStudent,
  FeMaleStudent,
}) => dispatch => {
  const addClass = baseURL + REST_API.Class.UpdateClass;
  axios
    .post(addClass, {
      Id: classId,
      Name: name,
      IsRepeatable,
      Teachers,
      DayOfClass,
      StartDateTime: startDate,
      EndDateTime: endDate,
      TimeOfClass: time,
      EndTimeOfClass,
      TotalClasses,
      TotalStudent,
      MaleStudent,
      FeMaleStudent,
    })
    .then(response => {
      dispatch(hideLoadmask());
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.ADD_CLASS,
        });
        toastr.success('Fuldført', baseModel.message);
      }
      return true;
    })
    .catch(() => {
      // error
      dispatch(hideLoadmask());
      toastr.error('Fejl', 'Prøv igen senere.');
    });
};
export const getTeachers = () => dispatch => {
  const getTeacher = baseURL + REST_API.User.GetTeachers;
  axios
    .get(getTeacher)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.GET_CLASS_TEACHERS,
          payload: baseModel.data,
        });
      }
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
    });
};
export const getClasses = () => dispatch => {
  dispatch(showLoadmask());
  const getClass = baseURL + REST_API.Class.GetClasses;
  axios
    .get(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.GET_CLASSES,
          payload: baseModel.data,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      dispatch(hideLoadmask());
      toastr.error('Fejl', 'Prøv igen senere.');
    });
};
export const getClassLog = classId => dispatch => {
  dispatch(showLoadmask());
  const getClass = `${baseURL + REST_API.Class.GetClassLog}?classId=${classId}`;
  axios
    .get(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.CLASS_TIME_LOG,
          payload: baseModel.data,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
      dispatch(hideLoadmask());
    });
};
export const noClassLog = () => dispatch => {
  dispatch(showLoadmask());
  const NoClasslog = baseURL + REST_API.Class.NoLog;
  axios
    .get(NoClasslog)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.CLASS_MISSING_LOG,
          payload: baseModel.data,
        });
      } else {
        toastr.error('Fejl', baseModel.message);
      }

      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
      dispatch(hideLoadmask());
    });
};

export const dashBordData = () => dispatch => {
  dispatch(showLoadmask());
  const getClass = baseURL + REST_API.Dashboard.DashboardStats;
  axios
    .get(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: DASHBOARD.GET_DASHBOARD,
          payload: baseModel.data,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      dispatch(hideLoadmask());
      toastr.error('Fejl', 'Prøv igen senere.');
    });
};
export const getClassById = classId => dispatch => {
  dispatch(showLoadmask());
  const getClass = `${baseURL + REST_API.Class.GetClass}?id=${classId}`;
  axios
    .get(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.CLASS_SELECT,
          payload: baseModel.data,
        });
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
      dispatch(hideLoadmask());
    });
};
export const deleteClass = classId => dispatch => {
  dispatch(showLoadmask());
  const getClass = `${baseURL + REST_API.Class.DeleteClass}?classId=${classId}`;
  axios
    .delete(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: CLASSES.CLASS_DELETED_SUCCESS,
          payload: classId,
        });
        toastr.success('Bekræftigelse', baseModel.message);
      }
      dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Fejl', 'Prøv igen senere.');
      dispatch(hideLoadmask());
    });
};
export const test12 = () => dispatch => {
  // data
  dispatch(showLoadmask());
  const getClass = baseURL + REST_API.Dashboard.DashboardStats;
  axios
    .get(getClass)
    .then(response => {
      const baseModel = response.data;
      if (baseModel.success) {
        dispatch({
          type: DASHBOARD.GET_DASHBOARD,
          payload: baseModel.data,
        });
      }
      // dispatch(hideLoadmask());
      return true;
    })
    .catch(() => {
      // error
      // dispatch(hideLoadmask());
      toastr.error('Fejl', 'Prøv igen senere.');
    });
};

export const verifyUser = data => dispatch => {
  dispatch({
    type: DASHBOARD.GET_DASHBOARD,
    payload: data,
  });
};
