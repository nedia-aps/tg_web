import { combineReducers } from "redux";
import { DashboardReducer } from "../redux/reducers";

import { reducer as toastrReducer } from "react-redux-toastr";
export default combineReducers({
  dashboardReducer: DashboardReducer,
});
