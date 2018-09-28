import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawerItem from '../components/DrawerItem'


class Drawer extends Component {
  render() {
    return (
      <div class='drawer'>
        <ul class="list-group">
          <DrawerItem label="Home" link="/"/>
          <DrawerItem label="Dashboard" link="/dashboard"/>
          <DrawerItem label="Settings" link="/settings"/>
        </ul>
      </div>
    );
  }
}

export default Drawer;
