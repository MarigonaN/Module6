import React, { Component } from "react"
import { Col,  Button, Card } from "react-bootstrap"

class StudentListItem extends Component {
    render() {
        const { firstname, surname, email } = this.props.item
        return (
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                   
                    <Card.Body>
                        <Card.Title>{firstname}</Card.Title>
                        <Card.Text>
                           {surname} - {email} $
                    </Card.Text>
                        <Button variant="info">Go somewhere</Button>
                    </Card.Body>
                </Card>

            </Col>
        )
    }
}

export default StudentListItem