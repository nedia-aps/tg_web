import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as accountAction from "../../redux/actions";
import AdminForm from "../../components/Forms/AdminForm";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  handleSubmit=(values)=>{
    const {accountAction,history}= this.props;
    let model={Name: values.Name,Email: values.Email,Phone: values.Phone,UserName: values.Email,Password: values.Password, ConfirmPassword: values.ConfirmPassword};
    accountAction.createAdmin(model,history)
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <AdminForm onSubmit={this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    accountAction: bindActionCreators(accountAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Admin)
);
