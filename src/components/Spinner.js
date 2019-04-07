import React, { Component } from 'react';


class Spinner extends Component {
  render() {
    return (
      <div className={this.props.loading ? '' : 'cinema-hidden' } className="cinema">
        <div className="loader">Loading...</div>
      </div>
    );
  }
}

export default Spinner;
