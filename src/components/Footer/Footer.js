import React, { Component } from 'react';
class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <a href="http://coreui.io">TG</a> &copy; {new Date().getFullYear()} 
        <span className="float-right">Powered by TG</span>
      </footer>
    )
  }
}

export default Footer;
