import React, { Component } from 'react';

class FadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"module animated fadeZoom"}>
        {this.props.children}
      </div>
    );
  }
}

export default FadingScreen;
