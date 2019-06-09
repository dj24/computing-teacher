import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className={this.props.className + " btn"} onClick={this.props.onClick.bind(this)} type="button">
        <i className={"fas fa-" + this.props.icon}></i>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
