
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DrawerItem extends Component {


  render() {

    let arr = window.location.href.split('/');
    let current_path = '/' + arr[arr.length-1];

    return (
      <li className={"list-group-item " + (this.props.link == current_path ? 'active' : '')}>
        <div></div>
        <Link class="nav-link" to={this.props.link}>
          <i class="material-icons drawer-icon">{this.props.icon}</i>
          {this.props.label}
        </Link>
      </li>

    );
  }
}

export default DrawerItem ;
