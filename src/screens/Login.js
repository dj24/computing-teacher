import React, { Component } from 'react';
import Overlay from '../components/Overlay'
import {SmallCard} from '../components/Card'
import Row from '../components/Row'
import Input from '../components/Input'
import Button from '../components/Button'

class Login extends Component {

  componentWillUnmount(){

  }

  render() {


    return (
      <Overlay>
          <SmallCard error={this.props.error} title="login">
              <Row><Input onChange={this.props.onChange} placeholder="Email"/></Row>
              <Row><Input onChange={this.props.onPassChange} placeholder="Password" secure="true"/></Row>
              <Button icon={'sign-in-alt'} onClick={this.props.onClick.bind(this)}>
                Login
              </Button>
          </SmallCard>
      </Overlay>
    );
  }
}

export default Login;
