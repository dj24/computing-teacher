import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TopBar from './components/TopBar'
import logo from './img/logo.png';
import './App.css';

const App = () => (
  <div>
  <TopBar logo={logo}/>
   <Button variant="contained" color="primary">
     Hello World
   </Button>
   </div>
 );

export default App;
