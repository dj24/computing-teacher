import React, { Component } from 'react';
import {host,getId} from '../util'
import Row from '../components/Row'
import {Line} from 'react-chartjs-2';
import Heading, {SubHeading} from '../components/Heading'
import axios from 'axios';
import Loader from '../components/Loader';

class XpGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xpLogs : [],
      loading:true
    };
  }

  componentDidMount(){
      getId().then((id) =>{
        axios.get(host + '/query?type=getXpLogs&criteria={"userID":"' + id + '"}')
        .then((response) => {
          this.setState({xpLogs : response.data,loading:false});
          console.log(this.state.xpLogs);
        })
        .catch((error) => {
          console.log(error)
        })
      });
  }

  render() {

    let pie_data = {
      datasets: [{
        data : this.state.xpLogs,
        borderWidth: 0,
        backgroundColor: [
          'rgba(255,0,0,0.5)',
          'rgba(0,0,0,0.1)'
        ]
      }]
    }

    let options = {
     animation: {
       duration:600
     },
     tooltips: {
       enabled: false
     },
     maintainAspectRatio: false,
     responsive: true,
      legend:{
        display: false
      },
      scales: {
        yAxes:[{
          scaleLabel : {
            display:true,
            labelString : "Points"
          }
        }],
        xAxes: [{
                type: 'time',
                time: {
                  unit: 'day',
                  unitStepSize: 1,
                  displayFormats: {
                     'day': 'MMM DD'
                  }
                }
            }]
        }
    }

    let graph;
    if(this.state.xpLogs.length > 0){
      graph = (
        <Line
          data={pie_data}
          options={options}
          height={315}
          />
      )
    }

      if(this.state.loading){
        return <Loader/>
      }
      else{
        return (
          <Row className={'inner'}>
            {graph}
          </Row>
        );
      }

  }
}

export default XpGraph;
