import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

class Loader extends Component {

  render() {
    return (
      <div className="card-loader">
        <PulseLoader/>
      </div>
    );
  }
}

export default Loader;
