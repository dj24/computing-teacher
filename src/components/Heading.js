import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Heading extends Component {
  render() {
    return (
      <div class='heading'>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
}

export default Heading;
