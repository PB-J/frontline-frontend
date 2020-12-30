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
        <p className="dates">{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
        <div className="hover-icon">
          <BsThreeDotsVertical />
        </div>
      </div>
      <h2 className="content">{content}</h2><br/>
      <h3 className="name">-{name}</h3>
      <p className="line">_________________________________</p>
      <p className="facility">#{facility}</p>
      <p className="clinician">#{clinician}</p>
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
