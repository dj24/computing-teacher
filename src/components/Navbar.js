import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {host,getId} from '../util';
import axios from 'axios';

function logout(){
  localStorage.removeItem('token');
  window.location.reload();
  //notification("Logged out")
}

function showMenu(){
  var element = document.getElementById("drawer");
  if(element.classList.contains("active")){
    element.classList.remove("active");
  }
  else{
    element.classList.add("active");
  }
}

class Navbar extends Component {
  state={
    user :{}
  }


  componentDidMount(){
    getId().then((id) =>{
      axios.get(host + '/query?type=getUser&criteria={"_id":"' + id +'"}')
      .then((response) => {
        this.setState({user :
          {
            firstname : response.data.firstname,
            lastname : response.data.lastname
          }
        });
      })
      .catch((error) => {
        console.log(error)
      })
    });
  }



  render() {

    let initials;
    if(this.state.user.firstname){
      initials = this.state.user.firstname[0] + this.state.user.lastname[0];
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item menu-icon">
              <a onClick={showMenu} className="nav-link" ><i className="material-icons">menu</i></a>
          </li>
            <li className="nav-item flex justify-content-end w100">
                <Link className="nav-link account-circle animated fadeIn" to={'/account'}>
                  {initials}
                </Link>
                <a onClick={logout} className="nav-link">Log Out</a>
            </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
