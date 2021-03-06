import React, { Component } from 'react';

class Heading extends Component {
  render() {
    return (
      <div className={'heading'}>
        <h1 className={this.props.animated ? 'animated fadeIn' : ''}>{this.props.children}</h1>
      </div>
    );
  }
}

class SubHeading extends Heading {
  render() {
    return (
        <h2>{this.props.children}</h2>
    );
  }
}

export default Heading;
export {SubHeading,Heading};
