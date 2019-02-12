import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as classAction from "../../redux/actions";
import Loadmask from "react-redux-loadmask";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
class Classess extends Component {
  handleEditClick(id) {
    const{history,classAction}=this.props;
    classAction.formChanged({ prop: "classId", value: id });
    history.push("/class");
  }
  handleLogClick(id) {
    const{history}=this.props;
    this.props.classAction.formChanged({ prop: "classId", value: id });
    history.push("/timelog");
  }
  constructor(props, context) {
    super(props, context);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.deleteConfirm= this.deleteConfirm.bind(this);

  }
  componentWillMount() {
    this.props.classAction.getClasses();
    this.setState({danger:false, id:''});
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
    const {danger} = this.state;
    return (
      <div>
      <Loadmask>
        <img src={require('../../images/loading.gif')} alt="indlæser" width="100" height="100" />
        </Loadmask>
      <div className="animated fadeIn">
      <Modal isOpen={danger}  className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Slet</ModalHeader>
                  <ModalBody>
                    Er du sikker på at du vil slette dette hold?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.deleteConfirm}>Slet</Button>{' '}
                    <Button color="secondary" onClick={()=> this.setState({
                      danger: false
                    })}>Fortryd</Button>
                  </ModalFooter>
                </Modal>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
              <a
                  href="javascript:void(0)"
                  onClick={() => this.props.history.push("class")}
                >
                  <i className="icon-user-follow icons font-2xl " />
                  Nyt hold
                </a>

              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Hold</th>
                      <th>Start dato</th>
                      <th>Slut dato</th>
                      <th>Start tid </th>
                      <th>Sluttid</th>
                      <th>Rediger</th>
                      <th>Log</th>
                      <th>Slet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.classesList.map(u => (
                      <tr key={u.id}>
                         <td>{u.name}</td>
                        <td>{this.dateFormate( u.startDateTime)}</td>
                        <td>{this.dateFormate( u.endDateTime)} </td>
                        <td>{u.timeOfClass} </td>
                        <td>{ u.endTimeOfClass} </td>
                        <td>
                          <a onClick={this.handleEditClick.bind(this, u.id)}>
                            <i className="fa fa-edit" />
                          </a>
                        </td>
                        <td>
                          <a onClick={this.handleLogClick.bind(this, u.id)}>
                            <i className="fa fa-clock-o" />
                          </a>
                        </td>
                        <td>
                          <a onClick={this.delete.bind(this, u.id)}>
                            <i className="fa fa-times-circle-o" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               {/*

               <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Prev
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
                */}
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
  const { classesList } = classReducer;
  return {
   classesList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    classAction: bindActionCreators(classAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Classess)
);
