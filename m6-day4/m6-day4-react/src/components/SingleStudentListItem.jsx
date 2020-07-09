import React, { Component } from 'react'
import {Media} from "react-bootstrap"

export default class SingleStudentListItem extends Component {
    render() {
        const {name, surname, email, year, country, _id, img} = this.props.item
        return (
            <Media>
  <img
    width={50}
    height={50}
    className="mr-3"
    src={img}
    alt="Generic placeholder"
  />
  <Media.Body>
    <h5>{name} {surname}</h5>
    <p>
      {country}
    </p>
  </Media.Body>
</Media>
        )
    }
}