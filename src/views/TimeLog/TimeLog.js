import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Loadmask from "react-redux-loadmask";
import * as classAction from "../../redux/actions";

class TimeLog extends Component {
  handleClick(id) {
    this.props.classAction.formChanged({ prop: "userId", value: id });
    window.location = "/#/components/user";
  }

  handleLogClick(id) {
    window.location = "/#/components/TimeLog";
  }

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
  }

  componentWillMount() {
    console.log(this.props.classId)
    this.props.classAction.getClassLog(this.props.classId);
  }

  dateFormate = (d) => {
    const formateDate = new Date(d);
    let dd = formateDate.getDate();
    let mm = formateDate.getMonth() + 1; // January is 0!
    const yyyy = formateDate.getFullYear();
    if (dd < 10) {
      dd = `0${  dd}`;
    } 
    if (mm < 10) {
      mm = `0${  mm}`;
    } 
    return `${dd}/${mm}/${yyyy}`;
  };

  renderSpeedo(value){
    if(value===0){
      return (<img src={require('../../images/0.png')} alt="background" style={{width: 590}}/>);
    } if(value>0 && value<10){
      return (<img src={require('../../images/1.png')} alt="background" style={{width: 590}}/>);
    } if(value>=10 && value<=20){
      return (<img src={require('../../images/2.png')} alt="background" style={{width: 590}}/>);
    } if(value>=20 && value<=30){
      return (<img src={require('../../images/3.png')} alt="background" style={{width: 590}}/>);
    }if(value>=30 && value<=40){
      return (<img src={require('../../images/4.png')} alt="background" style={{width: 590}}/>);
    }if(value>=40 && value<=50){
      return (<img src={require('../../images/5.png')} alt="background" style={{width: 590}}/>);
    }if(value>=50 && value<=60){
      return (<img src={require('../../images/6.png')} alt="background" style={{width: 590}}/>);
    }if(value>=60 && value<=70){
      return (<img src={require('../../images/7.png')} alt="background" style={{width: 590}}/>);
    }if(value>=70 && value<=80){
      return (<img src={require('../../images/8.png')} alt="background" style={{width: 590}}/>);
    }if(value>=80 && value<=90){
      return (<img src={require('../../images/9.png')} alt="background" style={{width: 590}}/>);
    }if(value>=90 && value<100){
      return (<img src={require('../../images/10.png')} alt="background" style={{width: 590}}/>);
    }
  }
  render() {
    const { timeLog } = this.props;
    const loggedDetails=timeLog.loggedDetails;
    const logged=timeLog.logged;
    const totalHours=timeLog.totalHours;
    return (
      <div>
      <Loadmask>
        <img src={require('../../images/loading.gif')} alt="indlæser" width="100" height="100" />
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
                  {loggedDetails? loggedDetails.map(l => (
                    <tr key={l.logDate}>
                       <td>{l.teacherName}</td>
                      <td>{this.dateFormate(l.logDate)}</td>
                      <td>{l.time.toFixed(2)}</td>


                    </tr>
                  )):null}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-12">
          <div className="card card-inverse">
          <h2 style={{color:'black',textAlign: 'center', marginTop: '12px'}}>Nuværende måned</h2>
            <div className="chart-wrapper">
            <div style={{textAlign:'center'}}>
            { timeLog &&
                this.renderSpeedo(logged/totalHours)
            }

            <p style={{position: 'absolute', top: '48%', left: '48%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>
              {logged && logged.toFixed(2)}</p>
            <p style={{position: 'absolute', top: '54%', left: '54%', transform: 'translate(-50%, -50%)',color:'white',fontSize: 32 }}>Timer</p>

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
  const { timeLog,classId, loading } = classReducer;
  return {
    timeLog,
    classId,
    loading
  };
};
const mapDispatchToProps = dispatch => ({
    classAction: bindActionCreators(classAction, dispatch)
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(TimeLog)
);
