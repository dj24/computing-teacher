import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TopBar from './components/TopBar'
import CenteredGrid from './components/CenteredGrid'


import logo from './img/logo.png';
import './App.css';

const styles={
  container: {
    backgroundColor: '#eeeeee',
  }
}




const App = () => (
  <div>

    <TopBar logo={logo}/>

      <CenteredGrid/>
      <Button variant="contained" color="secondary">
        Hello World
      </Button>
    

   </div>
 );

export default App;
