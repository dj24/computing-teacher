import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Test from '../components/Test'
import axios from 'axios';
import {host} from '../util'

class TestScreen extends Component {

  state = {
    test: {},
  };

  componentDidMount(){
    let id = this.props.match.params.id;
    let queryString = host + '/query?type=getTests&criteria={"_id":"' + id +'"}';
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
