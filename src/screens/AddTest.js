import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import {LargeCard} from '../components/Card'
import Heading from '../components/Heading'
import InputGroup from '../components/InputGroup'
import Button from '../components/Button'
import Row from '../components/Row'
import axios from 'axios';
import Swal from 'sweetalert2';
import {host} from '../util';
import { PulseLoader } from 'react-spinners';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'multiple',
      image : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleChange(event) {
    this.setState({type: event.target.value});
  }

  typeHelp(){
    let message =
    "<b>Multiple choice:</b> 3 preset answers to choose from<br> \
    <b>Exact match:</b> Exact answer must be entered<br> \
    <b>Margin for error:</b> Answers are allowed with a margin for error (likeness above 94%, common spelling mistakes are allowed)";
    Swal.fire('Question Type',message,'info');
  }

  handleFileSelect(evt) {
      var file = evt.target.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  () => {
        let base64 = reader.result;
        console.log(base64);
        this.setState({image:base64});
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }

  render() {

    let answers;
    if(this.state.type === 'multiple'){
      answers =   <div className="answers">
          <InputGroup title="Correct Answer" placeholder="Answer" name="correct_answer"/>
          <InputGroup title="Wrong Answer" placeholder="Answer" name="wrong_answer1"/>
          <InputGroup title="Wrong Answer" placeholder="Answer" name="wrong_answer2"/>
        </div>
    }
    else{
      answers =   <div className="answers">
          <InputGroup title="Correct Answer" placeholder="Answer" name="correct_answer"/>
        </div>
    }

    return (
      <FadingScreen>
      <LargeCard>
      <form>
        <div className="input-group type-group">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="typeSelect">Question Type</label>
          </div>
          <select onChange={this.handleChange} className="custom-select" id="typeSelect">
            <option value="multiple">Multiple Choice</option>
            <option value="exact">Exact Match</option>
            <option value="margin">Margin For Error</option>
          </select>
          <div class="input-group-append">
            <a class="input-group-text helper" onClick={this.typeHelp}>?</a>
          </div>
        </div>
        <div class="input-group question-box">
          <div class="input-group-prepend">
            <span class="input-group-text">Question</span>
          </div>
          <textarea rows="1" class="form-control" aria-label="Question"></textarea>
        </div>
      {answers}

      <div class="form-group mt-3">
        <label for="fileSelect">Image to show on question (Optional)</label>
        <input onChange={this.handleFileSelect} type="file" class="form-control-file" id="fileSelect"/>
        <img
          className="ImagePreview"
          style={{maxWidth:400,marginTop:10}}
          src={this.state.image}
        />
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
        questions:[],
        sections:[],
      };
      this.addQuestion = this.addQuestion.bind(this);
  }

  sectionHelp(){
    Swal.fire('Section Select','Select the section that the test will belong to','info');
  }


  componentDidMount(){
    axios.get(host + '/query?type=getSections')
    .then((res) => {
      this.setState({sections:res.data});
      console.log(this.state.sections);
    })

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

      let question = forms[i].getElementsByTagName("textarea")[0].value;
      let type = forms[i].getElementsByTagName("select")[0].value;
      let image = forms[i].getElementsByClassName("ImagePreview")[0].src;

      if(inputs[1] && inputs[2]){
        let wrong_answers = [inputs[1].value,inputs[2].value];
        questions.push({
          correct_answer,
          wrong_answers,
          question,
          type,
          image
        })
      }
      else{
        questions.push({
          correct_answer,
          question,
          type,
          image
        })
      }

    }
    let title = document.getElementById("test_title").value;
    let section = document.getElementById("section").value;
    let test = {
      title,
      section,
      questions,
    }

    axios.post(host + '/query?type=addTest', test)
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

    let sectionDropDown = <div className="form-control"><PulseLoader/></div>;

    if(this.state.sections.length > 0){
      let sectionOptions= this.state.sections.map((section,i) =>
        <option key={i} value={section.name}>{section.name}</option>
      );
      sectionDropDown = <select id="section" className="form-control">{sectionOptions}</select >;
    }


    return (
      <FadingScreen>
        <Heading>New Test</Heading>
        <div className="module admin-header">
          <Row>
            <InputGroup title="Test Title" placeholder="Title" id="test_title"/>
            <div className="input-group">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="sectionSelect">Section</label>
              </div>
              {sectionDropDown}
              <div class="input-group-append">
                <a class="input-group-text helper" onClick={this.sectionHelp}>?</a>
              </div>
            </div>
          </Row>
        </div>


            <div id="tests">
              {tests}
            </div>

            <Button onClick={this.addQuestion}>Add Question</Button>
            <Button onClick={this.addTest}>Add Test</Button>
      </FadingScreen>
    );
  }
}

export default Admin;
