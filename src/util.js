import React from 'react';
import Notification from './components/Notification'
import  ReactDOM  from 'react-dom';
import axios from 'axios';

export function notification(message,error){
  ReactDOM.render(<Notification error={error} message={message}/>, document.getElementById('notifications'));
  //setTimeout(function(){ document.getElementById("notification").outerHTML = ""; }, 4000);
}

export function getId(){
  return new Promise((resolve,reject)=>{
    let token = localStorage.getItem('token');
    if(token){
      axios.post(host + '/verifyToken',{token})
      .then((response) => {
        resolve(response.data.id);
      })
      .catch((error) => {
        reject(error);
      })
    }
  })

}

//export const host = 'https://computing-teacher.herokuapp.com';
export const host = 'http://localhost:5000';
