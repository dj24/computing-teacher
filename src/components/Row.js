import React, { Component } from 'react';


class Row extends Component {
  render() {
    return (
      <div className='row' style={this.props.style}>
          {this.props.children}
      </div>
    );
  }
}



export default Row;
