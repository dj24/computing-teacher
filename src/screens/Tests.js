import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import {SmallCard} from '../components/Card'
import Heading from '../components/Heading'
import ProgressBar from '../components/ProgressBar';
import Row from '../components/Row'
import { Link } from "react-router-dom";
import axios from 'axios';
import {host} from '../util'

class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests:[]
    };
  }
  componentDidMount(){
    //notification("Tests Screen");
    axios.get(host + `/query?type=getTests`)
      .then(res => {
        const tests = res.data;
        this.setState({ tests });
      })
  }


  render() {
    let userId;
    let token = localStorage.getItem('token');
    if(token){
      axios.post(host + '/verifyToken',{token})
      .then((response) => {
        //token verified
        userId = response.data.id;
      })
    }


    //todo fix this
    let score = (userId,testId) => {
    axios.get(host + '/getHighestScore?testId=' + testId +'&userId=' + userId)
    .then(score => {
      if(score.data){
        return (
          <div>
          <h5>Last Attempt : {score.data}%</h5>
          <ProgressBar className={'bottom'} width={score.data}/>
          </div>
        );
      }
    });
  }

  let tests;
  if(this.state.tests){
    tests = this.state.tests.map((test,i) => (
      <SmallCard key={i} delay={0} title={test.title}>
        <p>Test</p>
        <Link className={'btn'} to={'test/' + test._id}>Start</Link>
        {score(userId,test._id)}
      </SmallCard>
    ))
  }

/*

    let test = <Test test={this.state.activeTest} onClose={this.toggleTest} show={this.state.showTest}/>;
*/
    return (
      <FadingScreen>

      <Heading animated='true'>Tests</Heading>
      <Row>
        {tests }
      </Row>

      </FadingScreen>
    );
  }
}

export default Tests;
