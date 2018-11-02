import React, { Component } from 'react';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import {SmallCard,MediumCard,LargeCard} from '../components/Card'
import FadingScreen from '../components/FadingScreen'
import Heading from '../components/Heading'
import Row from '../components/Row'
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
      tests:[],
    };
  }

  componentDidMount(){
    axios.get(`http://localhost:5000/query?type=getTests`)
      .then(res => {
        const tests = res.data;
        this.setState({ tests });
        setTimeout(function(){
          this.setState({active:true})
        }.bind(this), 50);
      })

  }

  componentWillUnmount() {
  this.setState({active:false})
  }



  render() {
      let pie_data = {
        datasets: [{
          data : [350, 500],
          backgroundColor: [
            'rgba(255,0,0,0.5)',
            'rgba(0,0,0,0.2)'
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



    return (
      <FadingScreen>
        <Heading>Overview</Heading>
        <Row>
          <MediumCard title="Level">
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



          <MediumCard title="Graph">
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
        </MediumCard>
        </Row>
        <Row>
          { this.state.tests.map(test => <SmallCard title={test.title}>Test</SmallCard>)}
        </Row>
        <Row>
        </Row>
      </FadingScreen>
    );
  }
}

export default Dashboard;
