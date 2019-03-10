import React, { Component} from 'react';

class NotificationItem extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
    this.show = this.show.bind(this);
  }

  show(){
    this.setState({active:true});
  }

  componentDidMount(){
    setTimeout(function(){
       this.show();
     }, 300);
  }

  render(){
    let classname = "notification";
    if(this.state.active){
      classname+= " show";
    }

    return(
      <div id="notification" className={classname}>
        <a id="close">x</a>
        {this.props.message}
      </div>
    )
  }
}

export default NotificationItem;
