import React, { Component} from 'react';

class Notification extends Component {
  state = {
    active:false,
  };



  componentDidMount(){
    setTimeout(
      function() {
          this.show();
      }
      .bind(this),
      500
    );
    setTimeout(
      function() {
          this.hide();
      }
      .bind(this),
      2500
    );
  }

  show(){
    this.setState({active:true});
  }

  hide(){
    this.setState({active:false});
  }

  render(){
    return(
        <div className={this.state.active ? "notification show" : "notification"}>
          Test Message
        </div>
    )
  }
}
export default Notification;
