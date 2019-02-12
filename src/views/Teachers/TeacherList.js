import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as userAction from "../../../redux/actions";
import Pagination from "./Pagination";
class TeacherList extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    // an example array of items to be paged
    let exampleItems = _.range(1, 151).map(i => {
      return { id: i, name: "Item " + i };
    });

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: []
    };
    this.state = {
      todos: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
      currentPage: 1,
      todosPerPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  componentWillMount() {
    this.props.userAction.userList();
  }
  render() {
    const { todos, currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div>
            <ul>{renderTodos}</ul>
            <ul id="page-numbers">{renderPageNumbers}</ul>
          </div>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" />
              </div>
              <div className="card-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducerTest }) => {
  const { userObject, userList } = userReducerTest;
  return {
    userObject,
    userList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userAction: bindActionCreators(userAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(UsersList)
);
