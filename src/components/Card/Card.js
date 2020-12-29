import React from 'react'
import './card.scss'
import { Button } from 'react-bootstrap'

function Card ({ id, handleShow, content, name, clinician, facility, date }) {
  return (
    <div className="card-container">
      <h2>{content}</h2>
      <h3>{name}</h3>
      <p>{facility}</p>
      <p>{date}</p>
      <p>{clinician}</p>
      <Button id={id} variant="primary" onClick={handleShow}>
        {id}
      </Button>
    </div>
  )
}

export default Card
