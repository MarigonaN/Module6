import React, { Component } from "react"
import { Col, Image, Button, Card } from "react-bootstrap"

class StudentListItem extends Component {
    render() {
        const { asin, title, img, price, category } = this.props.item
        return (
            <Col md={4}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={img} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                           {category} - {price} $
                    </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>

            </Col>
        )
    }
}

export default StudentListItem