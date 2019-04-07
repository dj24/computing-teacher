import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: 0,
    }
  }

  componentDidMount(){
    this.setState({width:this.props.width + '%'});
  }

  render() {
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: this.state.width}}></div>
      </div>

    );
  }
}




export default ProgressBar;
