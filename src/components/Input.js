import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input
        type={this.props.secure ? 'password' : 'text'}
        className={"loginField"}
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}/>
    );
  }
}

export default Input;
