import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import DrawerItem from '../components/DrawerItem'
import Logo from'../img/logo.png';

class Drawer extends Component {



  render() {

    let drawerItems;
    if(this.props.admin){
      drawerItems =
      <ul class="list-group">
        <li style={{
          textAlign: 'center',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}><img  src={Logo} className="logo" alt="logo"/></li>
        <DrawerItem icon="dashboard" label="Dashboard" link="/"/>
        <DrawerItem icon="library_books" label="Learn" link="/learn"/>
        <DrawerItem icon="edit" label="Tests" link="/tests"/>
        <DrawerItem icon="person" label="Account" link="/account"/>
        <DrawerItem icon="playlist_add" label="Add Content" link="/admin"/>
        <DrawerItem icon="help" label="Help" link="/help"/>
        <DrawerItem icon="settings" label="Settings" link="/settings"/>
      </ul>

    }
    else{
      drawerItems =
      <ul class="list-group">
        <li style={{
          textAlign: 'center',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}><img  src={Logo} className="logo" alt="logo"/></li>
        <DrawerItem icon="dashboard" label="Dashboard" link="/"/>
        <DrawerItem icon="library_books" label="Learn" link="/learn"/>
        <DrawerItem icon="edit" label="Tests" link="/tests"/>
        <DrawerItem icon="person" label="Account" link="/account"/>
        <DrawerItem icon="help" label="Help" link="/help"/>
        <DrawerItem icon="settings" label="Settings" link="/settings"/>
      </ul>
    }

    return (
      <div className={'drawer ' + (this.props.blur ? '' : 'blur')}>
        {drawerItems}
      </div>
    );
  }
}

export default Drawer;
