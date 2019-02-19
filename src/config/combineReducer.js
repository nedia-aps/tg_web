import { combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';
import DashboardReducer from '../redux/reducers';

export default combineReducers({
  dashboardReducer: DashboardReducer,
});
