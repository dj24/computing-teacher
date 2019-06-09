import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import {LargeCard} from '../components/Card'
import Heading from '../components/Heading'
import Loader from '../components/Loader'
import InputGroup from '../components/InputGroup'
import Button from '../components/Button'
import Row from '../components/Row'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2';
import {host} from '../util';
import { PulseLoader } from 'react-spinners';

class AddSection extends Component {


  constructor(props){
    super(props);
    this.state = {
        questions:[],
        sections:[],
        added:false,
        loading:false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleIMGSelect = this.handleIMGSelect.bind(this);
      this.handlePDFSelect = this.handlePDFSelect.bind(this);
      this.addTest = this.addTest.bind(this);
  }

  handleChange(event) {
    this.setState({type: event.target.value});
  }


    handlePDFSelect(evt) {
        var file = evt.target.files[0];
        if(file){
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () => {
            let base64 = reader.result;
            this.setState({pdf:base64});
          }
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
    }

    handleIMGSelect(evt) {
        var file = evt.target.files[0];
        if(file){
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload =  () => {
            let base64 = reader.result;
            this.setState({img:base64});
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
    }

  addTest(){
    let img;
    let pdf;
    let name;
    if(document.getElementById('sectionImg')){
      img = document.getElementById('sectionImg').src;
    }
    if(document.getElementById('sectionPdf')){
      pdf = document.getElementById('sectionPdf').src;
    }
    if(document.getElementById('section_title')){
      name = document.getElementById('section_title').value;
    }


    if(name){
      let self = this;
      this.setState({loading:true});
      axios.post(host + '/query?type=addSection',{name,pdf,img})
        .then(function(response) {
        console.log(response);
        Swal.fire('Section Added!', response.data.name, 'success')
        .then(result=>{
          self.setState({added:true,loading:false});
        })
      })
      .catch(err=>Swal.fire('Error', err.data, 'error'));
    }
    else{
        Swal.fire('Error', "Please enter section Title", 'error');
    }


  }


  render() {
    let pdf;
    if(this.state.pdf){
      pdf = (
        <iframe
          id="sectionPdf"
          className="ImagePreview"
          style={{width:300,marginTop:10,height:500}}
          src={this.state.pdf}
        />
      )
    }
    let img;
    if(this.state.img){
      img = (
        <img
          id="sectionImg"
          className="ImagePreview"
          style={{maxWidth:"50%",marginTop:10}}
          src={this.state.img}
        />
      )
    }
if(this.state.added){
  return <Redirect to="/managesections" />
}
else if(this.state.loading){
  return <Loader/>
}
else{
  return (
    <FadingScreen>
      <Heading>New Section</Heading>
      <div className="module admin-header">
        <Row>
          <InputGroup title="Section Title" placeholder="Title" id="section_title"/>
        </Row>
        <Row>
        <div class="form-group mt-3">
          <label for="fileSelect">Learning Material (Must be PDF)</label>
          <input id="pdf" onChange={this.handlePDFSelect} type="file" class="form-control-file" id="fileSelect"/>
          {pdf}
          <br/>
          <label for="fileSelect">Section Header Image</label>

          <input id="img" onChange={this.handleIMGSelect} type="file" class="form-control-file" id="fileSelect"/>
          {img}
        </div>
        </Row>
      </div>

      <Button onClick={this.addTest}>Add Section</Button>
    </FadingScreen>
  );
}

  }
}

export default AddSection;
