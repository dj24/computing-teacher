import React, { Component } from 'react';

class Overlay extends Component {

  render() {
    return (
      <div className={"overlay animated fadeIn"}>
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
