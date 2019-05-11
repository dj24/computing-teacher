import React, { Component } from 'react';
import {host,getId} from '../util'
import Row from '../components/Row'
import {Line} from 'react-chartjs-2';
import Heading, {SubHeading} from '../components/Heading'
import axios from 'axios';
import Loader from '../components/Loader';

class Badges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badges: [],
      achievedBadges : [],
      loading:true
    };
  }

  componentDidMount(){
      getId().then((id) =>{
        axios.get(host + '/query?type=getAchievements')
        .then((response) => {
          this.setState({badges : response.data,loading:false});
          console.log(this.state.badges);
        })
        .catch((error) => {
          console.log(error)
        })
      });
  }

  render() {

      if(this.state.loading){
        return <Loader/>
      }
      else{
        return (
          <Row className={'inner'}>
              {
                this.state.badges.map((badge,i)=>{
                  return (
                    <div class="col-6 col-xl-3 col-lg-4 medal" key={i}>
                      <img src={require("../img/badges/" + badge.img)}/>
                    </div>
                  )
                })
              }
          </Row>
        );
      }

  }
}

export default Badges;
