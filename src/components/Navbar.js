import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <i class="material-icons nav-icon-static">search</i>
                <input placeholder="SEARCH" class="search"></input>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#"><i class="material-icons nav-icon">notifications</i></a>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
