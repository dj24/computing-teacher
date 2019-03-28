import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import {LargeCard} from '../components/Card'
import Heading from '../components/Heading'
import Button from '../components/Button'
import axios from 'axios';
import Swal from 'sweetalert2';

class Question extends Component {
  render() {
    return (
      <FadingScreen>
      <LargeCard>
      <form>
        <div class="form-group">
          <label>Question</label>
          <textarea  class="form-control" ></textarea>
        </div>
        <div class="answers">
          <div class="form-group">
            <label>Correct Answer</label>
            <input type="text" name="correct_answer" class="form-control" placeholder="Example input"/>
          </div>
          <div class="form-group">
            <label>Wrong Answer</label>
            <input type="text" name="wrong_answer1" class="form-control" placeholder="Example input"/>
          </div>
          <div class="form-group">
            <label>Wrong Answer</label>
            <input type="text" name="wrong_answer2" class="form-control" placeholder="Example input"/>
          </div>
        </div>
      </form>
      </LargeCard>
      </FadingScreen>
    )
  }
}

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
        questions:[]
      };
      this.addQuestion = this.addQuestion.bind(this);
  }


  addQuestion(){
    this.setState({
      questions: [2, ...this.state.questions]
    })
  }

  addTest(){
    let forms = document.forms;
    let questions = [];
    for(let i  = 0; i < forms.length;i++){
      let inputs = forms[i].getElementsByTagName("input");
      let correct_answer = inputs[0].value;
      let wrong_answers = [inputs[1].value,inputs[2].value];
      let question = forms[i].getElementsByTagName("textarea")[0].value;
      console.log(question);
      questions.push({
        correct_answer,
        wrong_answers,
        question
      })
    }
    let title = document.getElementById("test_title").value;
    let test = {
      title,
      questions
    }
    axios.post('http://localhost:5000/query?type=addTest', test)
    .then(function (response) {
      Swal.fire('Test Added!', '"' + title +'" added to database.', 'success');
    })
    .catch(function (error) {
        Swal.fire('Error', error.data, 'error');
    });
  }

  render() {
    let tests = this.state.questions.map((test,i) =>
        <Question key={i}/>
    );

    return (
      <FadingScreen>

        <Heading>Add Test</Heading>

            <label>Test Title</label>
            <input id="test_title"></input>
            {tests}
            <Button onClick={this.addQuestion}>Add Question</Button>
            <Button onClick={this.addTest}>Add Test</Button>
      </FadingScreen>
    );
  }
}

export default Admin;
