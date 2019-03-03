import React, { Component } from 'react';
import {Heading, SubHeading} from '../components/Heading'
import Row from '../components/Row'
import TestContent from '../components/TestContent'
import {Doughnut} from 'react-chartjs-2';

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalQuestions : 0,
      currentQuestion: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);


    if(props.test){
      this.setState({totalQuestions : props.test.questions.length});
    }
  }

  nextQuestion(){
    if(this.state.currentQuestion < this.state.totalQuestions - 1){
      this.setState({currentQuestion:this.state.currentQuestion + 1});
    }
  }
  prevQuestion(){
    if(this.state.currentQuestion > 0){
      this.setState({currentQuestion:this.state.currentQuestion - 1});
    }
  }

  componentDidUpdate(){
    //console.log(this.props);
  }

  render() {

    const headerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }

    const cardStyle = {
      width: '100%',
      maxWidth: '800px',
      margin: 'auto',
    }

    let pie_data = {
      datasets: [{
        data : [this.state.currentQuestion/this.state.totalQuestions, 1-this.state.currentQuestion/this.state.totalQuestions],
        borderWidth: 0,
        backgroundColor: [
          'rgba(255,0,0,0.5)',
          'rgba(0,0,0,0.1)'
        ]
      }]
    }

    return (
        <div>
          <div style={cardStyle} className={"card"}>
            <div>
            <Row>
              <div class="col test-graph">
                <Doughnut
                  data={pie_data}
                  width={150}
                  options={{
                    cutoutPercentage : 90,
                    maintainAspectRatio: false,
                    tooltips: {
                      enabled: false
                    }
                  }}/>
              </div>
              <div class="col">
                <SubHeading>QUESTION {this.state.currentQuestion + 1} OF {this.state.totalQuestions}</SubHeading>
                <Heading>What is this question about?</Heading>
              </div>
            </Row>
            <Row>
              <TestContent/>
            </Row>
            <Row style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              <button onClick={this.prevQuestion}>Prev</button>
              <button onClick={this.nextQuestion}>Next</button>
              <button onClick={this.confirm}>Confirm</button>
              <a onClick={this.props.onClose} href="#">
                <i class="material-icons">close</i>
              </a>
            </Row>


            </div>
          </div>
        </div>

    );
  }
}




export default Test;
