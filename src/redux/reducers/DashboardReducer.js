import { DASHBOARD } from '../types';

const INITIAL_STATE = {
  dashboardObject: 'test',
  dashboardStat:Object
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DASHBOARD.DASHBOARD_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
      case DASHBOARD.GET_DASHBOARD:
      return {
        ...state,
        dashboardStat: action.payload
      };
    default:
      return state;
  }
};