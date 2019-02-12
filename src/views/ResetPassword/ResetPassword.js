import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as accountAction from "../../redux/actions";
import ResetForm from "../../components/Forms/ResetForm";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit= this.handleSubmit.bind(this);

  }
  handleSubmit=(values)=>{
    const {accountAction,history}= this.props;
    let model={OldPassword: values.OldPassword,NewPassword: values.NewPassword, ConfirmPassword: values.ConfirmPassword};
    accountAction.resetPassword(model,history)
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">

                <ResetForm onSubmit={this.handleSubmit}/>

          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ accountReducerObject }) => {
  const {} = accountReducerObject;
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    accountAction: bindActionCreators(accountAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ResetPassword)
);
