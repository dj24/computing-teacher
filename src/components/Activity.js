import React, { Component } from 'react';
import Heading from '../components/Heading';
import axios from 'axios';
import {host,getId} from '../util';
import Loader from '../components/Loader';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testLogs : [],
      loading:true,
    };
  }

  getLogs(){
    let id = this.props.id;
    console.log(id);
    axios.get(host + '/query?type=getTestLogs&criteria={"userID":"' + id + '"}')
    .then((response) => {
      this.setState({testLogs : response.data,loading:false});
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.getLogs();
    }
  }

  render() {
    if(this.state.testLogs.length === 0){
      this.getLogs();
    }

    if(this.state.loading){
      return <Loader/>
    }else{
      return (
        <ul className={"activity"}>
        {
          this.state.testLogs.map(function(log,i){
              let style={
                animationDelay: i*100 + "ms"
              }
              return (
                <li className="animated fadeIn faster" style={style} key={i}>
                  <div>
                  Scored {log.result}% in {log.title} <br/>
                  <span className="faint"><i className="material-icons  small">access_time</i> {log.diff === 0 ? "Today" : log.diff + " days ago"}</span>
                  </div>
                  <i className="material-icons">library_books</i>
                </li>
            )
          })
        }
        </ul>
      );
    }


  }
}

export default Activity;
