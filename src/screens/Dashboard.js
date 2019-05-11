import React, { Component } from 'react';
import {SmallCard,MediumCard,MediumLargeCard,LargeCard} from '../components/Card'
import FadingScreen from '../components/FadingScreen'
import Heading, {SubHeading} from '../components/Heading'
import Activity from '../components/Activity'
import Row from '../components/Row'
import XpGraph from '../components/XpGraph'
import {notification,getId,host} from '../util'
import LevelProgress from '../components/LevelProgress'
import axios from 'axios';
import Badges from '../components/Badges';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
      user:{}
    };
  }

  componentDidMount(){
    getId().then((id) =>{
      axios.get(host + '/query?type=getUser&criteria={"_id":"' + id +'"}')
      .then((response) => {
        this.setState({user :
          {
            firstname : response.data.firstname,
            lastname : response.data.lastname
          }
        });
      })
      .catch((error) => {
        console.log(error)
      })
    });
  }

  componentWillUnmount() {
    this.setState({active:false})
  }

  render() {
    let greeting;
    let now = new Date().getHours();
    if(now > 18){
      greeting = "Good evening ";
    }
    else if(now > 12){
      greeting = "Good afternoon ";
    }
    else{
      greeting = "Good morning ";
    }

    return (
      <FadingScreen>
        <Row>
          <Heading>{this.state.user.firstname ? greeting + this.state.user.firstname : ''} </Heading>
        </Row>
        <Row>
        <MediumCard title="Next Level">
          <LevelProgress/>
        </MediumCard>
          <MediumCard title="Your Progress">
            <XpGraph/>
          </MediumCard>


          <SmallCard title="Your Activity">
            <Activity/>
          </SmallCard>
          <MediumLargeCard title="Your Progress">
            <Badges/>
          </MediumLargeCard>

        </Row>

        <Row>
        </Row>
      </FadingScreen>
    );
  }
}

export default Dashboard;
