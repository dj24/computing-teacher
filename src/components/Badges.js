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
    };
  }

  componentDidMount(){
    getId().then((id) =>{
      axios.get(host + '/query?type=getAchievements&criteria={"userID":"' + id + '"}')
      .then((response) => {
        if(response){
          this.setState({achievedBadges : response.data});
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    });

      getId().then((id) =>{
        axios.get(host + '/query?type=getAchievements')
        .then((response) => {
          if(response){
            this.setState({badges : response.data});
          }
        })
        .catch((error) => {
          console.log(error)
        })
      });
  }

  render() {
    let indexes = [];
    for(let badge of this.state.badges){
      let achieved = false;
      for (let a of this.state.achievedBadges){
        if(badge._id === a._id){
          indexes.push(this.state.achievedBadges.indexOf(a));
        }
      }
    }

      if(this.state.badges.length === 0){
        return <Loader/>
      }
      else{
        return (
          <div class="medal-container">
            <Row>
                {
                  this.state.badges.map((badge,i)=>{
                      return (
                        <div className={"col-6 col-xl-3 col-lg-4 medal " + (indexes.includes(i) ? "active" : "inactive")} key={i}>
                          <img alt={"badge - " + badge.name} src={require("../img/badges/" + badge.img)}/>
                          <h5>{badge.name}</h5>
                          {indexes.includes(i) ? <p>Achieved on {this.state.achievedBadges[i].date}</p> : ""}
                        </div>
                      )

                    })
                }
            </Row>
          </div>
        );
      }

  }
}

export default Badges;
