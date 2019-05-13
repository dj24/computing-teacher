import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import {SmallCard} from '../components/Card'
import Heading from '../components/Heading'
import ProgressBar from '../components/ProgressBar';
import Row from '../components/Row'
import Loader from '../components/Loader'
import { Link } from "react-router-dom";
import axios from 'axios';
import {host} from '../util'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score : "",
      id: "",
    };
  }

  componentDidMount(){

    let userId;
    let token = localStorage.getItem('token');
    if(token){
      axios.post(host + '/verifyToken',{token})
      .then((response) => {
        //token verified
        userId = response.data.id;
      })
    }
    //notification("Tests Screen");
    axios.get(host + '/getHighestScore?testId=' + this.state.id +'&userId=' + userId)
    .then(score => {
      if(score.data){
        //console.log(score);
        this.setState({score:score.data});
      }
    });
  }

  render(){
    return(
      <SmallCard id={this.props.id} delay={0} title={this.props.title}>
        <p>Test</p>
        <Link className={'btn'} to={'/test/' + this.props.id}>Start</Link>
        <div style={{display:'flex',alignItems:'center'}} className={'bottom'}>
          <ProgressBar width={this.state.score}/>
          <h5 className="animated fadeIn" style={{padding:0}}>{Math.round(this.state.score)}%</h5>
        </div>
      </SmallCard>
    )

  }

}

class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests:[],
      loading:true
    };
  }
  componentDidMount(){
    //notification("Tests Screen");
    let sectionId = this.props.match.params.id;
    axios.get(host + '/query?type=getSections&criteria={"_id":"' + sectionId +'"}')
      .then(res => {
        if(res.data.length>0){
          let name = res.data[0].name;
          this.setState({section:name});
          axios.get(host + '/query?type=getTests&criteria={"section":"' + name +'"}')
          .then(res => {
            const tests = res.data;
            console.log(tests);
            this.setState({ tests ,loading:false});
          })
        }
        else{
          axios.get(host + '/query?type=getTests')
          .then(res => {
            const tests = res.data;
            this.setState({ tests });
          })
        }


      })

  }


  render() {



  let tests;
  if(this.state.tests){
    tests = this.state.tests.map((test,i) => (
      <Test
        key={i}
        title={test.title}
        id={test._id}
      />
    ))
  }

    if(this.state.loading){
      return <Loader/>
    }
    else{
      return (
        <FadingScreen>

        <Heading animated='true'>{this.state.section} Tests</Heading>
        <Row>
          {tests }
        </Row>

        </FadingScreen>
      );
}

  }
}

export default Tests;
