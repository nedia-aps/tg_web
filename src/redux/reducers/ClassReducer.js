import moment from 'moment';
import { USER_CHANGED, CLASSES, DASHBOARD } from '../types';

const INITIAL_STATE = {
  userObject: '',
  classId: '',
  classesList: [],
  classTeachersList: [],
  selectedCountry: { Id: 1125, Name: 'USA' },
  classCreated: false,
  timeLog: Object,
  loading: false,
  missingLog: [],
  dashboardStat: null,
  classData: {},
  name: '',
  days: 0,
  day: '1',
  time: '',
  type: '',
  startDate: moment(),
  endDate: moment(),
  selectedValue: [],
  endtime: '',
  totalStudent: 0,
  oldSelectedValue: [],
  maleStudent: 0,
  femaleStudent: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case CLASSES.CLASS_LOADING_CHANGED:
      return {
        ...state,
        loading: INITIAL_STATE.loading,
      };
    case CLASSES.GET_CLASS_TEACHERS:
      return {
        ...state,
        classTeachersList: action.payload,
      };
    case CLASSES.GET_CLASSES:
      return {
        ...state,
        classesList: action.payload,
        classCreated: false,
      };
    case CLASSES.CLASS_TIME_LOG:
      return {
        ...state,
        timeLog: action.payload,
      };
    case CLASSES.ADD_CLASS:
      return {
        ...state,
        classCreated: true,
        userObject: '',
        classId: '',
        classesList: [],
        classTeachersList: [],
        selectedCountry: { Id: 1125, Name: 'USA' },
        timeLog: Object,
        loading: false,
        missingLog: [],
        dashboardStat: null,
        classData: {},
        name: '',
        days: 0,
        day: '1',
        time: '',
        type: '',
        startDate: moment(),
        endDate: moment(),
        selectedValue: [],
        endtime: '',
        totalStudent: 0,
        oldSelectedValue: [],
        maleStudent: 0,
        femaleStudent: 0,
      };
    case CLASSES.CLASS_DELETE_SUCCESS: {
      const classId = action.payload;
      const classess = state.classesList.filter(c => c.id !== classId);
      return {
        ...state,
        classesList: classess,
      };
    }
    case CLASSES.CLASS_MISSING_LOG:
      return {
        ...state,
        missingLog: action.payload,
      };
    case DASHBOARD.GET_DASHBOARD: {
      const d = action.payload;
      return {
        ...state,
        dashboardStat: d,
      };
    }
    case CLASSES.CLASS_SELECT: {
      const arr = action.payload.teacher;
      const data = [];
      arr.forEach(element => {
        data.push(element.teacherId);
      });
      return {
        ...state,
        classData: action.payload.classData,
        name: action.payload.classData.name,
        type: action.payload.classData.classType
          ? action.payload.classData.classType.toString()
          : '1',
        startDate: moment(action.payload.classData.startDateTime),
        endDate: moment(action.payload.classData.endDateTime),
        classTeachersList: action.payload.teachersData,
        selectedValue: data,
        oldSelectedValue: data,
        days: action.payload.classData.totalClasses,
        day: action.payload.classData.dayOfClass,
        time: action.payload.classData.timeOfClass,
        endtime: action.payload.classData.endTimeOfClass,
        totalStudent: action.payload.classData.totalStudent,
        maleStudent: action.payload.classData.maleStudent,
        femaleStudent: action.payload.classData.feMaleStudent,
      };
    }
    case CLASSES.CLASS_FORM_RESET:
      return {
        ...state,
        userObject: '',
        classId: '',
        classesList: [],
        classTeachersList: [],
        selectedCountry: { Id: 1125, Name: 'USA' },
        timeLog: Object,
        loading: false,
        missingLog: [],
        dashboardStat: null,
        classData: {},
        name: '',
        days: 0,
        day: '1',
        time: '',
        type: '',
        startDate: moment(),
        endDate: moment(),
        selectedValue: [],
        endtime: '',
        totalStudent: 0,
        oldSelectedValue: [],
        maleStudent: 0,
        femaleStudent: 0,
      };
    case CLASSES.CLASS_DELETED_SUCCESS: {
      const id = action.payload;
      return {
        ...state,
        classesList: state.classesList.filter(x => x.id !== id),
      };
    }
    default:
      return state;
  }
};
