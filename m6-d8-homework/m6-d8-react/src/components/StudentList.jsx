import React, {Component} from "react"
import {Container, Row} from "react-bootstrap"
import StudentListItem from "./StudentListItem"

class StudentList extends Component {
    state = {
        students: []
      }
    render (){
        return(
            <Container className="my-5">
                <Row>
                    {this.state.students.slice(0,30).map(x => <StudentListItem key={x.id} item={x} />)}
                </Row>
            </Container>
        )
    }
    componentDidMount = async ()=>{
        const res = await fetch("http://localhost:3333/books")
       
        const students = await res.json()
        this.setState({
          students: students.rows        })
      }
}

export default StudentList