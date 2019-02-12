import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Loadmask from 'react-redux-loadmask';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as classActions from '../../redux/actions';
import 'react-select/dist/react-select.css';

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameError: false,
      // userName: '',
      // userNameError: false,
      // daysError: false,
      // timeError: false,
      // endDate: moment(),
      typeError: false,
      // selectedOption: '',
      // value: '',
      // selectedValue: [],
      teacherError: false,
      // moment: moment(),
      // endtime: '',
      studentError: false,
    };

    this.createDateChange = this.createDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.cbChange = this.cbChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    // this.onClassCategoryChange = this.endDateChange.bind(this);
  }

  componentWillMount() {
    const { classId, classAction } = this.props;
    if (classId) {
      classAction.getClassById(classId);
      // this.setState({ name: classData.name });
    } else {
      classAction.getTeachders();
    }
  }

  onValueChange(propertyName, event) {
    const { maleStudent, femaleStudent, classAction } = this.props;
    const { type } = this.state;
    const { value } = event.target;
    this.setState({ [propertyName]: value });
    classAction.formChanged({ prop: propertyName, value });
    switch (propertyName) {
      case 'name':
        if (value === '' || value.trim() === '') {
          this.setState({ nameError: true });
          // error = true;
        } else {
          this.setState({ nameError: false });
        }
        break;
      case 'time':
        if ((type === '1' && value === '') || value.trim() === '') {
          // this.setState({ timeError: true });
          // error = true;
        } else {
          // this.setState({ timeError: false });
        }
        break;
      case 'maleStudent':
        if (maleStudent === 0 && femaleStudent === 0) {
          this.setState({ studentError: true });
          // error = true;
        } else {
          this.setState({ studentError: false });
        }
        break;
      case 'femaleStudent':
        if (maleStudent === 0 && femaleStudent === 0) {
          this.setState({ studentError: true });
          // error = true;
        } else {
          this.setState({ studentError: false });
        }
        break;
      default:
        break;
    }
  }

  createClass(e) {
    e.preventDefault();
    const {
      name,
      time,
      day,
      endtime,
      startDate,
      endDate,
      type,
      selectedValue,
      maleStudent,
      femaleStudent,
      classId,
      classAction,
    } = this.props;
    let error = false;
    if (name === '' || name.trim() === '') {
      this.setState({ nameError: true });
      error = true;
    }
    if (type === '') {
      this.setState({ typeError: true });
      error = true;
    }
    if (selectedValue.length === 0) {
      this.setState({ teacherError: true });
      error = true;
    }
    if (type === '1' && time === '') {
      // this.setState({ timeError: true });
      error = true;
    }
    if (maleStudent === 0 && femaleStudent === 0) {
      this.setState({ studentError: true });
      error = true;
    }
    if (maleStudent === 0 && femaleStudent === 0) {
      this.setState({ studentError: true });
      error = true;
    }
    if (error) {
      return false;
    }
    if (classId) {
      classAction.updateClass({
        classId,
        name,
        startDate: startDate._d, // "Tue, 24 Jan 2018 17:26:26 GMT",
        endDate: endDate._d, // "Tue, 25 Jan 2018 17:26:26 GMT"
        IsRepeatable: type === '1',
        Teachers: selectedValue.toString(),
        DayOfClass: type === '2' ? 1 : day,
        time,
        EndTimeOfClass: endtime,
        MaleStudent: parseInt(maleStudent, 10),
        FeMaleStudent: parseInt(femaleStudent, 10),
        TotalStudent: parseInt(maleStudent, 10) + parseInt(femaleStudent, 10),
      });
    } else {
      classAction.saveClass({
        name,
        startDate: startDate._d, // "Tue, 24 Jan 2018 17:26:26 GMT",
        endDate: endDate._d, // "Tue, 25 Jan 2018 17:26:26 GMT"
        IsRepeatable: type === '1',
        Teachers: selectedValue.toString(),
        time,
        EndTimeOfClass: endtime,
        DayOfClass: type === '2' ? 1 : day,
        MaleStudent: parseInt(maleStudent, 10),
        FeMaleStudent: parseInt(femaleStudent, 10),
        TotalStudent: parseInt(maleStudent, 10) + parseInt(femaleStudent, 10),
      });
    }
  }

  onNameChange() {
    const { name } = this.props;
    if (name === '') {
      this.setState({ nameError: true });
    } else {
      this.setState({ nameError: false });
    }
  }

  onMaleStudentBlur() {
    const { maleStudent, femaleStudent } = this.props;
    if (maleStudent === 0 && femaleStudent === 0) {
      this.setState({ studentError: true });
    } else {
      this.setState({ studentError: false });
    }
  }

  onFeMaleStudentBlur() {
    const { maleStudent, femaleStudent } = this.props;
    if (maleStudent === 0 && femaleStudent === 0) {
      this.setState({ studentError: true });
    } else {
      this.setState({ studentError: false });
    }
  }

  // onDaysChange() {
  //   const { days, type } = this.state;
  //   if (type === '1' && days === '') {
  //     this.setState({ daysError: true });
  //   } else {
  //     this.setState({ daysError: false });
  //   }
  // }

  onTimeChange(value) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'time', value });
    const { time, type } = this.props;
    if (type === '1' && time === '') {
      // this.setState({ timeError: true });
    } else {
      // this.setState({ timeError: false });
    }
  }

  onEndTimeChange(value) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'endtime', value });
  }

  onCategoryChange(value) {
    this.setState({ type: value });
  }

  onClassCategoryChange(value) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'type', value });
    if (value === '') {
      this.setState({ typeError: true });
    } else {
      this.setState({ typeError: false });
    }
  }

  onDayChange(value) {
    const { classAction } = this.props;
    // this.setState({ day: value });
    classAction.formChanged({ prop: 'day', value });
  }

  createDateChange(date) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'startDate', value: date });
  }

  endDateChange(date) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'endDate', value: date });
  }

  handleChange = selectedOption => {
    const { classAction } = this.props;
    const arr = [];
    selectedOption.forEach(element => {
      arr.push(element.value);
    });
    classAction.formChanged({ prop: 'selectedValue', value: arr });
    // this.setState({ selectedOption });
    if (arr.length === 0) {
      this.setState({ teacherError: true });
    } else {
      this.setState({ teacherError: false });
    }
    // console.log(`Selected: ${selectedOption.label}`);
  };

  cbChange(event) {
    alert(event.target.value);
  }

  // handleChange(value) {
  //   this.setState({ value });
  // }
  // handleChangeDate = mom => {
  //   this.setState({
  //     moment: mom,
  //   });
  // };

  getTeachers() {
    const { classTeachersList } = this.props;
    const arr = [];
    if (classTeachersList) {
      classTeachersList.map(t => arr.push({ value: t.id, label: t.name }));
    }
    return arr;
  }

  onResetClick() {
    // this.props.classAction.classFormReset();
  }

  render() {
    const { nameError, teacherError, typeError, studentError } = this.state;
    const {
      type,
      day,
      selectedValue,
      startDate,
      endDate,
      time,
      endtime,
      maleStudent,
      femaleStudent,
      name,
    } = this.props;
    // eslint-disable-next-line
    const loadingImg = require('../../images/loading.gif');
    return (
      <div>
        <Loadmask>
          <img src={loadingImg} alt="indlæser" width="100" height="100" />
        </Loadmask>
        <div className="animated fadeIn">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-header">
                  <strong>Opret </strong> hold
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
                        htmlFor="text-input"
                      >
                        Type
                      </label>
                      <div className="col-md-9">
                        <select
                          name="selectSm"
                          id="SelectLm"
                          className={`form-control ${
                            typeError ? 'is-invalid' : ''
                          }`}
                          value={type}
                          onChange={evt =>
                            this.onClassCategoryChange(
                              evt.target.value.toString(),
                            )
                          }
                        >
                          <option value="0">Vælg venligst</option>
                          <option value="1">Gentagende</option>
                          <option value="2">Ikke gentagende</option>
                        </select>
                        {typeError ? (
                          <span className="is-invalid">
                            Kategori skal udfyldes
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="form-group row">
                        <label
                          className="col-md-3 form-control-label"
                          htmlFor="text-input"
                        >
                          dag
                        </label>
                        <div className="col-md-9">
                          <select
                            name="selectSm"
                            id="SelectLm"
                            className="form-control"
                            value={day}
                            onChange={evt => this.onDayChange(evt.target.value)}
                          >
                            <option value="1">Mandag</option>
                            <option value="2">Tirsdag</option>
                            <option value="3"> Onsdag</option>
                            <option value="4">Torsdag</option>
                            <option value="5">Fredag</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="time-input"
                      >
                        Starttid
                      </label>
                      <div className="col-md-9">
                        <select
                          name="selectSm"
                          id="SelectLm"
                          className="form-control"
                          value={time}
                          onChange={evt => this.onTimeChange(evt.target.value)}
                        >
                          <option value="00:00">00:00</option>
                          <option value="00:30">00:30</option>
                          <option value="01:00">01:00</option>
                          <option value="01:30">01:30</option>
                          <option value="02:00">02:00</option>
                          <option value="02:30">02:30</option>
                          <option value="03:00">03:00</option>
                          <option value="03:30">03:30</option>
                          <option value="04:00">04:00</option>
                          <option value="04:30">04:30</option>
                          <option value="05:00">05:00</option>
                          <option value="05:30">05:30</option>
                          <option value="06:00">06:00</option>
                          <option value="06:30">06:30</option>
                          <option value="07:00">07:00</option>
                          <option value="07:30">07:30</option>
                          <option value="08:00">08:00</option>
                          <option value="08:30">08:30</option>
                          <option value="09:00">09:00</option>
                          <option value="09:30">09:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                          <option value="14:30">14:30</option>
                          <option value="15:00">15:00</option>
                          <option value="15:30">15:30</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                          <option value="19:30">19:30</option>
                          <option value="20:00">20:00</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                          <option value="22:00">22:00</option>
                          <option value="22:30">22:30</option>
                          <option value="23:00">23:00</option>
                          <option value="23:30">23:30</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="time-input"
                      >
                        Sluttid
                      </label>
                      <div className="col-md-9">
                        <select
                          name="selectSm"
                          id="SelectLm"
                          className="form-control"
                          value={endtime}
                          onChange={evt =>
                            this.onEndTimeChange(evt.target.value)
                          }
                        >
                          <option value="00:00">00:00</option>
                          <option value="00:30">00:30</option>
                          <option value="01:00">01:00</option>
                          <option value="01:30">01:30</option>
                          <option value="02:00">02:00</option>
                          <option value="02:30">02:30</option>
                          <option value="03:00">03:00</option>
                          <option value="03:30">03:30</option>
                          <option value="04:00">04:00</option>
                          <option value="04:30">04:30</option>
                          <option value="05:00">05:00</option>
                          <option value="05:30">05:30</option>
                          <option value="06:00">06:00</option>
                          <option value="06:30">06:30</option>
                          <option value="07:00">07:00</option>
                          <option value="07:30">07:30</option>
                          <option value="08:00">08:00</option>
                          <option value="08:30">08:30</option>
                          <option value="09:00">09:00</option>
                          <option value="09:30">09:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                          <option value="14:30">14:30</option>
                          <option value="15:00">15:00</option>
                          <option value="15:30">15:30</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                          <option value="18:30">19:30</option>
                          <option value="20:00">20:00</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                          <option value="22:00">22:00</option>
                          <option value="22:30">22:30</option>
                          <option value="23:00">23:00</option>
                          <option value="23:30">23:30</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="phone-input"
                      >
                        Start dato
                      </label>
                      <div className="col-md-9">
                        <DatePicker
                          selected={startDate}
                          onChange={this.createDateChange}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="phone-input"
                      >
                        Slut dato
                      </label>
                      <div className="col-md-9">
                        <DatePicker
                          selected={endDate}
                          onChange={this.endDateChange}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="phone-input"
                      >
                        Undervisere
                      </label>
                      <div className="col-md-9">
                        <Select
                          name="form-field-name"
                          multi
                          value={selectedValue}
                          removeSelected={false}
                          onChange={this.handleChange}
                          options={this.getTeachers()}
                          placeholder="Vælg instruktør"
                          className={teacherError ? 'is-invalid' : ''}
                        />
                        {teacherError ? (
                          <span className="is-invalid">
                            Du skal vælge mindst en instruktør
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="text-input"
                      >
                        Antal drenge
                      </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          id="text-input"
                          name="text-input"
                          className={`form-control ${
                            studentError ? 'is-invalid' : ''
                          }`}
                          placeholder="Antal"
                          value={maleStudent}
                          onChange={this.onValueChange.bind(
                            this,
                            'maleStudent',
                          )}
                          onBlur={() => this.onMaleStudentBlur()}
                        />
                        {studentError ? (
                          <span className="is-invalid">
                            Antal drenge og piger skal udfyldes
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-md-3 form-control-label"
                        htmlFor="text-input"
                      >
                        Antal piger
                      </label>
                      <div className="col-md-9">
                        <input
                          type="number"
                          id="text-input"
                          name="text-input"
                          className={`form-control ${
                            studentError ? 'is-invalid' : ''
                          }`}
                          placeholder="Female Students"
                          value={femaleStudent}
                          onChange={this.onValueChange.bind(
                            this,
                            'femaleStudent',
                          )}
                          onBlur={() => this.onFeMaleStudentBlur()}
                        />
                        {studentError ? (
                          <span className="is-invalid">
                            Antal drenge og piger skal udfyldes
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                <div className="card-footer text-right">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    onClick={this.createClass.bind(this)}
                  >
                    <i className="fa fa-dot-circle-o" />
                    Gem
                  </button>
                  <button
                    type="reset"
                    className="btn btn-sm btn-danger"
                    onClick={this.onResetClick()}
                  >
                    <i className="fa fa-ban" /> Nulstil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ classReducer }) => {
  const {
    classId,
    name,
    classData,
    userObject,
    classTeachersList,
    selectedValue,
    type,
    days,
    day,
    totalStudent,
    time,
    endtime,
    startDate,
    endDate,
    oldSelectedValue,
    maleStudent,
    femaleStudent,
  } = classReducer;
  return {
    classId,
    classData,
    userObject,
    classTeachersList,
    name,
    selectedValue,
    type,
    days,
    day,
    totalStudent,
    time,
    endtime,
    startDate,
    endDate,
    oldSelectedValue,
    maleStudent,
    femaleStudent,
  };
};
const mapDispatchToProps = dispatch => ({
  classAction: bindActionCreators(classActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Class));
