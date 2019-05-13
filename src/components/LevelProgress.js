import React, { Component } from 'react';
import {host,getId} from '../util'
import Row from '../components/Row'
import {Doughnut} from 'react-chartjs-2';
import Heading, {SubHeading} from '../components/Heading';
import axios from 'axios';
import Loader from '../components/Loader'

function getLevel(xp){
  return Math.floor(Math.pow((xp/20),0.8) + 1);
}

function getXpNeeded(level){
  return Math.round(20*Math.pow(level,1.25));
}


class LevelProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      xp : 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      let id = this.props.id;
      axios.get(host + '/query?type=getXp&criteria={"userID":"' + id + '"}')
      .then((response) => {
        let xp;
        if(response.data){
          xp = response.data.xp;
        }
        else xp = 0;
        let level = getLevel(xp);
        let levelXp = getXpNeeded(level) - getXpNeeded(level-1);
        let xpLeft = Math.round(getXpNeeded(level) - xp);
        this.setState({xp,level,xpLeft,levelXp,loading:false});
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  render() {

    let pie_data = {
      datasets: [{
        data : [this.state.levelXp - this.state.xpLeft, this.state.xpLeft ],
        borderWidth: 0,
        backgroundColor: [
          'rgba(255,0,0,0.5)',
          'rgba(0,0,0,0.1)'
        ]
      }]
    }
    if(this.state.loading){
      return(
        <Loader/>
      );
    }
    else{
      return (
        <Row className={'inner'}>
          <div className="col level">
            <Doughnut
              data={pie_data}
              height={277}
              options={{
                cutoutPercentage : 80,
                maintainAspectRatio: false,
                tooltips: {
                  enabled: false
                }
              }}/>
            <h1>Level {this.state.level}</h1>
          </div>
          <div className="col next-level">
            <SubHeading>
              You're {this.state.xpLeft} points from reaching Level {this.state.level + 1}
            </SubHeading>
          </div>
        </Row>
      );
    }
    }

}

export default LevelProgress;
