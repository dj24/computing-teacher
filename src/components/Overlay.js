import React, { Component } from 'react';

class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"overlay animated fadeIn"}>
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
