import React, { Component } from 'react';
import FadingScreen from '../components/FadingScreen'
import Row from '../components/Row'
import Activity from '../components/Activity'
import Loader from '../components/Loader'
import Button from '../components/Button'
import XpGraph from '../components/XpGraph'
import {Heading,SubHeading} from '../components/Heading';
import axios from 'axios';
import {host} from '../util'
import Tablesort from 'tablesort';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);

class ManageSections extends Component {
  state = {
    sections : [],
    loading:true
  }

  componentDidMount(){
    axios.get(host + '/query?type=getSections')
    .then((sections) => {
      if(sections.data){
        this.setState({sections:sections.data,loading:false});

      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sections !== this.state.sections && this.state.sections.length > 0) {
      new Tablesort(document.getElementById('user-table'));
    }
  }

  deleteSection(e){
    let id = e.target.parentNode.id;
    Swal.fire("Confirm", "Are you sure you wish to delete section?","question")
    .then(result=>{
      if(result){
        axios.post(host + '/query?type=deleteSection', {_id:id})
        .then(()=>{
          window.location.reload();
        })
      }
    })

  }

  render() {
    if(this.state.loading === false){
      return (
        <FadingScreen>
          <Heading animated='true'>Sections</Heading>
          <table id="user-table" class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
            {this.state.sections.map((section,i)=>{
              return (
                <tr id={section._id}>
                   <td>{section.name}</td>
                   <td onClick={this.deleteSection}>Delete Section</td>
                 </tr>
              )
            })}
            </tbody>
          </table>
          <Link to="/addsection" className={'ml-0 btn'}>Add New Section</Link>
        </FadingScreen>
      );
    }
    else{
      return <Loader/>
    }
  }
}

export default ManageSections;
