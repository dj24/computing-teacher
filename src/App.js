import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import './Loader.css';
import 'hover.css/css/hover.css'
import axios from 'axios'
import Login from './screens/Login'
import Sections from './screens/Sections'
import Tests from './screens/Tests'
import TestScreen from './screens/TestScreen'
import Dashboard from './screens/Dashboard'
import AddSection from './screens/AddSection'
import Navbar from './components/Navbar'
import Drawer from './components/Drawer'
import Admin from './screens/Admin'
import Register from './screens/Register'
import Users from './screens/Users'
import AddTest from './screens/AddTest'
import ManageSections from './screens/ManageSections'
import {notification,host} from './util'
import FAQ from './screens/FAQ';
import Account from './screens/Account';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  state = {
    //LOGIN STATUS
    admin: false,
    register: false,
    loggedIn : false,
    user: '',
    password: '',
  };

  open(){
    this.setState({loggedIn:true});
    let queryString = host + '/query?type=isAdmin&criteria={"username":"' + this.state.user +'"}'
    axios.get(queryString)
    .then((admin) => {
      if(admin.data){
        this.setState({admin:true});
      }
    })
  }

  componentDidMount(){
    let token = localStorage.getItem('token');
    if(token){
      axios.post(host + '/verifyToken',{token})
      .then((response) => {
        if(response.data){
          let queryString = host + '/query?type=getUser&criteria={"_id":"' + response.data.id +'"}';
          axios.get(queryString)
          .then((user) => {
            if(user.data){
              this.setState({user:user.data.username});
            }
            console.log(this.state.user);
          })
          .then(()=>{
            this.setState({loggedIn:true});
            let queryString = host + '/query?type=isAdmin&criteria={"username":"' + this.state.user +'"}'
            axios.get(queryString)
            .then((admin) => {
              if(admin.data){
                this.setState({admin:true});
              }
            })
          });
        }
      })
      .catch((error) => {
        //token invalid
        //(error,true);
        console.log(error);
      })
    }
  }

  handleChange(event) { this.setState({user: event.target.value}); }
  handlePassChange(event) { this.setState({password: event.target.value}); }

  login = () => {
    let payload = {
      username : this.state.user,
      password : this.state.password,
    }
    axios.post(host + '/login',payload)
    .then((response) => {
      //login sucesss

      localStorage.setItem('token', response.data.token);
      this.open();
    })
    .catch((error) => {
      //login failure
      console.log(error);
      this.setState({error : true});
      //notification(error,true);
      setTimeout(function(){
        this.setState({error : false});
      }.bind(this), 1000);

    })
  }

  hideRegister(){
    this.setState({register:false});
  }
  showRegister(){
    this.setState({register:true});
  }

  router = () => {
    if(this.state.loggedIn){
      if(this.state.admin){
        return (<div className='col main'>
          <Navbar/>
          <Route exact path="/" component={Dashboard} />
          <Route path="/tests/:id" component={Tests} />
          <Route path="/test/:id" component={TestScreen} />
          <Route path="/sections" component={Sections} />
          <Route path="/admin" component={Admin} />
          <Route path="/users" component={Users} />
          <Route path="/managesections" component={ManageSections} />
          <Route path="/addsection" component={AddSection} />
          <Route path="/addtest" component={AddTest} />
          <Route path="/help" component={FAQ} />
          <Route path="/account" component={Account} />
        </div>)
      }
      else{
        return (<div className='col main'>
          <Navbar/>
          <Route exact path="/" component={Dashboard} />
          <Route path="/tests/:id" component={Tests} />
          <Route path="/test/:id" component={TestScreen} />
          <Route path="/sections" component={Sections} />
          <Route path="/help" component={FAQ} />
          <Route path="/account" component={Account} />
        </div>)
      }

    }

    else{
      if(this.state.register){
        return <Register hideRegister={this.hideRegister.bind(this)}/>
      }
      else{
        return <Login
          error={this.state.error}
          onChange={this.handleChange}
          onPassChange={this.handlePassChange}
          showRegister={this.showRegister.bind(this)}
          onClick={this.login.bind(this)}/>
      }
  }
}

  render() {
    return (
      <Router>
        <div>
          <Drawer admin={this.state.admin} blur={this.state.loggedIn}/>
          <div id="notifications"></div>
          {this.router()}
        </div>
      </Router>
    );
  }
}

export default App;
