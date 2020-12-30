import React from 'react'
import './card.scss'
import { Button } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import moment from 'moment'

function Card({
  owner,
  user,
  id,
  handleShow,
  handleDelete,
  content,
  name,
  clinician,
  facility,
  date
}) {
  console.log('!!!', user)
  return (
    <div className="card-container">
      <div className="card-heading">
        <h2>{content}</h2>
        <div className="hover-icon">
          <BsThreeDotsVertical />
        </div>
      </div>
      <h3>{name}</h3>
      <p>{facility}</p>
      <p>{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
      <p>{clinician}</p>
      <div className="hover-container">
        {user && user._id === owner ? (
          <Button id={id} variant="primary" onClick={handleShow}>
            E
          </Button>
        ) : (
          ''
        )}
        {user && user._id === owner ? (
          <Button name={id} variant="danger" onClick={handleDelete}>
            D
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Card
