import React, { Component } from 'react';


class Spinner extends Component {
  render() {
    return (
      <div className={this.props.loading ? '' : 'cinema-hidden' } class="cinema">
        <div class="loader">Loading...</div>
      </div>
    );
  }
}

export default Spinner;
