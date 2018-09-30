import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './Loader.css';

import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import Drawer from './components/Drawer'

class App extends Component {
  state = {

  };

  componentDidMount(){

  }

  render() {
    return (
      <Router>
        <div className="row">
      
          <Drawer className='col'/>
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
