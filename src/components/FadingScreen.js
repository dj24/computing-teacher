import React, { Component } from 'react';

class FadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {active:false};
  }

  componentDidMount(){
    setTimeout(function(){
      this.setState({active:true})
    }.bind(this), 50);

    setTimeout(function(){
      
    }.bind(this), 500);
  }

  componentWillUnmount() {
    this.setState({active:false})
  }

  render() {
    return (
      <div className={"module " + (this.state.active ? '' : 'transparent')}>
        {this.props.children}
      </div>
    );
  }
}

export default FadingScreen;
