import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as classActions from '../../redux/actions/classAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      // dashboardData: null,
    };
  }

  // eslint-disable-next-line
  componentWillMount() {
    const { classAction } = this.props;
    classAction.dashBordData();
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  renderSpeedo(value) {
    const id = value === 0 ? 0 : Math.floor(Math.min(90, value) / 10) + 1;
    // eslint-disable-next-line
    const url = require(`../../images/${id}.png`);
    return <img src={url} alt="background" style={{ width: '100%' }} />;
  }

  render() {
    const { dashboardStat } = this.props;
    // console.log(dashboardStat);
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="card card-inverse">
              <h2
                style={{
                  color: 'black',
                  textAlign: 'center',
                  marginTop: '12px',
                }}
              >
                Nuværende uge
              </h2>
              <div className="chart-wrapper">
                <div>
                  {dashboardStat && dashboardStat.ugelog.procent !== 'NaN'
                    ? this.renderSpeedo(dashboardStat.ugelog.procent)
                    : null}

                  {dashboardStat && dashboardStat.ugelog.totallog > 0 ? (
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
                      {dashboardStat && dashboardStat.ugelog.totallog}
                    </p>
                  ) : (
                    ''
                  )}
                  {dashboardStat && dashboardStat.ugelog.totallog > 0 ? (
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
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-6">
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
              <div className="chart-wrapper" style={{ position: 'relative' }}>
                <div>
                  {dashboardStat &&
                    dashboardStat.maanedlog.procent !== 'NaN' &&
                    this.renderSpeedo(dashboardStat.maanedlog.procent)}
                  {dashboardStat &&
                  dashboardStat.maanedlog.maanedtotallog > 0 ? (
                    <p
                      style={{
                        position: 'absolute',
                        top: 'calc(40% + 35px)',
                        left: 0,
                        right: 0,
                        transform: 'translate(0, -100%)',
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                      }}
                    >
                      {dashboardStat &&
                        dashboardStat.maanedlog.maanedtotallog.toFixed(2)}
                    </p>
                  ) : null}

                  {dashboardStat && dashboardStat.maanedlog.maanedtotallog > 0 && (
                    <p
                      style={{
                        position: 'absolute',
                        top: '52%',
                        left: 0,
                        right: 0,
                        transform: 'translate(0%, -50%)',
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                      }}
                    >
                      Timer
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-6">
            <div className="card card-inverse">
              <h2
                style={{
                  color: 'black',
                  textAlign: 'center',
                  marginTop: '12px',
                }}
              >
                Hele perioden
              </h2>
              <div className="chart-wrapper" style={{ position: 'relative' }}>
                <div>
                  {dashboardStat &&
                    dashboardStat.alltime.procent !== 'NaN' &&
                    this.renderSpeedo(dashboardStat.alltime.procent)}
                  {dashboardStat && dashboardStat.alltime.procent !== 'NaN' ? (
                    <p
                      style={{
                        position: 'absolute',
                        top: 'calc(40% + 35px)',
                        left: 0,
                        right: 0,
                        transform: 'translate(0, -100%)',
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                      }}
                    >
                      {dashboardStat &&
                        dashboardStat.alltime.totallog.toFixed(2)}
                    </p>
                  ) : null}
                  {dashboardStat && dashboardStat.alltime.procent !== 'NaN' && (
                    <p
                      style={{
                        position: 'absolute',
                        top: '52%',
                        left: 0,
                        right: 0,
                        transform: 'translate(0%, -50%)',
                        color: 'white',
                        fontSize: 32,
                        textAlign: 'center',
                      }}
                    >
                      Timer
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default Dashboard;
const mapStateToProps = ({ classReducer }) => {
  const { dashboardStat } = classReducer;
  return {
    dashboardStat,
  };
};
const mapDispatchToProps = dispatch => ({
  classAction: bindActionCreators(classActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Dashboard));
