import React, { Component } from 'react';
import {Doughnut, Line} from 'react-chartjs-2';
import {MediumCard} from '../components/Card'
import FadingScreen from '../components/FadingScreen'
import Heading, {SubHeading} from '../components/Heading'
import Row from '../components/Row'
import {notification} from '../util'
//import axios from 'axios';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
    };
  }

  componentDidMount(){
    notification("Dashboard Screen",true);
  }

  componentWillUnmount() {
    this.setState({active:false})
  }

  render() {
      let pie_data = {
        datasets: [{
          data : [350, 500],
          borderWidth: 0,
          backgroundColor: [
            'rgba(255,0,0,0.5)',
            'rgba(0,0,0,0.1)'
          ]
        }]
      }

      function addDate(days){
        let date = new Date();
        date.setDate(date.getDate() + days);
        return date;
      }

        let data = {
            datasets: [{
                label: 'XP',
                data: [{
                    x: new Date(),
                    y: 1
                }, {
                    t: addDate(6),
                    y: 10
                },
                {
                    t: addDate(10),
                    y: 12
                }],
                borderColor:'rgba(255,99,132,1)',
                backgroundColor:'rgba(255,99,132,1)',
                fill: false
            },
            {
                label: 'Class Average',
                data: [{
                    x: new Date(),
                    y: 2
                }, {
                    t: addDate(3),
                    y: 8
                },
                {
                    t: addDate(9),
                    y: 14
                }],
                borderColor:'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 1)',
                fill:false
            }]
        }

        let delay = 200;

    return (
      <FadingScreen>
        <Heading animated='true'>Overview</Heading>
        <Row>
          <MediumCard title="Level" delay={delay}>
            <Row className={'inner'}>
              <div class="col level">
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
                <h1>Level 1</h1>
              </div>
              <div class="col">
                <Heading>Progress</Heading>
                <SubHeading>
                  Youre 150 XP from reaching Level 2
                </SubHeading>
              </div>
            </Row>
          </MediumCard>

          <MediumCard title="Graph" delay={delay*2}>
            {/* BROKEN COMPONENT
            <Line
              data={data}
              height={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                   xAxes: [{
                       type: 'time',
                       time: {
                           unit: 'month'
                       }
                   }]
               }
              }}
            />
            */}
          </MediumCard>
        </Row>

        <Row>
        </Row>
      </FadingScreen>
    );
  }
}

export default Dashboard;
