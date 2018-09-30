import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawerItem from '../components/DrawerItem'
import Logo from'../img/logo.png';

class Drawer extends Component {
  render() {
    return (
      <div class='drawer'>
        <ul class="list-group">
          <img  src={Logo} className="logo" alt="logo"/>
          <DrawerItem icon="home" label="Home" link="/"/>
          <DrawerItem icon="dashboard" label="Dashboard" link="/dashboard"/>
        </ul>
      </div>
    );
  }
}

export default Drawer;
