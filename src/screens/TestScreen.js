import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading, {SubHeading} from '../components/Heading'
import Test from '../components/Test'
import { Link } from "react-router-dom";
import axios from 'axios';

class TestScreen extends Component {
  componentDidMount(){

  }


  render() {
    return (
      <FadingScreen>

      <Test/>

      </FadingScreen>
    );
  }
}

export default TestScreen;
