import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen';
import Heading from '../components/Heading'
import {ImageCard} from '../components/Card'
import Row from '../components/Row'
import ProgressBar from '../components/ProgressBar'
import axios from 'axios';
import {host,getId} from '../util';
import { Link } from "react-router-dom";
import Loader from '../components/Loader';
import ViewPDF from '../components/ViewPDF';
import 'lightbox-react/style.css';
import Lightbox from 'lightbox-react';

class Sections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections : [],
      loading: true,
      isOpen: false
    };
  }
  componentDidMount(){
    getId().then((id) =>{
      axios.get(host + '/query?type=getSections')
      .then((response) => {
        this.setState({sections:response.data,loading:false});
      })
      .catch((error) => {
        console.log(error)
      })
  })
}


  render() {
    let move;
    if(this.state.showTest){
      move = '-100%';
    }
    else{
      move = '0';
    }

    const screenStyle = {
      position:'absolute',
      transition: 'all cubic-bezier(0.165, 0.84, 0.44, 1) 0.6s',
      transform: 'translateX(' + move + ')',
    };

    let sections;

    if (this.state.sections.length > 0) {
      sections = this.state.sections.map((section,i) =>
        <ImageCard key={i} className={'learn-card'} src={section.img}>
          <Link to={'tests/' + section._id}><h3>{section.name}</h3></Link>
          {section.pdf ? <button className={"ml-3"} type="button" onClick={() => this.setState({isOpen: true, activePdf : section.pdf})}>Learning Material</button> : <p></p>}

          <div style={{display:'flex',alignItems:'center'}} className={'bottom'}>
            <ProgressBar width={50}/>
            <h5 style={{padding:0}}>50%</h5>
          </div>
          </ImageCard>

        )

    }



    if(this.state.loading){
      return <Loader/>
    }
    else if(this.state.isOpen){
      return (
        <div>
        <button style={{padding:10,margin:10}} type="button" onClick={() => this.setState({isOpen:false})}>
          Close PDF
        </button>
        <ViewPDF
          src={this.state.activePdf}
        />
        </div>
      )
    }
    else{
      return (
        <FadingScreen>
        <Row style={screenStyle}>
          <div className="col-12"><Heading animated='true'>Sections</Heading></div>
          {sections}
        </Row>
        </FadingScreen>
      );
    }

  }
}

export default Sections;
