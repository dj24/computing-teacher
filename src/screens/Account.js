import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import Heading from '../components/Heading';
import {LargeCard,SmallCard,MediumCard} from '../components/Card';
import Row from '../components/Row';
import Button from '../components/Button';
import Loader from '../components/Loader';
import {host,getId} from '../util';
import axios from 'axios';

class Account extends Component {
  constructor(props) {
     super(props);
     this.state = {
       lastname : "",
       firstname : "",
       email: "",
       loading: true
     }
     this.handleLast = this.handleLast.bind(this);
     this.handleFirst = this.handleFirst.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount(){
     getId().then((id) =>{
       axios.get(host + '/query?type=getUser&criteria={"_id":"' + id +'"}')
       .then((response) => {
         this.setState({user :
           {
             firstname : response.data.firstname,
             lastname : response.data.lastname,
             email: response.data.username
           }
         });
       })
       .catch((error) => {
         console.log(error)
       })
     });
   }

  handleLast(event) {
    this.setState({lastname: event.target.value});
  }

  handleFirst(event) {
    this.setState({firstname: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.lastname);
    event.preventDefault();
  }

  render() {
    return (
      <FadingScreen>
      <Heading animated="true">Account</Heading>
        <LargeCard>
        <div style={{maxWidth:600,margin:"auto",marginTop:50,marginBottom:50}}>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Email</span>
            </div>
            <div class="form-control">
              
            </div>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Firstname</span>
            </div>
            <input onChange={this.handleFirst} id="first" class="form-control" value={this.state.firstname}/>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Lastname</span>
            </div>
            <input onChange={this.handleLast} id="last" class="form-control" value={this.state.lastname}/>
          </div>
          <Button className={"ml-0"} onClick={this.handleSubmit} >Save Details</Button>
        </div>
        </LargeCard>
      </FadingScreen>
    );
  }
}

export default Account;
