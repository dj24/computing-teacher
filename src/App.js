import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TopBar from './components/TopBar'
import CenteredGrid from './components/CenteredGrid'
import StaticDrawer from './components/StaticDrawer'

import logo from './img/logo.png';
import './App.css';

const styles={
  container: {
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
  },
  horizontal: {
    flex:1
  }
}




const App = () => (
  <div>
      <TopBar logo={logo}>
        <CenteredGrid/>
      </TopBar>
   </div>
 );

export default App;
