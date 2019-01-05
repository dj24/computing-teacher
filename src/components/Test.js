import React, { Component } from 'react';
import Overlay from '../components/Overlay'
import Heading from '../components/Heading'

class Test extends Component {
  constructor(props){
    super(props);
  }


  render() {
    let move;
    if(this.props.show){
      move = '0';
    }
    else{
      move = '100%';
    }

    const headerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }

    const testStyle = {
      position:'absolute',
      transition: 'all ease 1s',
      width : '100%',
      transform: 'translateX(100%)',
    };
    return (
        <div style={testStyle}>
          <div className={"card"}>
            <div style={headerStyle} class="card-header">
              Test Title
              <a onClick={this.props.onClose} href="#">
                <i class="material-icons">close</i>
              </a>
            </div>
            <div class="card-body">
                {this.props.children}
            </div>
          </div>
        </div>

    );
  }
}




export default Test;
