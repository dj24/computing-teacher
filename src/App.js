import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import Navbar from './components/Navbar'
import Drawer from './components/Drawer'

class App extends Component {
  render() {
    return (
      <Router>
        <div class="row">
          <Drawer class='col'/>
          <div class='col main'>
            <Navbar/>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
