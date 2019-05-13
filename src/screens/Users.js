import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import Row from '../components/Row'
import Activity from '../components/Activity'
import Loader from '../components/Loader'
import XpGraph from '../components/XpGraph'
import {Heading,SubHeading} from '../components/Heading';
import axios from 'axios';
import {host} from '../util'
import Tablesort from 'tablesort';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

class Users extends Component {
  state = {
    users : []
  }

  componentDidMount(){
    axios.get(host + '/query?type=getAdminList')
    .then((users) => {
      if(users.data){
        this.setState({users:users.data});
        console.log(this.state.users);
      }
    })
  }

  handleXp(e){
    let parent = e.target.parentElement;
    let id = parent.id;
    MySwal.fire({
      title: " XP graph for  " + parent.getElementsByTagName('td')[1].innerHTML,
      html: <XpGraph id={id}/>,
    })
  }

  handleScores(e){
    let parent = e.target.parentElement;
    let id = parent.id;
    MySwal.fire({
      title: " Activity Log for  " + parent.getElementsByTagName('td')[1].innerHTML,
      html: <Activity id={id}/>,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.user) {
      new Tablesort(document.getElementById('user-table'));
    }
  }

  render() {
    if(this.state.users.length > 0){
      return (
        <FadingScreen>
          <Heading animated='true'>Users</Heading>
          <table id="user-table" class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
                <th scope="col">Level</th>
                <th scope="col">Average Score</th>
                <th scope="col">Test Participation</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map((user,i)=>{
              return (
                <tr id={user._id}>
                   <td>{user.username}</td>
                   <td>{user.name}</td>
                   <td onClick={this.handleXp}>{user.xp}</td>
                   <td>{user.level}</td>
                   <td onClick={this.handleScores}>{user.averageResult}%</td>
                   <td>{user.completion}%</td>
                 </tr>
              )
            })}
            </tbody>
          </table>
        </FadingScreen>
      );
    }
    else{
      return <Loader/>
    }
  }
}

export default Users;
