import React, { Component } from 'react';
import {Heading, SubHeading} from '../components/Heading'
import Row from '../components/Row'
import TestContent from '../components/TestContent'
import {Doughnut} from 'react-chartjs-2';
import {Link} from 'react-router-dom';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Choice extends Component {

  render() {
    let base = {
      margin: '20px',
      fontWeight: 800,
      padding:'20px',
      wdth: '100%',
      fontSize: '24px',
      cursor: 'pointer',
    }
    let defaultStyle = {
      color: 'rgba(0,0,0,0.25)',
      background: 'none',
      border: '1px solid rgba(0,0,0,0.25)',
    }

    let selectedStyle = {
      color: '#7DE522',
      background: 'rgba(130, 230, 50, 0.05)',
      border: '1px solid #7DE522',
    }

    let style = this.props.select ? selectedStyle : defaultStyle;

    return (
      <div onClick={this.props.onClick} style={{...base,...style}}>
        {this.props.children}
      </div>
    );
  }
}

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      totalQuestions : 0,
      currentQuestion: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
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

  componentDidMount(){
    if(this.props.test){
      this.setState({totalQuestions : this.props.test.questions.length});
      this.setState({questions: this.props.test.questions});
    }
    console.log(this.props.test);
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
    let questions;
    let currentQuestion;
    let answers;
    let title;
    let choices;
    if(this.props.test){
      questions = this.props.test.questions;
      currentQuestion = questions[this.state.currentQuestion];
      answers = currentQuestion.wrong_answers.concat(currentQuestion.correct_answer);
      title = <Heading>{currentQuestion.question}</Heading>

      choices = shuffle(answers).map((answer,i) =>
        <Choice select={false} key={i}>
          {i + 1}. {answer}
        </Choice>
      )
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
                {title}
              </div>
            </Row>
            <Row>
              {/**<TestContent answers={answers}/>**/}
              {choices}
            </Row>
            <Row style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              <button onClick={this.prevQuestion}>Prev</button>
              <button onClick={this.nextQuestion}>Next</button>
              <button onClick={this.confirm}>Confirm</button>
              <Link to="/tests">
                <i class="material-icons">close</i>
              </Link>
            </Row>


            </div>
          </div>
        </div>

    );
  }
}




export default Test;
