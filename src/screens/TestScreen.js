import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading, {SubHeading} from '../components/Heading'
import Test from '../components/Test'
import { Link } from "react-router-dom";
import axios from 'axios';
import {notification} from '../util'

class TestScreen extends Component {

  state = {
    test: {},
  };

  componentDidMount(){
    let id = this.props.match.params.id;
    let queryString = 'http://localhost:5000/query?type=getTests&criteria={"_id":"' + id +'"}';
    axios.get(queryString)
    .then((res) => {
      if(res.data){
        this.setState({test:res.data[0]});
      }
    })
  }


  render() {
    let testItem;

    if(this.state.test.questions){
      testItem = <Test test={this.state.test}/>
    }

    return (
      <FadingScreen>

      {testItem}

      </FadingScreen>
    );
  }
}

export default TestScreen;
