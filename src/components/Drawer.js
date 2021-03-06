import React, { Component } from 'react';
import DrawerItem from '../components/DrawerItem'
import Logo from'../img/logo.png';



class Drawer extends Component {



  render() {
    //console.log(this.props.admin);
    let drawerItems;
    if(this.props.admin){
      drawerItems =
      <ul className="list-group">
        <li style={{
          textAlign: 'center',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}><img  src={Logo} className="logo" alt="logo"/></li>
        <DrawerItem icon="dashboard" label="Dashboard" link="/"/>
        <DrawerItem icon="edit" label="Tests" link="/sections"/>
        <DrawerItem icon="person" label="Account" link="/account"/>
        <DrawerItem icon="playlist_add" label="Admin" link="/admin"/>
        <DrawerItem icon="help" label="Help" link="/help"/>
      </ul>

    }
    else{
      drawerItems =
      <ul className="list-group">
        <li style={{
          textAlign: 'center',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}><img  src={Logo} className="logo" alt="logo"/></li>
        <DrawerItem icon="dashboard" label="Dashboard" link="/"/>
        <DrawerItem icon="edit" label="Tests" link="/sections"/>
        <DrawerItem icon="person" label="Account" link="/account"/>
        <DrawerItem icon="help" label="Help" link="/help"/>
      </ul>
    }

    return (
      <div id="drawer" className={'drawer ' + (this.props.blur ? '' : 'blur')}>
        {drawerItems}
      </div>
    );
  }
}

export default Drawer;
