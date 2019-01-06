import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading, {SubHeading} from '../components/Heading'
import {SmallCard,MediumCard,LargeCard,ImageCard} from '../components/Card'
import Test from '../components/Test'
import Row from '../components/Row'
import axios from 'axios';

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons:[1,2,3]
    };
    this.toggleTest = this.toggleTest.bind(this);
  }
  componentDidMount(){
    /*
    axios.get(`http://localhost:5000/query?type=getTests`)
      .then(res => {
        const tests = res.data;
        this.setState({ tests });
      })
      */
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

      <Heading animated='true'>Learn</Heading>
      <Row style={screenStyle}>
        { this.state.lessons.map((test,i) =>
          <ImageCard src={'https://images.pexels.com/photos/825258/pexels-photo-825258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}>
            <h5>Lesson Title</h5>
            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </ImageCard>
        )}
        {test}
      </Row>
      </FadingScreen>
    );
  }
}

export default Learn;
