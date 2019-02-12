import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Breadcrumb from "../../components/Breadcrumb/";
import Aside from "../../components/Aside/";
import Footer from "../../components/Footer/";

import Dashboard from "../../views/Dashboard/";
import Widgets from "../../views/Widgets/";
import Teachers from "../../views/Teachers/";
import Classes from "../../views/Classes/";
import Teacher from "../../views/Teacher/";
import Class from "../../views/Class/";
// import Profile from "../../views/User/";
import TimeLog from "../../views/TimeLog/";
import MissingLog from "../../views/MissingLog/";
import ResetPassword from "../../views/ResetPassword/";
import Admin from "../../views/Admin/";

// import Loadmask from "react-redux-loadmask";

class Full extends Component {
  constructor(props) {
    super(props);
    this.loggedUser = null;
    this.state = {};
  }

  notAuthenticate(SuccessComponentName, FailComponent) {
    const state = localStorage.getItem("state");
    //return this.loggedUser !=null
    return state != null ? <SuccessComponentName /> : <Redirect to="/login" />;
  }
  render() {
    const { created, classCreated } = this.props;
    return (
      <div>
        <div className="app">
          <Header {...this.props} />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <div className="container-fluid">
                <Switch>
                  <Route
                    path="/dashboard"
                    name="statistik"
                    render={() => { 
                      return this.notAuthenticate(Dashboard, "/login");
                    }}
                  />

                  <Route path="/widgets" name="Widgets" component={Widgets} />
                  <Route
                    path="/undervisere"
                    name="Teachers"
                    component={Teachers}
                  />
                  <Route path="/classes" name="Classes" component={Classes} />
                  <Route
                    path="/teacher"
                    name="Teacher"
                    render={props =>
                      created ? <Redirect to="/teachers" /> : <Teacher {...props} />}
                  />
                  <Route
                    path="/class"
                    name="Class"
                    render={props =>
                      classCreated ? <Redirect to="/classes" /> : <Class {...props} />}
                  />
                  <Route
                    path="/timelog"
                    name="TimeLog"
                    component={TimeLog}
                />
                  <Route
                  path="/missinglog"
                  name="MissingLog"
                  component={MissingLog}
                />
                <Route
                  path="/resetpassword"
                  name="ResetPassword"
                  component={ResetPassword}
                />
                <Route
                  path="/admin"
                  name="Opret admin"
                  component={Admin}
                />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </div>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  accountReducerObject,
  teacherReducer,
  classReducer
}) => {
  const { isAuthenticated } = accountReducerObject;
  const { created } = teacherReducer;
  const { classCreated } = classReducer;
  return {
    isAuthenticated,
    created,
    classCreated
  };
};

export default connect(mapStateToProps, null)(Full);
