import React, { useState, useRef } from 'react'
import './card.scss'
import { Button, Overlay } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin2Fill } from 'react-icons/ri'
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
<<<<<<< HEAD
  const [show, setShow] = useState(false)
  const target = useRef(null)
=======
>>>>>>> styling changes
  return (
    <div className="card-container">
      <div className="card-heading">
        <p className="dates">{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
        {window.location.hash.match('#/profile') ? <Button className="btn-icon" ref={target} onClick={() => setShow(!show)}>
          <BsThreeDotsVertical className="icon" />
        </Button>
          : ''}
      </div>
      <h2 className="content">{content}</h2><br/>
      <h3 className="name">-{name}</h3>
      <p className="line">_________________________________</p>
      <p className="facility">#{facility}</p>
      <p className="clinician">#{clinician}</p>
      <div>
        <Overlay target={target.current} show={show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style
              }}
            >
              {user && user._id === owner ? (
                <Button id={id} variant="primary" onClick={handleShow}>
                  <FaEdit id={id} onClick={handleShow} />
                </Button>
              ) : (
                ''
              )}
              {user && user._id === owner ? (
                <Button name={id} variant="danger" onClick={handleDelete}>
                  <RiDeleteBin2Fill name={id} onClick={handleDelete} />
                </Button>
              ) : (
                ''
              )}
            </div>
          )}
        </Overlay>
      </div>
    </div>

  )
}

export default Card
