import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as teacherActions from '../../redux/actions';
// eslint-disable-next-line
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class Teacher extends Component {
  constructor(props) {
    super(props);
    const { teacher } = this.props;
    this.state = {
      name: teacher ? teacher.name : '',
      nameError: false,
      userName: teacher ? teacher.email : '',
      // userNameError: false,
      email: teacher ? teacher.email : '',
      emailError: false,
      phone: teacher && teacher.phone ? teacher.phone : '',
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  onResetClick() {
    this.setState(
      {
        name: '',
        nameError: false,
        userName: '',
        email: '',
        emailError: false,
        phone: '',
      },
      () => this.nameInput.focus(),
    );
  }

  onValueChange(propertyName, event) {
    const { value } = event.target;
    this.setState({ [propertyName]: value });

    switch (propertyName) {
      case 'name':
        if (value === '' || value.trim() === '') {
          this.setState({ nameError: true });

          // error = true;
        }
        break;
      case 'userName':
        if (value === '' || value.trim() === '') {
          // this.setState({ userNameError: true });
          // error = true;
        }
        break;
      case 'email':
        if (value === '' || value.trim() === '' || !value.match(EmailRegex)) {
          this.setState({ emailError: true });

          // error = true;
        }
        break;
      default:
        break;
    }
  }

  createTeacher(e) {
    e.preventDefault();
    const { name, email, phone } = this.state;
    const { history, teacher, teacherAction } = this.props;
    let error = false;
    if (name === '' || name.trim() === '') {
      this.setState({ nameError: true });
      error = true;
    }
    if (email === '' || email.trim() === '' || !email.match(EmailRegex)) {
      this.setState({ emailError: true });
      error = true;
    }

    if (error) {
      return false;
    }
    if (teacher) {
      teacherAction.updateTeacher({
        id: teacher.id,
        name,
        email,
        userName: email,
        phone,
        history,
      });
    } else {
      teacherAction.saveTeacher({
        name,
        email,
        userName: email,
        phone,
        history,
      });
    }
  }

  onNameChange() {
    const { name } = this.state;
    if (name === '') {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }

  onEmailChange() {
    const { email } = this.state;
    if (email === '' || !email.match(EmailRegex)) {
      this.setState({ emailError: true });
    } else {
      this.setState({ emailError: false });
    }
  }

  onUserNameChange() {
    const { userName } = this.state;
    if (userName === '') {
      // this.setState({ userNameError: true });
    } else {
      // this.setState({ userNameError: false });
    }
  }

  render() {
    const { teacher } = this.props;
    const { name, email, phone, nameError, emailError } = this.state;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong> {teacher ? 'Rediger' : 'Opret'} </strong> bruger
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
                        className={`form-control ${
                          nameError ? 'is-invalid' : ''
                        }`}
                        placeholder="Navn"
                        value={name}
                        ref={input => {
                          this.nameInput = input;
                        }}
                        onChange={this.onValueChange.bind(this, 'name')}
                        onBlur={() => this.onNameChange()}
                      />
                      {nameError ? (
                        <span className="is-invalid">Navn skal udfyldes</span>
                      ) : (
                        ''
                      )}
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
                        className={`form-control ${
                          emailError ? 'is-invalid' : ''
                        }`}
                        placeholder="E-mail"
                        onChange={this.onValueChange.bind(this, 'email')}
                        onBlur={() => this.onEmailChange()}
                        disabled={!!teacher.email}
                      />
                      {emailError ? (
                        <span className="is-invalid">
                          Du skal udfylde en gyldig e-mail{' '}
                        </span>
                      ) : (
                        ''
                      )}
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
                        value={phone}
                        type="text"
                        id="phone-input"
                        name="phone-input"
                        className="form-control"
                        placeholder="Tlf nr"
                        onChange={this.onValueChange.bind(this, 'phone')}
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
                  Gem
                </button>
                <button
                  type="reset"
                  className="btn btn-sm btn-danger"
                  onClick={() => this.onResetClick()}
                >
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
  const { teacher } = teacherReducer;
  return { teacher };
};
const mapDispatchToProps = dispatch => ({
  teacherAction: bindActionCreators(teacherActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Teacher));
