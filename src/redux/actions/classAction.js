import axios from "axios";
import { USER_CHANGED, CLASSES, DASHBOARD } from "../types";
import { config } from "../../utils";
import { AjaxService } from "../../utils";
import { toastr } from "react-redux-toastr";
import { showLoadmask, hideLoadmask } from "react-redux-loadmask";
const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;
export const formChanged = value => {
  return {
    type: USER_CHANGED,
    payload: value
  };
};
export const classFormReset = () => {
  return {
    type: CLASSES.CLASS_FORM_RESET
  };
};
export const saveUser = ({ name, email }) => {
  console.log(email);
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
  FeMaleStudent
}) => {
  return dispatch => {
    dispatch(showLoadmask());
    const addClass = baseURL + REST_API.Class.AddClass;
    axios
      .post(addClass, {
        Name: name,
        IsRepeatable: IsRepeatable,
        Teachers: Teachers,
        DayOfClass: DayOfClass,
        StartDateTime: startDate,
        EndDateTime: endDate,
        TimeOfClass: time,
        EndTimeOfClass: EndTimeOfClass,
        TotalClasses: TotalClasses,
        TotalStudent,
        MaleStudent,
        FeMaleStudent
      })
      .then(response => {
        dispatch(hideLoadmask());
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.ADD_CLASS
          });
          toastr.success("Success", "Class Created Successfully.");
        }
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(hideLoadmask());
      });
  };
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
  FeMaleStudent
}) => {
  return dispatch => {
    const addClass = baseURL + REST_API.Class.UpdateClass;
    axios
      .post(addClass, {
        Id: classId,
        Name: name,
        IsRepeatable: IsRepeatable,
        Teachers: Teachers,
        DayOfClass: DayOfClass,
        StartDateTime: startDate,
        EndDateTime: endDate,
        TimeOfClass: time,
        EndTimeOfClass: EndTimeOfClass,
        TotalClasses: TotalClasses,
        TotalStudent,
        MaleStudent,
        FeMaleStudent
      })
      .then(response => {
        dispatch(hideLoadmask());
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.ADD_CLASS
          });
          toastr.success("Success", baseModel.message);
        }
      })
      .catch(error => {
        dispatch(hideLoadmask());
        toastr.error("Error", "Please try later.");
      });
  };
};
export const getTeachders = () => {
  return dispatch => {
    const getTeachder = baseURL + REST_API.User.GetTeachers;
    axios
      .get(getTeachder)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.GET_CLASS_TEACHERS,
            payload: baseModel.data
          });
        }
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
      });
  };
};
export const getClasses = () => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses = baseURL + REST_API.Class.GetClasses;
    axios
      .get(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.GET_CLASSES,
            payload: baseModel.data
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        dispatch(hideLoadmask());
        toastr.error("Error", "Please try later.");
      });
  };
};
export const getClassLog = classId => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses =
      baseURL + REST_API.Class.GetClassLog + "?classId=" + classId;
    axios
      .get(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.CLASS_TIME_LOG,
            payload: baseModel.data
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(hideLoadmask());
      });
  };
};
export const noClassLog = () => {
  return dispatch => {
    dispatch(showLoadmask());
    const NoClasslog = baseURL + REST_API.Class.NoLog;
    axios
      .get(NoClasslog)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.CLASS_MISSING_LOG,
            payload: baseModel.data
          });
        } else {
          toastr.error("Error", baseModel.message);
        }

        dispatch(hideLoadmask());
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(hideLoadmask());
      });
  };
};

export const dashBordData = () => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses = baseURL + REST_API.Dashboard.DashboardStats;
    axios
      .get(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: DASHBOARD.GET_DASHBOARD,
            payload:baseModel.data,
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        dispatch(hideLoadmask());
        toastr.error("Error", "Please try later.");
      });
  };
};
export const getClassById = classId => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses = baseURL + REST_API.Class.GetClass + "?id=" + classId;
    axios
      .get(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.CLASS_SELECT,
            payload: baseModel.data
          });
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(hideLoadmask());
      });
  };
};
export const deleteClass = classId => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses =
      baseURL + REST_API.Class.DeleteClass + "?classId=" + classId;
    axios
      .delete(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: CLASSES.CLASS_DELETED_SUCCESS,
            payload: classId
          });
          toastr.success("Confirmation", baseModel.message);
        }
        dispatch(hideLoadmask());
      })
      .catch(error => {
        toastr.error("Error", "Please try later.");
        dispatch(hideLoadmask());
      });
  };
};
export const test12 = (data) => {
  return dispatch => {
    dispatch(showLoadmask());
    const getClasses = baseURL + REST_API.Dashboard.DashboardStats;
    axios
      .get(getClasses)
      .then(response => {
        const baseModel = response.data;
        if (baseModel.success) {
          dispatch({
            type: DASHBOARD.GET_DASHBOARD,
            payload:baseModel.data,
          });
        }
        //dispatch(hideLoadmask());
      })
      .catch(error => {
        //dispatch(hideLoadmask());
        toastr.error("Error", "Please try later.");
      });
  };
};

export const verifyUser = data => (dispatch) => {

    dispatch({
      type: DASHBOARD.GET_DASHBOARD,
      payload: data,
    });
};
