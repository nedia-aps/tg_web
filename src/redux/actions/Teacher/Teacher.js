import React, { Component } from "react";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as teacherAction from "../../redux/actions";

const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameError: false,
      userName: "",
      userNameError: false,
      email: "",
      emailError: false,
      phone: ''
    };
  }

  onValueChange(propertyName, event) {
    this.setState({ [propertyName]: event.target.value });
    const value = event.target.value;
    switch (propertyName) {
      case "name":
        if (value === "" || value.trim() === "") {
          this.setState({ nameError: true });
          // error = true;
        }
      case "userName":
        if (value === "" || value.trim() === "") {
          this.setState({ userNameError: true });
          // error = true;
        }
      case "email":
        if (value === "" || value.trim() === "" || !value.match(EmailRegex)) {
          this.setState({ emailError: true });
          // error = true;
        }
    }
  }

  createTeacher(e) {
    e.preventDefault();
    const { name, userName, email, phone } = this.state;
    const { history } = this.props;
    this.props.teacherAction.saveTeacher({
      name,
      email,
      userName,
      phone,
      history
    });
  }

  onNameChange() {
    const { name } = this.state;
    if (name == "") {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }

  onEmailChange() {
    const { email } = this.state;
    if (email == "" || !email.match(EmailRegex)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
  }

  onUserNameChange() {
    const { userName } = this.state;
    if (userName == "") {
      this.setState({ userNameError: true });
    } else {
      this.setState({ userNameError: false });
    }
  }

  render() {
    const {
      name,
      userName,
      email,
      nameError,
      emailError,
      userNameError,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>Create </strong> Teacher
              </div>
              <div className="card-block">
                <form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="text-input"
                    >
                      Navn
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="text-input"
                        name="text-input"
                        className={
                          `form-control ${nameError ? "is-invalid" : ""}`
                        }
                        placeholder="Navn"
                        value={name}
                        onChange={this.onValueChange.bind(this, "name")}
                        onBlur={() => this.onNameChange()}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="username-input"
                    >
                      Brugernavn
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="username-input"
                        name="username-input"
                        value={userName}
                        className={
                          `form-control ${userNameError ? "is-invalid" : ""}`
                        }
                        placeholder="Brugernavn"
                        onChange={this.onValueChange.bind(this, "userName")}
                        onBlur={() => this.onNameChange()}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="password-input"
                    >
                      E-mail
                    </label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        id="email-input"
                        name="email-input"
                        value={email}
                        className={
                          `form-control ${emailError ? "is-invalid" : ""}`
                        }
                        placeholder="E-mail"
                        onChange={this.onValueChange.bind(this, "email")}
                        onBlur={() => this.onEmailChange()}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      Tlf nr
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        id="phone-input"
                        name="phone-input"
                        className="form-control"
                        placeholder="Tlf nr"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer text-right">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  onClick={this.createTeacher.bind(this)}
                >
                  <i className="fa fa-dot-circle-o" />
                  Save
                </button>
                <button type="reset" className="btn btn-sm btn-danger">
                  <i className="fa fa-ban" /> Nulstil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ teacherReducer }) => {
  const {} = teacherReducer;
  return {};
};
const mapDispatchToProps = dispatch => ({
  teacherAction: bindActionCreators(teacherAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Teacher)
);
