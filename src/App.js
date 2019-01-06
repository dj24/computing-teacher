import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './Loader.css';
import 'hover.css/css/hover.css'


import Login from './screens/Login'
import Learn from './screens/Learn'
import Tests from './screens/Tests'
import Dashboard from './screens/Dashboard'
import Navbar from './components/Navbar'

import Drawer from './components/Drawer'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    //LOGIN STATUS
    loggedIn : true,
    user: 'admin',
  };

  componentDidMount(){

  }

  handleChange(event) {
    this.setState({user: event.target.value});
  }

  login = () => {
    if(this.state.user == "admin"){
      this.setState({loggedIn:true});
    }
    else{
      this.setState({error : true});
      if(!this.state.error){
        setTimeout(function(){
          this.setState({error : false});
        }.bind(this), 1000);
      }
    }
  }

  componentDidUpdate(prevState){
    if(prevState.loggedIn == false){

    }
  }
  router = () => {
    if(this.state.loggedIn){
      return (<div class='col main'>
        <Navbar/>
        <Route exact path="/" component={Dashboard} />
        <Route path="/test" component={Tests} />
        <Route path="/learn" component={Learn} />
      </div>)
    }
    else{
      return <Login
        error={this.state.error}
        user={this.state.user}
        onChange={this.handleChange}
        onClick={this.login.bind(this)}/>
    }
  }

  render() {
    return (
      <Router>
        <div className="row">
          <Drawer blur={this.state.loggedIn}/>
              {this.router()}
        </div>
      </Router>
    );
  }
}

export default App;
