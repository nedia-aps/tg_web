import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import * as accountActions from '../../redux/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  redirectToPage(url) {
    window.location = url;
  }

  onLogoutClick() {
    const { history, accountAction } = this.props;
    accountAction.logoutUser(history);
  }

  render() {
    const { history } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <header className="app-header navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler d-lg-none"
          type="button"
          onClick={this.mobileSidebarToggle}
        >
          &#9776;
        </button>
        <NavLink className="navbar-brand" to="/" />
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button
              className="nav-link navbar-toggler sidebar-toggler"
              type="button"
              onClick={this.sidebarToggle}
            >
              &#9776;
            </button>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/dashboard" className="nav-link">
              Statistik
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/undervisere" className="nav-link">
              Instruktører
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/classes" className="nav-link">
              Hold
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/admin" className="nav-link">
              Opret admin
            </NavLink>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
              <button
                onClick={this.toggle}
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <i className="icon-user icons font-1xl d-block mt-2" />
                <span className="d-md-down-none">admin</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center">
                  <strong>Konto</strong>
                </DropdownItem>
                <DropdownItem onClick={this.onLogoutClick}>
                  <i className="fa fa-lock" /> Logud
                </DropdownItem>
                <DropdownItem onClick={() => history.push('resetpassword')}>
                  <i className="fa fa-lock" /> Nulstil kodeord
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none" />
        </ul>
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Header));
