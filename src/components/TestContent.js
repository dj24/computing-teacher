import React, { Component } from 'react';

class Choice extends Component {

  render() {
    let base = {
      margin: '20px',
      fontWeight: 800,
      padding:'20px',
      wdth: '100%',
      fontSize: '24px',
      cursor: 'pointer',
    }
    let defaultStyle = {
      color: 'rgba(0,0,0,0.25)',
      background: 'none',
      border: '1px solid rgba(0,0,0,0.25)',
    }

    let selectedStyle = {
      color: '#7DE522',
      background: 'rgba(130, 230, 50, 0.05)',
      border: '1px solid #7DE522',
    }

    let style = this.props.select ? selectedStyle : defaultStyle;

    return (
      <div onClick={this.props.onClick} style={{...base,...style}}>
        {this.props.children}
      </div>
    );
  }
}

class TestContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      select : null,
      answers: [
        'Answer1',
        'Answer2',
        'Answer3'
      ]
    };
  }

  select(i){
    this.setState({select:i})
  }

  render() {

    let style = {
      width: '100%',
    }

    let selectedStyle = {
      background: '#f00'
    }

    return (
      <div style={style}>
      { this.state.answers.map((answer,i) =>
        <Choice onClick={() => this.select(i)} select={i == this.state.select} key={i}>
          {i + 1}. {answer}
        </Choice>
      )}
      </div>
    );
  }
}

export default TestContent;
