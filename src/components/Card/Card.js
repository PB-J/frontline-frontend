import React from 'react'
import './card.scss'

function Card ({ content, name, clinician, facility, date }) {
  return (
    <div className="card-container">
      <h2>{content}</h2>
      <h3>{name}</h3>
      <p>{facility}</p>
      <p>{date}</p>
      <p>{clinician}</p>
    </div>
  )
}

export default Card
