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
      <nav class="navbar navbar-expand-lg navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item menu-icon">
              <a class="nav-link" ><i class="material-icons">menu</i></a>
          </li>
            <li class="nav-item search-container">
                <i class="material-icons nav-icon-static">search</i>
                <input placeholder="SEARCH" class="search"></input>
            </li>
            <li class="nav-item flex">
                <a class="nav-link"><i class="material-icons">notifications</i></a>
                <a onClick={logout} class="nav-link"><i class="material-icons">arrow_right_alt</i></a>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
