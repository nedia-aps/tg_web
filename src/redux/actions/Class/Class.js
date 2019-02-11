import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import {DatetimePicker} from 'rc-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
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
import * as classAction from "../../redux/actions";
import "react-select/dist/react-select.css";
import { debuglog } from "util";
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let formats = ["MMM d yyyy", "MMM d yy", "d"];
const options =
[
  {
    value: 'foo', label: 'Foo'
  },
  {
    value: 'bar', label: 'Bar'
  },
  {
    value: 'baz', label: 'Baz'
  }
];
class Class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameError: false,
      userName: "",
      userNameError: false,
      email: "",
      emailError: false,
      startDate: moment(),
      endDate: moment(),
      type: "",
      selectedOption: "",
      value: '',
      selectedValue: [],
      moment: moment()
    };

    this.createDateChange = this.createDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.cbChange = this.cbChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.onClassCategoryChange = this.endDateChange.bind(this);
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
  createClass(e) {
    e.preventDefault();
    const { name } = this.state;
    this.props.classAction.saveClass({
      name: name,
      startDate: this.state.startDate._d, //"Tue, 24 Jan 2018 17:26:26 GMT",
      endDate: this.state.endDate._d //"Tue, 25 Jan 2018 17:26:26 GMT"
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

  onCategoryChange(value) {
    //alert(event.target.value);
    this.setState({ type: value });
  }
  onClassCategoryChange(value) {
    this.setState({ type: value });
  }
  createDateChange(date) {
    this.setState({
      startDate: date
    });
  }
  endDateChange(date) {
    this.setState({
      endDate: date
    });
  }
  handleChange = selectedOption => {
    
    const arr=[];
    selectedOption.forEach(function(element) {
      arr.push(element.value);
  });
     //selectedOption.map(u => ()=> {
     // arr.push(selectedOption[0].value)
    //})
    this.setState({ selectedOption ,selectedValue:arr});
    
    //console.log(`Selected: ${selectedOption.label}`);
  };
  cbChange(event){
    alert(event.target.value);
  }
  // handleChange(value) {
  //   this.setState({ value });
  // }
  handleChangeDate = (moment) => {
    this.setState({
      moment
    });
  }
  render() {
    const {
      name,
      userName,
      email,
      nameError,
      emailError,
      userNameError,
      type,
      selectedOption,
      selectedValue
    } = this.state;
    const value = selectedOption && selectedOption.value;
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <strong>Create </strong> Class
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
                          "form-control " + (nameError ? "is-invalid" : "")
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
                      htmlFor="text-input"
                    >
                      Class Category
                    </label>
                    <div className="col-md-9">
                      <select
                        name="selectSm"
                        id="SelectLm"
                        className="form-control"
                        value={type}
                        onChange={evt =>
                          this.onClassCategoryChange(evt.target.value)
                        }
                      >
                        <option value="0">Please select</option>
                        <option value="1">Repeat</option>
                        <option value="2">Not Repeat</option>
                      </select>
                    </div>
                  </div>
                  {type == 1 ? (
                    <div>
                      <div className="form-group row">
                        <label
                          className="col-md-3 form-control-label"
                          htmlFor="phone-input"
                        >
                          No Of Days
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            id="phone-input"
                            name="phone-input"
                            className="form-control"
                            placeholder="No Of Days"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-md-3 form-control-label"
                          htmlFor="phone-input"
                        >
                          Time
                        </label>
                        <div className="col-md-9">
                          <input
                            type="text"
                            id="phone-input"
                            name="phone-input"
                            className="form-control"
                            placeholder="Time"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      Create Date Time
                    </label>
                    <div className="col-md-9">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.createDateChange}
                        showTimeSelect
                        dateFormat="LLL"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      End Date Time
                    </label>
                    <div className="col-md-9">
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.endDateChange}
                        showTimeSelect
                        dateFormat="LLL"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      Teachers
                    </label>
                    <div className="col-md-9">
                      <Select
                        name="form-field-name"
                        multi={true}
                        value={selectedValue}
                        removeSelected={false}
                        onChange={this.handleChange}
                        options={[
                          { value: "one", label: "One" },
                          { value: "two", label: "Two" }
                        ]}
                      />
                     
                    </div>
                    
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-md-3 form-control-label"
                      htmlFor="phone-input"
                    >
                      Teachers
                    </label>
                  <div className="col-md-9">
                    
                  <DatetimePicker
                    moment={this.state.moment}
                    onChange={this.handleChangeDate}
                  />
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
                  Save
                </button>
                <button type="reset" className="btn btn-sm btn-danger">
                  <i className="fa fa-ban" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ classReducer,teacherReducer }) => {
  const { userObject} = classReducer;
  const { teachersList} = teacherReducer;
  return {
    userObject,
    teachersList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    classAction: bindActionCreators(classAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Class));
