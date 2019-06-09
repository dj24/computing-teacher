import React, { Component } from 'react';

class ViewPDF extends Component {

  render() {
    return (
      <iframe style={{width:"100%",height:"calc(100vh - 146px)"}} src={this.props.src}/>
    );
  }
}

export default ViewPDF;
