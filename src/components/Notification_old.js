import React, { Component} from 'react';

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      active:false,
      message: '',
      timer: null,
      error: false,
    };
    this.hide = this.hide.bind(this);
  }


  queue(){
    clearTimeout(this.state.timer);
    this.setState({error:this.props.error});
    this.setState({message:this.props.message});
    this.show();
    var timer = setTimeout(
      function() {
          this.hide();
      }
      .bind(this),
      4000
    );
    this.setState({timer});
  }

  refresh(){
    clearTimeout(this.state.timer);
    this.hide();
    setTimeout(
      function() {
          this.queue();
      }
      .bind(this),
      600
    );
  }

  componentDidMount(){
    this.queue();
  }

  componentDidUpdate(prevProps, prevState){
    console.log("prev state: " + prevProps.message);
    console.log("this state: " + this.props.message);
    let inactive = prevState.active === false && this.state.active === false;
    if(prevProps.message !== this.props.message || inactive){
      if(this.state.active){
        this.refresh();
      }
      else{
        this.queue();
      }

    }
  }

  show(){
    this.setState({active:true});
  }

  hide(){
    clearTimeout(this.state.timer);
    this.setState({active:false});
  }

  render(){
    let className = "notification";
    if(this.state.active){
      className+= ' show';
    }
    if(this.state.error){
      className+= ' error'
    }

    return(
        <div id="notification" className={className}>
          <a onClick={this.hide} id="close">x</a>
          {this.state.message}
        </div>
    )
  }
}
export default Notification;
