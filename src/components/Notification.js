import React, { Component} from 'react';
//import{ NotificationItem} from 'NotificationItem';

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    };
  }
  componentDidMount(){
    this.state.notifications.push(this.props.message);
    console.log(this.state.notifications);
    this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState){
    console.log(this.state.notifications);
    if(prevProps.message !== this.props.message || this.state.notifications.length === 0 ){
      this.state.notifications.push(this.props.message);
      this.forceUpdate();
    }
  }

  render(){
    /*
    let className = "notification";
    if(this.state.active){
      className+= ' show';
    }
    if(this.state.error){
      className+= ' error'
    }
    */

    /*
    const notifications = this.state.notifications.map((message,i) =>
      <NotificationItem message={message} key={i}/>
    );
    */

    return(
      <div className="notifications">
      </div>
    )
  }
}
export default Notification;
