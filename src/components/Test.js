import React, { Component } from 'react';
import {Heading, SubHeading} from '../components/Heading'
import Row from '../components/Row'
import {Doughnut} from 'react-chartjs-2';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import {host,getId} from '../util';

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
  getAnswer = () => {
    this.props.onSelect(this.props.children);
  }

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
      <div onClick={this.getAnswer} style={{...base,...style}}>
        {this.props.children}
      </div>
    );
  }
}

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      answers: [],
      questions: [],
      totalQuestions : 0,
      currentQuestion: 0,
      complete:false
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.finishTest = this.finishTest.bind(this);
  }

  componentDidMount(){
    getId().then(id => this.setState({id})).then(() => console.log(this.state.id));

    let answers = shuffle(this.state.answers);
    this.setState(answers);
    this.setState({totalQuestions:this.props.test.questions.length});
  }

  nextQuestion(){
    if(this.state.currentQuestion < this.state.totalQuestions - 1){
      this.setState({currentQuestion:this.state.currentQuestion + 1});
    }
    if(  document.getElementById("answerInput")){
      document.getElementById("answerInput").value = '';
    }
  }
  prevQuestion(){
    if(this.state.currentQuestion > 0){
      this.setState({currentQuestion:this.state.currentQuestion - 1});
    }
  }

  selectAnswer = (answer) =>{
    let answers = this.state.answers;
    answers[this.state.currentQuestion] = answers;
    this.setState({answers});
  }

  inputChange(e){
    let answers = this.state.answers;
    answers[this.state.currentQuestion] = e.target.value;
    this.setState({answers});
  }

  finishTest = () => {
    let accuracy = 0;
    let answers = this.state.answers;
    let questions = this.props.test.questions;
    for(let i = 0; i < answers.length; i++){
      if(questions[i].correct_answer === answers[i]){
        accuracy++;
      }
    }
    let score = accuracy/answers.length;

    let token = localStorage.getItem('token');
    if(token){
      axios.post(host + '/verifyToken',{token})
      .then((response) => {
        let payload = {
          testID : this.props.test._id,
          userID : response.data.id,
          result: score
        }
        axios.post(host + '/query?type=addTestLog', payload)
        .then(function (response) {
          console.log(response);
          Swal.fire('Well Done!', 'You completed the test, scoring ' + Math.round(score*100) + '%', 'success')
          .then(result => {
            getId().then(userID => {
              axios.post(host + '/query?type=checkAchievements', {userID})
              .then(achievements=>{
                console.log(achievements);
                if(achievements.data.length > 0){
                  let achievement = achievements.data[0]
                  Swal.fire(achievement.name);
                  Swal.fire({
                    title: 'You earned a badge!',
                    html: '<b>' + achievement.name + '</b> - ' + achievement.description,
                    imageUrl: require("../img/badges/" + achievement.img),
                    imageHeight: 200,
                    imageAlt: 'Badge'
                  })
                }
              })
            })
          });
        })
        .then(()=>{
          this.setState({complete:true}).bind(this);
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }


  render() {
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
    let input;
    let imageSrc;
    if(this.props.test){
      questions = this.props.test.questions;
      currentQuestion = questions[this.state.currentQuestion];
      answers = currentQuestion.wrong_answers.concat(currentQuestion.correct_answer);
      if(currentQuestion.image){
        imageSrc = currentQuestion.image;
      }
      title = <Heading>{currentQuestion.question}</Heading>
      input = <input onChange={this.inputChange} id="answerInput" value={this.state.value}></input>
      choices = answers.map((answer,i) =>
        <Choice onSelect={this.selectAnswer} select={this.state.answers[this.state.currentQuestion] === answer} key={i}>
          {answer}
        </Choice>
      )
    }

    let current = this.state.currentQuestion + 1;
    let total = this.state.totalQuestions;
    let nextBtn;
    if(current === total){
      nextBtn = <button onClick={this.finishTest}>Finish</button>
    }
    else{
      nextBtn = <button onClick={this.nextQuestion}>Next</button>
    }

    let image;
    if(imageSrc){
      image = <img style={{
        maxWidth:"100%",
        display:"block",
        maxHeight:"30vh",
        width:"auto",
        height:"auto",
        margin:"auto",
      }} src={imageSrc}/>
    }
    if(this.state.complete){
      return <Redirect to="/sections"/>
    }
    else{
      return (
          <div>
            <div style={cardStyle} className={"card"}>
              <div>
              <Row>
                <div className="col test-graph">
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
                <div className="col">
                  <SubHeading>QUESTION {current} OF {total}</SubHeading>
                  {title}
                </div>
              </Row>
              <Row>
                {image}
              </Row>

                {this.props.test.questions[this.state.currentQuestion].type === 'multiple' ? choices : input}
              <Row style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}>
                <button onClick={this.prevQuestion}>Prev</button>
                {nextBtn}
                <Link to="/sections">
                  <i className="material-icons">close</i>
                </Link>
              </Row>


              </div>
            </div>
          </div>

      );
    }

  }
}




export default Test;
