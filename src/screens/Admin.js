import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import Row from '../components/Row'
import {Heading,SubHeading} from '../components/Heading';
import {Link} from 'react-router-dom';

class AdminButton extends Component {

  render(){
    return (
      <div class="row d-flex justify-center">

        <a class="card w-50 mx-auto text-center">
          <div class="card-body">
            <Link to={this.props.link}><Heading>{this.props.text}</Heading> </Link>
          </div>
        </a>

      </div>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <FadingScreen>
        <Heading animated='true'>Admin</Heading>
        <AdminButton link="/users" text={"Users"}/>
        <AdminButton link="/addtest" text={"Add Test"}/>
        <AdminButton link="/managesections" text={"Manage Sections"}/>
      </FadingScreen>
    );
  }
}

export default Home;
