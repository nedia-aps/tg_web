import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as teacherAction from "../../redux/actions";
import Loadmask from "react-redux-loadmask";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Teachers extends Component {
  handleClick(data) {
    this.props.teacherAction.selectedTeacher(data);
    const{history}=this.props;
    history.push("/teacher");
    // console.log(this.props.userObject);
    //window.location = "/#/components/user";
  }
  constructor(props) {
    super(props);
    this.state={danger:false, authId:''};
    this.handleClick = this.handleClick.bind(this);
    this.deleteConfirm= this.deleteConfirm.bind(this);
  }
  componentWillMount() {
    this.props.teacherAction.getTeachder();

  }

  delete(authId) {
    this.setState({
      danger: true,
      authId:authId
    });

  }
  deleteConfirm() {
    this.setState({
      danger: false
    });
    this.props.teacherAction.deleteTeacher(this.state.authId);
  }
  render() {
    let { teachersList, isDelete } = this.props;
    const {danger, authId} = this.state;
    teachersList = isDelete ? teachersList.filter(function(item){
      return item.authId !== authId
    }) : teachersList;

    return (
      <div>
      <Loadmask>
        <img src={require('../../images/loading.gif')} alt="indlæser" width="100" height="100" />
        </Loadmask>
      <div className="animated fadeIn">
      <Modal isOpen={danger}  className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Slet</ModalHeader>
                  <ModalBody>
                    Er du sikker på du vil slette denne burger?
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.deleteConfirm}>Slet</Button>{' '}
                    <Button color="secondary" onClick={()=>this.setState({danger: !danger})}>Fortryd</Button>
                  </ModalFooter>
                </Modal>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <a
                  href="javascript:void(0)"
                  onClick={() => this.props.history.push("teacher")}
                >
                  <i className="icon-user-follow icons font-2xl d-block" />
                </a>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                    <th>Navn</th>
                      <th>Brugernavn</th>
                      <th>tlf</th>
                      <th></th>
                      <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {teachersList.map(u => (
                      <tr key={u.id}>
                      <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>
                          <a onClick={this.handleClick.bind(this, u)}>
                            <i className="fa fa-edit" />
                          </a>
                        </td>
                        <td>
                          <a onClick={this.delete.bind(this, u.authId)}>
                            <i className="fa fa-times-circle-o" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {
                  /**
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

                   */
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = ({ teacherReducer }) => {
  const { userList, teachersList, isDelete } = teacherReducer;
  return {
    userList,
    teachersList,
    isDelete
  };
};
const mapDispatchToProps = dispatch => {
  return {
    teacherAction: bindActionCreators(teacherAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Teachers)
);
