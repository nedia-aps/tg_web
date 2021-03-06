import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { showLoadmask, hideLoadmask } from 'react-redux-loadmask';
import { CLASSES } from '../types';
import { config } from '../../utils';
// const { ROOT_URL, REST_APIs } = config;
const REST_API = config.REST_APIs;
const baseURL = config.ROOT_URL;

// export const dashBord = () => {debugger;
//   return dispatch => {
//     dispatch(showLoadmask());
//     const DashboardStat = baseURL + REST_API.Dashboard.DashboardStats;
//     axios
//       .get(DashboardStat)
//       .then(response => {
//         const baseModel = response.data;debugger;
//          if (baseModel.success) {
//            dispatch({
//             type: DASHBOARD.GET_DASHBOARD,
//             payload: baseModel.data
//           });
//         }else{
//           toastr.error("Error", baseModel.message);
//         }

//         dispatch(hideLoadmask());
//       })
//       .catch(error => {
//         toastr.error("Error", "Please try later.");
//         dispatch(hideLoadmask());
//       });
//   };
// };

export const dashBordData123 = () => () => {
  // () => (dispatch)
  const getClasses = baseURL + REST_API.Dashboard.DashboardStats;
  axios
    .get(getClasses)
    .then(() => {
      // response
      // const baseModel = response.data;
      hideLoadmask();
      return true;
    })
    .catch(() => {
      // error
      toastr.error('Error', 'Prøv igen senere.');
    });
};

export const noClassLog = () =>
  // debugger;
  dispatch => {
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
          toastr.error('Error', baseModel.message);
        }

        dispatch(hideLoadmask());
        return true;
      })
      .catch(() => {
        // error
        toastr.error('Error', 'Prøv igen senere.');
        dispatch(hideLoadmask());
      });
  };
