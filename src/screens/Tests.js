import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading, {SubHeading} from '../components/Heading'
import {SmallCard,MediumCard,LargeCard,ImageCard} from '../components/Card'
import Test from '../components/Test'
import Row from '../components/Row'
import axios from 'axios';

class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests:[],
      showTest: false,
      activeTest: null,
    };
    this.toggleTest = this.toggleTest.bind(this);
  }
  componentDidMount(){
    axios.get(`http://localhost:5000/query?type=getTests`)
      .then(res => {
        const tests = res.data;
        this.setState({ tests });
        
      })
  }

  toggleTest(i){
    this.setState({showTest:!this.state.showTest});
    this.setState({activeTest: this.state.tests[i]});
  }

  render() {
    let move;
    if(this.state.showTest){
      move = '-150%';
    }
    else{
      move = '0';
    }

    const screenStyle = {
      position:'absolute',
      transition: 'all cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s',
      transform: 'translateX(' + move + ')',
    };


    let test = <Test test={this.state.activeTest} onClose={this.toggleTest} show={this.state.showTest}/>;

    return (
      <FadingScreen>

      <Heading animated='true'>Tests</Heading>
      <Row style={screenStyle}>
        { this.state.tests.map((test,i) =>
          <SmallCard key={i} delay={0} title={test.title}>
            <p>Test</p>
            <button onClick={this.toggleTest}>Click Me</button>
          </SmallCard>
        )}
        {test}
      </Row>

      </FadingScreen>
    );
  }
}

export default Tests;
