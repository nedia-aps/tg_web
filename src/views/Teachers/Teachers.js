import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Loadmask from 'react-redux-loadmask';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as teacherActions from '../../redux/actions';

class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danger: false,
      authId: '',
      sortBy: 'name',
      order: 'asc',
    };
    this.handleClick = this.handleClick.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  componentWillMount() {
    const { teacherAction } = this.props;
    teacherAction.getTeachder();
  }

  handleClick(data) {
    const { teacherAction } = this.props;
    teacherAction.selectedTeacher(data);
    const { history } = this.props;
    history.push('/teacher');
    // console.log(this.props.userObject);
    // window.location = "/#/components/user";
  }

  changeSort(sort) {
    const { order, sortBy } = this.state;
    let newOrder;
    if (sortBy === sort) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = 'asc';
    }
    this.setState({ sortBy: sort, order: newOrder });
  }

  delete(authId) {
    this.setState({
      danger: true,
      authId,
    });
  }

  deleteConfirm() {
    const { teacherAction } = this.props;
    const { authId } = this.state;
    this.setState({
      danger: false,
    });
    teacherAction.deleteTeacher(authId);
  }

  render() {
    let { teachersList } = this.props;
    const { history, className, isDelete } = this.props;
    const { danger, authId, sortBy, order } = this.state;
    teachersList = isDelete
      ? teachersList.filter(item => item.authId !== authId)
      : teachersList;
    const sortedList = _.orderBy(teachersList, sortBy, order);
    // eslint-disable-next-line
    const loading = require('../../images/loading.gif');

    return (
      <div>
        <Loadmask>
          <img src={loading} alt="indlæser" width="100" height="100" />
        </Loadmask>
        <div className="animated fadeIn">
          <Modal isOpen={danger} className={`modal-danger ${className}`}>
            <ModalHeader toggle={this.toggleDanger}>Slet</ModalHeader>
            <ModalBody>Er du sikker på du vil slette denne burger?</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.deleteConfirm}>
                Slet
              </Button>{' '}
              <Button
                color="secondary"
                onClick={() => this.setState({ danger: !danger })}
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
                      history.push('teacher');
                    }}
                  >
                    <i className="icon-user-follow icons font-2xl d-block" />
                  </a>
                </div>
                <div className="card-block">
                  <table className="table table-bordered table-striped table-sm">
                    <thead>
                      <tr>
                        <th onClick={() => this.changeSort('name')}>
                          Navn
                          {sortBy === 'name' && (
                            <i
                              className={
                                order === 'asc'
                                  ? `fa fa-sort-down pull-right`
                                  : `fa fa-sort-up pull-right`
                              }
                            />
                          )}
                        </th>
                        <th onClick={() => this.changeSort('email')}>
                          Brugernavn
                          {sortBy === 'email' && (
                            <i
                              className={
                                order === 'asc'
                                  ? `fa fa-sort-down pull-right`
                                  : `fa fa-sort-up pull-right`
                              }
                            />
                          )}
                        </th>
                        <th>tlf</th>
                        <th />
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {sortedList.map(u => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.phone}</td>
                          <td>
                            <a
                              role="button"
                              tabIndex="0"
                              onClick={this.handleClick.bind(this, u)}
                            >
                              <i className="fa fa-edit" />
                            </a>
                          </td>
                          <td>
                            <a
                              role="button"
                              tabIndex="-1"
                              onClick={this.delete.bind(this, u.authId)}
                            >
                              <i className="fa fa-times-circle-o" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/**
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

const mapStateToProps = ({ teacherReducer }) => {
  const { userList, teachersList, isDelete } = teacherReducer;
  return {
    userList,
    teachersList,
    isDelete,
  };
};
const mapDispatchToProps = dispatch => ({
  teacherAction: bindActionCreators(teacherActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Teachers));
