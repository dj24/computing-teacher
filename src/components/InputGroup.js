import React, { Component } from 'react';

class InputGroup extends Component {
  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{this.props.title}</span>
        </div>
        <input name={this.props.name} type="text" className="form-control" placeholder={this.props.placeholder} id={this.props.id}/>
      </div>
    );
  }
}

export default  InputGroup;
