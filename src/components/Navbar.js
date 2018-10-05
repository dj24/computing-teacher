import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item menu-icon">
              <a class="nav-link" href="#"><i class="material-icons">menu</i></a>
          </li>
            <li class="nav-item search-container">
                <i class="material-icons nav-icon-static">search</i>
                <input placeholder="SEARCH" class="search"></input>
            </li>
            <li class="nav-item notifications">
                <a class="nav-link" href="#"><i class="material-icons">notifications</i></a>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
