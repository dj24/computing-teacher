
import React, { Component } from 'react';
import { Link } from "react-router-dom";

function hideMenu(){
  var element = document.getElementById("drawer");
  element.classList.remove("active");
}

class DrawerItem extends Component {


  render() {

    let arr = window.location.href.split('/');
    let current_path = '/' + arr[arr.length-1];

    return (
      <li className={"list-group-item " + (this.props.link === current_path ? 'active' : '')}>
        <div></div>
        <Link onClick={hideMenu} className="nav-link" to={this.props.link}>
          <i className="material-icons drawer-icon">{this.props.icon}</i>
          {this.props.label}
        </Link>
      </li>

    );
  }
}

export default DrawerItem ;
