export const config = {
  //ROOT_URL: "http://api.tgiapp.dk.web125.curanetserver.dk/",
  ROOT_URL: "http://localhost:22876/",//"http://dev.tg.com/", //"http://api.tgiapp.dk.web125.curanetserver.dk/", //"http://api.tg.com/",
  REST_APIs: {
    Account: {
      LogIn: "Token",
      ValidateLoggedUser: "api/User/ValidateLoggedUser",
      LogOff: "api/Account/Logout",
      ResetPassword: "api/Account/ChangePassword",
      Register: "api/Account/Register"
    },
    Dashboard:{
      DashboardStats: "api/Classes/Log",
    },
    User: {
      GetTeachers: "api/User/GetTeachers",
      AddTeacher: "api/User/AddTeachers",
      UpdateTeacher: "api/User/UpdateTeacher",
      Delete: "api/User/Delete"
    },
    Class: {
      AddClass: "api/Classes/AddClass",
      UpdateClass: "api/Classes/UpdateClass",
      GetClasses: "api/Classes/GetClasses",
      GetClassLog: "api/Classes/GetClassLog",
      DeleteClass: "api/Classes/DeleteClass",
      NoLog: "api/Classes/GetClassesWithNoLog",
      GetClass: "api/Classes/GetClassById"
    }
  }
};
