import React, { Component } from 'react';
import Overlay from '../components/Overlay'
import {SmallCard} from '../components/Card'
import Row from '../components/Row'
import Button from '../components/Button'
import Swal from 'sweetalert2';
import axios from 'axios';

class Register extends Component {

  register(){
    let form =  document.forms[0].elements;
    let firstname = form['first'].value;
    let lastname = form['last'].value;
    let username = form['email'].value;
    let password = form['password'].value;
    let repassword = form['repassword'].value;
    let payload = {username,password,firstname,lastname};
    let emptyCheck = false;
    for(let i = 0; i < form.length -1; i++){
      if(form[i].value === ''){
        emptyCheck = true;
      }
    }
    if(emptyCheck){
      Swal.fire('Error', "Please enter all registration information.", 'error');
    }
    else{
      if(password !== repassword){
        Swal.fire('Error', "Please make sure both passwords match.", 'error');
      }
      else{
        if(!username.toLowerCase().includes('@uea.ac.uk')){
          Swal.fire('Error', "Please ensure you are using a uea email address", 'error');
        }
        else{
          axios.post('http://localhost:5000/register', payload)
          .then(function (response) {
            Swal.fire('Success', "Please confirm your account by clicking the link we sent to " + username + ".", 'success');
          })
          .catch(function (error) {
              Swal.fire('Error', error.response.data , 'error');
          });
        }
      }
    }
  }

  render() {
    return (
      <Overlay>
          <SmallCard error={this.props.error} title="register">
              <form>
                <Row><input className={"loginField"} name="email" placeholder="Email"/></Row>
                <Row><input className={"loginField"} name="first" placeholder="First Name"/></Row>
                <Row><input className={"loginField"} name="last" placeholder="Last Name"/></Row>
                <Row><input type="password" name="password" className={"loginField"} placeholder="Password"/></Row>
                <Row><input type="password" name="repassword" className={"loginField"} placeholder="Confirm Password"/></Row>

                <Button icon={'sign-in-alt'} onClick={this.register.bind(this)}>
                  Register
                </Button>
                <a onClick={this.props.hideRegister} class="link">Login</a>
              </form>
          </SmallCard>
      </Overlay>
    );
  }
}

export default Register;
