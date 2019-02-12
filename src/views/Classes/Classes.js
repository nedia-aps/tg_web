import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Loadmask from 'react-redux-loadmask';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as classActions from '../../redux/actions';

class Classess extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleLogClick = this.handleLogClick.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  componentWillMount() {
    const { classAction } = this.props;
    classAction.getClasses();
    this.setState({ danger: false, id: '' });
  }

  handleEditClick(id) {
    const { history, classAction } = this.props;
    classAction.formChanged({ prop: 'classId', value: id });
    history.push('/class');
  }

  handleLogClick(id) {
    const { history, classAction } = this.props;
    classAction.formChanged({ prop: 'classId', value: id });
    history.push('/timelog');
  }

  delete(id) {
    this.setState({
      danger: true,
      id,
    });
  }

  deleteConfirm() {
    const { classAction } = this.props;
    const { id } = this.state;
    this.setState({
      danger: false,
    });
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
    const { classesList, history, className } = this.props;
    const { danger } = this.state;
    // eslint-disable-next-line
    const loadingImg = require('../../images/loading.gif');
    return (
      <div>
        <Loadmask>
          <img src={loadingImg} alt="indlæser" width="100" height="100" />
        </Loadmask>
        <div className="animated fadeIn">
          <Modal isOpen={danger} className={`modal-danger ${className}`}>
            <ModalHeader toggle={this.toggleDanger}>Slet</ModalHeader>
            <ModalBody>Er du sikker på at du vil slette dette hold?</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.deleteConfirm}>
                Slet
              </Button>{' '}
              <Button
                color="secondary"
                onClick={() =>
                  this.setState({
                    danger: false,
                  })
                }
              >
                Fortryd
              </Button>
            </ModalFooter>
          </Modal>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <a
                    href=""
                    onClick={e => {
                      e.preventDefault();
                      history.push('class');
                    }}
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
                      {classesList.map(u => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{this.dateFormate(u.startDateTime)}</td>
                          <td>{this.dateFormate(u.endDateTime)} </td>
                          <td>{u.timeOfClass} </td>
                          <td>{u.endTimeOfClass} </td>
                          <td>
                            <a
                              role="button"
                              tabIndex="0"
                              onClick={this.handleEditClick.bind(this, u.id)}
                            >
                              <i className="fa fa-edit" />
                            </a>
                          </td>
                          <td>
                            <a
                              role="button"
                              tabIndex="-1"
                              onClick={this.handleLogClick.bind(this, u.id)}
                            >
                              <i className="fa fa-clock-o" />
                            </a>
                          </td>
                          <td>
                            <a
                              role="button"
                              tabIndex="-2"
                              onClick={this.delete.bind(this, u.id)}
                            >
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
    classesList,
  };
};
const mapDispatchToProps = dispatch => ({
  classAction: bindActionCreators(classActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Classess));
