import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick.bind(this)} type="button" class="btn">
        <i className={"fas fa-" + this.props.icon}></i>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
