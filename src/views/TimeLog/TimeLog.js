import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Loadmask from 'react-redux-loadmask';
import * as classActions from '../../redux/actions';

class TimeLog extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
  }

  // eslint-disable-next-line
  componentWillMount() {
    const { classId, classAction } = this.props;
    classAction.getClassLog(classId);
  }

  handleClick(id) {
    const { classAction } = this.props;
    classAction.formChanged({ prop: 'userId', value: id });
    window.location = '/#/components/user';
  }

  handleLogClick() {
    // id
    window.location = '/#/components/TimeLog';
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

  renderSpeedo(value) {
    const id = value === 0 ? 0 : Math.floor(Math.min(90, value) / 10) + 1;
    // eslint-disable-next-line
    const url = require(`../../images/${id}.png`);
    return <img src={url} alt="background" style={{ width: 590 }} />;
  }

  render() {
    const { timeLog } = this.props;
    const { loggedDetails, logged, totalHours } = timeLog;
    // eslint-disable-next-line
    const loadingImg = require('../../images/loading.gif');
    return (
      <div>
        <Loadmask>
          <img src={loadingImg} alt="indlæser" width="100" height="100" />
        </Loadmask>
        <div className="animated fadeIn">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header" />
                <div className="card-block">
                  <table className="table table-bordered table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Navn</th>
                        <th>Dato</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loggedDetails
                        ? loggedDetails.map(l => (
                            <tr key={l.logDate}>
                              <td>{l.teacherName}</td>
                              <td>{this.dateFormate(l.logDate)}</td>
                              <td>{l.time.toFixed(2)}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-12">
              <div className="card card-inverse">
                <h2
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    marginTop: '12px',
                  }}
                >
                  Nuværende måned
                </h2>
                <div className="chart-wrapper">
                  <div style={{ textAlign: 'center' }}>
                    {timeLog && this.renderSpeedo(logged / totalHours)}

                    <p
                      style={{
                        position: 'absolute',
                        top: '48%',
                        left: '48%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: 32,
                      }}
                    >
                      {logged && logged.toFixed(2)}
                    </p>
                    <p
                      style={{
                        position: 'absolute',
                        top: '54%',
                        left: '54%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: 32,
                      }}
                    >
                      Timer
                    </p>
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

const mapStateToProps = ({ classReducer }) => {
  const { timeLog, classId, loading } = classReducer;
  return {
    timeLog,
    classId,
    loading,
  };
};
const mapDispatchToProps = dispatch => ({
  classAction: bindActionCreators(classActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TimeLog));
