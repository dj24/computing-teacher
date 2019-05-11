import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading from '../components/Heading'
import {ImageCard} from '../components/Card'
import Row from '../components/Row'
import ProgressBar from '../components/ProgressBar'
import axios from 'axios';
import {host,getId} from '../util';
import { Link } from "react-router-dom";
//import axios from 'axios';

class Sections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections : []
    };
  }
  componentDidMount(){
    getId().then((id) =>{
      axios.get(host + '/query?type=getSections')
      .then((response) => {
        this.setState({sections:response.data});
      })
      .catch((error) => {
        console.log(error)
      })
  })
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

    let sections;

    if (this.state.sections.length > 0) {
      console.log(this.state.sections);
      sections = this.state.sections.map((section,i) =>

        <ImageCard className={'learn-card'} src={'https://images.pexels.com/photos/825258/pexels-photo-825258.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}>
          <Link to={'tests/' + section._id}><h3>{section.name}</h3></Link>
          <div style={{display:'flex',alignItems:'center'}} className={'bottom'}>
            <ProgressBar width={50}/>
            <h5 style={{padding:0}}>50%</h5>
          </div>
          </ImageCard>

        )

    }



    return (
      <FadingScreen>
      <Row style={screenStyle}>
        <div className="col-12"><Heading animated='true'>Sections</Heading></div>
        {sections}
      </Row>
      </FadingScreen>
    );
  }
}

export default Sections;
