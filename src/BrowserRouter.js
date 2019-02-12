import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import { createBrowserHistory } from 'history';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import * as accountAction from "./redux/actions";
import Login from "./views/Pages/Login";
import Register from "./views/Pages/Register";
import Page404 from "./views/Pages/Page404";
import Page500 from "./views/Pages/Page500";
import Full from "./containers/Full";
// const history = createBrowserHistory();
class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.loggedUser = "asad";
    this.state = {};
  }

  componentDidMount() {
    this.props.accountAction.validateLoggedUser();
  }

  // notAuthenticate(SuccessComponentName, FailComponent) {
  //   const { isLoggedIn } = this.props;
  //   return this.loggedUser != null ? (
  //     <Redirect to={SuccessComponentName} />
  //   ) : (
  //     <FailComponent />
  //   );
  // }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Router>
        <div>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={props =>
              isAuthenticated ? <Redirect to="/" /> : <Login {...props} />
            }
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route
            path="/"
            name="Statistik"
            render={props =>
              isAuthenticated ? <Full {...props} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/classes"
            name="Classes"
            render={console.log('ok')
            }
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ accountReducerObject }) => {
  const { loggedUser, isAuthenticated } = accountReducerObject;
  return {
    loggedUser,
    isAuthenticated
  };
};
const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowserRouter);
