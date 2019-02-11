import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as classAction from "../../redux/actions";
import Loadmask from "react-redux-loadmask";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class MissingLog extends Component {
  handleClick(id) {
    this.props.classAction.formChanged({ prop: "userId", value: id });
    // console.log(this.props.userObject);
    window.location = "/#/components/user";
  }
  handleLogClick(id) {
    const{history}=this.props;
    this.props.classAction.formChanged({ prop: "classId", value: id });
    history.push("/timelog");
   // this.props.classAction.formChanged({ prop: "userId", value: id });
    // console.log(this.props.userObject);
    //window.location = "/#/components/user";
  }
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.deleteConfirm= this.deleteConfirm.bind(this);

  }
  componentWillMount() {
    this.props.classAction.noClassLog();
  }
  delete(id) {
    this.setState({
      danger: true,
      id:id
    });
  }
  deleteConfirm() {
    this.setState({
      danger: false
    });
    this.props.classAction.deleteClass(this.state.id);
  }
  dateFormate = (d) => {
    const formateDate = new Date(d);
    const date = `${monthShortNames[formateDate.getMonth()]} ${formateDate.getDate()}, ${formateDate.getFullYear()}`;
    return date;
  };
  render() {
    const {missingLog} = this.props;
    return (
      <div>
      <Loadmask>
        <img src={require('../../images/loading.gif')} width="100" height="100" />
        </Loadmask>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                Mangler log
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Hold</th>
                      <th>Start dato</th>
                      <th>Slut dato</th>

                    </tr>
                  </thead>
                  <tbody>
                    {missingLog?missingLog.map(l => (
                      <tr key={l.id}>
                         <td>{l.name}</td>
                        <td>{this.dateFormate(l.startDateTime)}</td>
                        <td>{this.dateFormate(l.endDateTime)}</td>

                      </tr>
                    )):null}
                  </tbody>
                </table>

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
  const { missingLog } = classReducer;
  return {
    missingLog
  };
};
const mapDispatchToProps = dispatch => {
  return {
    classAction: bindActionCreators(classAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MissingLog)
);
