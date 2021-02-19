import React, { useState, useRef } from 'react'
import './card.scss'
import { Button, Overlay } from 'react-bootstrap'
import { BsThreeDotsVertical } from 'react-icons/bs'
// import { FaEdit } from 'react-icons/fa'
// import { RiDeleteBin2Fill } from 'react-icons/ri'
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
  date,
  state
}) {
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <div className="card-container">
      <div className="card-heading">
        <p className="dates">{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
        {window.location.hash.match('#/profile') ? (
          <Button
            className="btn-icon"
            ref={target}
            onClick={() => setShow(!show)}
          >
            <BsThreeDotsVertical className="icon" />
          </Button>
        ) : (
          ''
        )}
      </div>
      <div
        className={
          (facility !== 'not provided' && facility !== ' ' && facility) ||
          (clinician !== 'not provided' && clinician !== ' ' && clinician) ||
          (state !== 'not provided' && state !== ' ' && state)
            ? 'top-content'
            : 'top-content-no-content'
        }
      >
        <h2 className="content">{content}</h2>
        <br />
        <h3 className="name">-{name}</h3>
        <br />
      </div>
      <div className="bottom-content">
        {facility !== 'not provided' && facility !== ' ' && facility ? (
          <p className="facility">#{facility}</p>
        ) : (
          ''
        )}
        {clinician !== 'not provided' && clinician !== ' ' && clinician ? (
          <p className="clinician">#{clinician}</p>
        ) : (
          ''
        )}
        {state !== 'not provided' && state !== ' ' && state ? (
          <p className="state">#{state}</p>
        ) : (
          ''
        )}
      </div>

      <div>
        <Overlay
          target={target.current}
          show={show}
          placement="left"
          data-backdrop="true"
        >
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
                <Button id={id} variant="secondary" onClick={handleShow}>
                  Edit?
                </Button>
              ) : (
                ''
              )}
              {user && user._id === owner ? (
                <Button name={id} variant="danger" onClick={handleDelete}>
                  Delete?
                </Button>
              ) : (
                ''
              )}
              {user && user._id === owner ? (
                <Button
                  name="cancel"
                  variant="secondary"
                  onClick={() => setShow(false)}
                >
                  Cancel
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
