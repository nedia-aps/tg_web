import { USER_CHANGED, TEACHERS } from "../types";

const INITIAL_STATE = {
  userObject: "",
  userId: "",
  userList: [],
  teachersList: [],
  selectedCountry: { Id: 1125, Name: "USA" },
  created: false,
  teacher:'',
  isDelete: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHANGED:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case TEACHERS.GET_TEACHERS:
      return {
        ...state,
        teachersList: action.payload,
        created: false,
        teacher:'',
        isDelete: false
      };
      case TEACHERS.SET_TEACHER:
      return {
        ...state,
        teacher: action.payload,
      };
    case TEACHERS.ADD_TEACHER:
      return {
        ...state,
        created: true
      };
      case TEACHERS.DELETE_TEACHER:
      return {
        ...state,
        isDelete: action.payload
      };
    default:
      return state;
  }
};
