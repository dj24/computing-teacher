import React, { Component } from 'react';


class Card extends Component {
  render() {
    return (
      <div class="card bg-light col">
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">Light card title</h5>
          <p class="card-text">
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
