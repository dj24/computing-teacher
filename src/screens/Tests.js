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
      showTest: true
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
  toggleTest(){
    this.setState({showTest:!this.state.showTest});
  }

  render() {
    let move;
    if(this.state.showTest){
      move = '-100%';
    }
    else{
      move = '0';
    }

    const screenStyle = {
      position:'absolute',
      transition: 'all cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s',
      transform: 'translateX(' + move + ')',
    };


    let test = <Test onClose={this.toggleTest} show={this.state.showTest}/>;

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
        <ImageCard src={'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1682423828b%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1682423828b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'}/>
        {test}
      </Row>

      </FadingScreen>
    );
  }
}

export default Tests;
