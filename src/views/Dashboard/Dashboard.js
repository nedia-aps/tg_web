import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as classAction from "../../redux/actions/classAction";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dashboardData: null,
    };

  }
  componentWillMount() {
    const { classAction } = this.props;
    classAction.dashBordData();

  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

renderSpeedo(value){
  if(value === 0){
    return (<img src={require('../../images/0.png')} alt="background" style={{width: 590}}/>);
  } else if(value>0 && value<10){
    return (<img src={require('../../images/1.png')} alt="background" style={{width: 590}}/>);
  } else if(value>=10 && value<=20){
    return (<img src={require('../../images/2.png')} alt="background" style={{width: 590}}/>);
  } else if(value>=20 && value<=30){
    return (<img src={require('../../images/3.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=30 && value<=40){
    return (<img src={require('../../images/4.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=40 && value<=50){
    return (<img src={require('../../images/5.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=50 && value<=60){
    return (<img src={require('../../images/6.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=60 && value<=70){
    return (<img src={require('../../images/7.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=70 && value<=80){
    return (<img src={require('../../images/8.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=80 && value<=90){
    return (<img src={require('../../images/9.png')} alt="background" style={{width: 590}}/>);
  }else if(value>=90 && value<100){
    return (<img src={require('../../images/10.png')} alt="background" style={{width: 590}}/>);
  }
}
  render() {
    const {dashboardStat} = this.props;
    console.log(dashboardStat);
      return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-6 col-lg-6">
            <div className="card card-inverse">
               <h2 style={{color:'black',textAlign: 'center', marginTop: '12px'}}>Nuværende uge</h2>
              <div className="chart-wrapper">
              <div>
              { dashboardStat && dashboardStat.ugelog.procent !=='NaN' ?
                this.renderSpeedo(dashboardStat.ugelog.procent) : null
            }

{dashboardStat && dashboardStat.ugelog.totallog > 0 ?  <p style={{position: 'absolute', top: '48%', left: '48%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>{dashboardStat && dashboardStat.ugelog.totallog}</p> : ''}

{dashboardStat && dashboardStat.ugelog.totallog > 0 ? <p style={{position: 'absolute', top: '54%', left: '54%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>Timer</p> : null }


              </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-6">
          <div className="card card-inverse">
          <h2 style={{color:'black',textAlign: 'center', marginTop: '12px'}}>Nuværende måned</h2>
            <div className="chart-wrapper">
            <div>
            { dashboardStat &&
                this.renderSpeedo(dashboardStat.maanedlog.procent)
            }
{dashboardStat && dashboardStat.maanedlog.maanedtotallog > 0?
  <p style={{position: 'absolute', top: '48%', left: '48%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>
{dashboardStat && dashboardStat.maanedlog.maanedtotallog.toFixed(2)}</p>: null}

{dashboardStat && dashboardStat.maanedlog.maanedtotallog > 0?<p style={{position: 'absolute', top: '54%', left: '54%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>Timer</p> : null}

            </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-6">
          <div className="card card-inverse">
          <h2 style={{color:'black',textAlign: 'center', marginTop: '12px',}}>Hele perioden</h2>
            <div className="chart-wrapper">
            <div>
            { dashboardStat && dashboardStat.alltime.procent !== 'NaN' &&
                this.renderSpeedo(dashboardStat.alltime.procent)
            }
            { dashboardStat && dashboardStat.alltime.procent !== 'NaN' ?
            <p style={{position: 'absolute', top: '48%', left: '48%', transform: 'translate(-50%, -50%)',color:'white', fontSize: 32 }}>
              {dashboardStat && dashboardStat.alltime.totallog.toFixed(2)}</p>
              : null}
              { dashboardStat && dashboardStat.alltime.procent !== 'NaN' ?
            <p style={{position: 'absolute', top: '54%', left: '54%', transform: 'translate(-50%, -50%)',color:'white', fontSize: 32 }}>Timer</p>
            : null }

            </div>
            </div>
          </div>
        </div>
        </div>



      </div>
    );
  }
}
//export default Dashboard;
const mapStateToProps = ({ classReducer }) => {
  const { dashboardStat } = classReducer;
  return {
    dashboardStat
  };
};
const mapDispatchToProps = dispatch => {
  return {
    classAction: bindActionCreators(classAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Dashboard)
);
