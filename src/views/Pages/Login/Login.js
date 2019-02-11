import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, history } from "react-router-dom";
import * as accountAction from "../../../redux/actions";
import Button from "react-bootstrap-button-loader";
import { toastr, actions as toastrActions } from "react-redux-toastr";
import Loadmask from "react-redux-loadmask";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "hannerysg@me.com", password: "Fosv@431", nameError: false, pwError: false };
  }
  loginUser(e) {
    const { accountAction } = this.props;
    const { login } = accountAction;
    e.preventDefault();
    var error = false;
    if (this.state.name === "" || this.state.name.trim() === "") {
      this.setState({ nameError: true });
      error = true;
    }
    if (this.state.password === "" || this.state.password.trim() === "") {
      this.setState({ pwError: true });
      error = true;
    }
    if (!error) {
      var loginModel = {
        Email: this.state.name,
        Password: this.state.password
      };
      login(loginModel);
    }
  }
  onValueChange(propertyName, event) {
    this.setState({ [propertyName]: event.target.value });
  }
  render() {
    const { isLogin, isAuthenticated } = this.props;
    const { name,password, nameError, pwError } = this.state;
    const { loading } = this.props;
    if (isLogin && !isAuthenticated) {
      this.props.accountAction.validateLoggedUser();
    }
    return (
      <div>
        <Loadmask>
        <img src={require('../../../images/loading.gif')} width="100" height="100" />
        </Loadmask>
        <div className="app flex-row align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card-group mb-0">
                  <div className="card p-4">
                    <div className="card-block">
                      <h1>Log Ind</h1>
                      <p className="text-muted">Log ind på din konto</p>
                      <p className="text-muted">
                        {this.props.message}
                      </p>
                      <div
                        className={
                          "input-group mb-3 " + (nameError ? "has-danger" : "")
                        }
                      >
                        <span className="input-group-addon">
                          <i className="icon-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Brugernavn"
                          value={name}
                          onChange={this.onValueChange.bind(this, "name")}
                        />
                      </div>
                      <div
                        className={
                          "input-group mb-3 " + (pwError ? "has-danger" : "")
                        }
                      >
                        <span className="input-group-addon">
                          <i className="icon-lock" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Kodeord"
                          value={password}
                          onChange={this.onValueChange.bind(this, "password")}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Button
                            loading={loading}
                            className="btn btn-primary px-4"
                            onClick={this.loginUser.bind(this)}
                          >
                          Log ind
                          </Button>
                              </div>
                        <div className="col-6 text-right">
                          <button type="button" className="btn btn-link px-0">
                          Glemt kode
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ accountReducerObject }) => {
  const { isLogin, isAuthenticated } = accountReducerObject;
  return {
    isLogin,
    isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    accountAction: bindActionCreators(accountAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
