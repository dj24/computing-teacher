import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading, {SubHeading} from '../components/Heading'
import {SmallCard,MediumCard,LargeCard,ImageCard} from '../components/Card'
import Test from '../components/Test'
import Row from '../components/Row'
import { Link } from "react-router-dom";
import axios from 'axios';

class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests:[]
    };
  }
  componentDidMount(){
    axios.get(`http://localhost:5000/query?type=getTests`)
      .then(res => {
        const tests = res.data;
        this.setState({ tests });

      })
  }


  render() {
    console.log(this.state.tests);
/*
    let test = <Test test={this.state.activeTest} onClose={this.toggleTest} show={this.state.showTest}/>;
*/
    return (
      <FadingScreen>

      <Heading animated='true'>Tests</Heading>
      <Row>
        { this.state.tests.map((test,i) =>
          <SmallCard key={i} delay={0} title={test.title}>
            <p>Test</p>
            <Link className={'btn'} to={'test/' + test._id}>Start</Link>
          </SmallCard>
        )}
      </Row>

      </FadingScreen>
    );
  }
}

export default Tests;