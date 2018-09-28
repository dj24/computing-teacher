import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import Card from '../components/Card'
import FadingScreen from '../components/FadingScreen'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {active:false};
  }

  componentDidMount(){
    setTimeout(function(){
      this.setState({active:true})
    }.bind(this), 50);
  }

  componentWillUnmount() {
  this.setState({active:false})
  }

  render() {

        let data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

    return (
      <FadingScreen>
      <div class='row'>
        <Card>
          <Bar
            data={data}
            height={300}
            options={{
              maintainAspectRatio: false
            }}
          />
        </Card>
      </div>
        <div class='row'>
          <Card>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card>
          <Card>
          </Card>
        </div>

        <div class='row'>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </FadingScreen>
    );
  }
}

export default Dashboard;
