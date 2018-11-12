import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawerItem from '../components/DrawerItem'
import Logo from'../img/logo.png';

class Drawer extends Component {
  render() {
    return (
      <div className={'drawer ' + (this.props.blur ? '' : 'blur')}>
        <ul class="list-group">
          <img  src={Logo} className="logo" alt="logo"/>
          <DrawerItem icon="dashboard" label="Dashboard" link="/dashboard"/>
          <DrawerItem icon="library_books" label="Learn" link="/learn"/>
          <DrawerItem icon="edit" label="Tests" link="/test"/>
          <DrawerItem icon="person" label="Account" link="/account"/>
          <DrawerItem icon="help" label="Help" link="/help"/>
          <DrawerItem icon="settings" label="Settings" link="/settings"/>
        </ul>
      </div>
    );
  }
}

export default Drawer;
