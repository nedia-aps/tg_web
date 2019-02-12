import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Loadmask from 'react-redux-loadmask';
import * as classActions from '../../redux/actions';

class MissingLog extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  // eslint-disable-next-line
  componentWillMount() {
    const { classAction } = this.props;
    classAction.noClassLog();
  }

  handleClick(id) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'userId', value: id });
    // console.log(this.props.userObject);
    window.location = '/#/components/user';
  }

  handleLogClick(id) {
    const { history, classAction } = this.props;
    classAction.formChanged({ prop: 'classId', value: id });
    history.push('/timelog');
    // this.props.classAction.formChanged({ prop: "userId", value: id });
    // console.log(this.props.userObject);
    // window.location = "/#/components/user";
  }

  delete(id) {
    this.setState({
      // danger: true,
      id,
    });
  }

  deleteConfirm() {
    const { classAction } = this.props;
    const { id } = this.state;
    // this.setState({
    //   danger: false,
    // });
    classAction.deleteClass(id);
  }

  dateFormate = d => {
    const formateDate = new Date(d);
    let dd = formateDate.getDate();
    let mm = formateDate.getMonth() + 1; // January is 0!
    const yyyy = formateDate.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${dd}/${mm}/${yyyy}`;
  };

  render() {
    const { missingLog } = this.props;
    // eslint-disable-next-line
    const loading = require('../../images/loading.gif');

    return (
      <div>
        <Loadmask>
          <img src={loading} alt="indlæser" width="100" height="100" />
        </Loadmask>
        <div className="animated fadeIn">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">Mangler log</div>
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
                      {missingLog
                        ? missingLog.map(l => (
                            <tr key={l.id}>
                              <td>{l.name}</td>
                              <td>{this.dateFormate(l.startDateTime)}</td>
                              <td>{this.dateFormate(l.endDateTime)}</td>
                            </tr>
                          ))
                        : null}
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
    missingLog,
  };
};
const mapDispatchToProps = dispatch => ({
  classAction: bindActionCreators(classActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MissingLog));
