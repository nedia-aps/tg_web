import { combineReducers } from "redux";
import DashboardReducer from "./DashboardReducer";
import TeacherReducer from "./TeacherReducer";
import ClassReducer from "./ClassReducer";
import AccountReducer from "./AccountReducer";
import ContentReducer from "./ContentReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { loadmaskReducer } from "react-redux-loadmask";

export default combineReducers({
  dashboardReducer: DashboardReducer,
  teacherReducer: TeacherReducer,
  contentReducerObject: ContentReducer,
  accountReducerObject: AccountReducer,
  classReducer: ClassReducer,
  toastr: toastrReducer,
  loadmaskReducer: loadmaskReducer
});
