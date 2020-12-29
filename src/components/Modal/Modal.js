import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function Modal () {
  const [show, setShow] = useState(false)
  console.log(show)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Modal
