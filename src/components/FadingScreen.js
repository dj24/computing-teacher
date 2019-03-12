import React, { Component } from 'react';

class FadingScreen extends Component {
  

  render() {
    return (
      <div className={"module animated fadeZoom"}>
        {this.props.children}
      </div>
    );
  }
}

export default FadingScreen;
