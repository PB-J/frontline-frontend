import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import { Button, Modal } from 'react-bootstrap'

function Profile ({ user }) {
  const [index, setIndex] = useState([])
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState({})
  const handleClose = () => setShow(false)
  const handleShow = (event) => {
    console.log(event.target.id)
    setShow(true)
    axios({
      url: `${apiUrl}/messages/${event.target.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setMessage(res.data.message))
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/profile/`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setIndex(res.data.messages))
  }, [])
  const messageData = index.map(item => <div key={item._id}>
    <Card
      name={item.name}
      content={item.content}
      facility={item.facility}
      clinician={item.clinician}
      date={item.createdAt}
      id={item._id}
      handleShow={handleShow}
    />

  </div>)
  return (
    <div>
      <div className="index-container">{messageData}</div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="message" name="message">
            <p>Name:</p>
            <input value={message.name} name="name" placeholder="Name"></input>
            <p>Message:</p>
            <textarea value={message.content} name="content" cols={50} rows={5} placeholder=""></textarea>
            <input value={message.clinician} name="clinician" placeholder="Clinician"></input>
            <input value={message.facility} name="facility" placeholder="Facilty"></input>
            <input value={message.state} name="state" placeholder="Location"></input>
            <button type="submit">Send</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}
export default Profile
