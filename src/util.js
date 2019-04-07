import React from 'react';
import Notification from './components/Notification'
import  ReactDOM  from 'react-dom';

export function notification(message,error){
  ReactDOM.render(<Notification error={error} message={message}/>, document.getElementById('notifications'));
  //setTimeout(function(){ document.getElementById("notification").outerHTML = ""; }, 4000);
}

//export const host = 'https://computing-teacher.herokuapp.com';
export const host = 'http://localhost:5000';
