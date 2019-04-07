import React, { Component } from 'react';
//import {notification} from '../util'

function logout(){
  localStorage.removeItem('token');
  window.location.reload();
  //notification("Logged out")
}

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item menu-icon">
              <a className="nav-link" ><i className="material-icons">menu</i></a>
          </li>
            <li className="nav-item search-container">
                <i className="material-icons nav-icon-static">search</i>
                <input placeholder="SEARCH" className="search"></input>
            </li>
            <li className="nav-item flex">
                <a className="nav-link"><i className="material-icons">notifications</i></a>
                <a onClick={logout} className="nav-link"><i className="material-icons">arrow_right_alt</i></a>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
