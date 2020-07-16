
    import React, { Component } from 'react'
import StudentList from './components/StudentList';


export default class App extends Component {
  state = {
    students: []
  }
  render() {
    return (
      <div>
        <h1 className="display-1">Students</h1>
        <StudentList students={this.state.students} />
      </div>
    )
  }
  
  componentDidMount = async ()=>{
    const res = await fetch("http://localhost:3333/Students")
 
    const students = await res.json()
    this.setState({
      students: students
    })
  }
}



