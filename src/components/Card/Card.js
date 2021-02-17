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
        <p className="dates">{moment(date).format('MM/DD/YYYY h:mma')}</p>
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
          facility !== ' ' || clinician !== ' ' || state !== ' '
            ? 'top-content'
            : ''
        }
      >
        <h2 className="content">{content}</h2>
        <br />
        <h3 className="name">-{name}</h3>
        <br />
      </div>
      {facility !== 'not provided' || facility !== '' ? (
        <div className="facility">#{facility}</div>
      ) : (
        ''
      )}
      {clinician !== '' || clinician !== 'not provided' ? (
        <div className="clinician">#{clinician}</div>
      ) : (
        ''
      )}
      {state !== '' ? <div className="state">#{state}</div> : ''}
      <div>
        <Overlay target={target.current} show={show} placement="left">
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
