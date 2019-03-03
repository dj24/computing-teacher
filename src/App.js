import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './Loader.css';
import 'hover.css/css/hover.css'
import axios from 'axios'
import Login from './screens/Login'
import Learn from './screens/Learn'
import Tests from './screens/Tests'
import TestScreen from './screens/TestScreen'
import Dashboard from './screens/Dashboard'
import Navbar from './components/Navbar'

import Drawer from './components/Drawer'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  state = {
    //LOGIN STATUS
    admin: false,
    loggedIn : false,
    user: '',
    password: '',
  };

  componentDidMount(){
    let token = localStorage.getItem('token');
    console.log(token);
    if(token){
      console.log({token});
      axios.post('http://localhost:5000/verifyToken',{token})
      .then((response) => {
        //token verified
        this.setState({loggedIn:true});
      })
      .catch((error) => {
        //token invalid
        console.log(error);
      })
    }
    axios.get('http://localhost:5000')
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
    console.log(error);
  });
 ;
  }

  handleChange(event) { this.setState({user: event.target.value}); }
  handlePassChange(event) { this.setState({password: event.target.value}); }

  login = () => {
    let payload = {
      username : this.state.user,
      password : this.state.password,
    }
    axios.post('http://localhost:5000/login',payload)
    .then((response) => {
      //login sucesss
      this.setState({loggedIn:true});
      localStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      //login failure
      console.log(error);
      this.setState({error : true});
      setTimeout(function(){
        this.setState({error : false});
      }.bind(this), 1000);

    })
  }

  router = () => {
    if(this.state.loggedIn){
      return (<div class='col main'>
        <Navbar/>
        <Route exact path="/" component={Dashboard} />
        <Route path="/tests" component={Tests} />
        <Route path="/test/:id" component={TestScreen} />
        <Route path="/learn" component={Learn} />
      </div>)
    }
    else{
      return <Login
        error={this.state.error}
        onChange={this.handleChange}
        onPassChange={this.handlePassChange}
        onClick={this.login.bind(this)}/>
    }
  }

  render() {
    return (
      <Router>
        <div className="row">
          <Drawer admin={this.state.admin} blur={this.state.loggedIn}/>
              <div id="notifications"></div>
              {this.router()}
        </div>
      </Router>
    );
  }
}

export default App;
