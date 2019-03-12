import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import {LargeCard} from '../components/Card'
import Heading from '../components/Heading'
import Button from '../components/Button'

class Question extends Component {
  render() {
    return (
      <form>
        <label>Question</label>
        <textarea></textarea>
        <div class="answers">
          <label>Correct Answer</label>
          <input></input>
          <label>Wrong Answer</label>
          <input></input>
          <label>Wrong Answer</label>
          <input></input>
        </div>
      </form>
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

  render() {
    let tests = this.state.questions.map((test) =>
      <FadingScreen>
        <Question/>
      </FadingScreen>
    );

    return (
      <FadingScreen>
        <Heading>Add Test</Heading>
        <LargeCard>
          {tests}
          <Button onClick={this.addQuestion}>Add Question</Button>
        </LargeCard>
      </FadingScreen>
    );
  }
}

export default Admin;
