import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import { Button, Modal } from 'react-bootstrap'
import './profile.scss'

function Profile({ user, owner }) {
  const [index, setIndex] = useState([])
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState({})
  const [messageId, setMessageId] = useState(null)

  const handleChange = (event) => {
    event.persist()
    setMessage((prevMessage) => {
      const updatedMessage = { [event.target.name]: event.target.value }
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      return editedMessage
    })
  }

  const handleClose = () => setShow(false)
  const handleShow = (event) => {
    setMessageId(event.target.id)
    setShow(true)
    axios({
      url: `${apiUrl}/messages/${event.target.id}`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      }
    }).then((res) => setMessage(res.data.message))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/messages/${messageId}`,
      method: 'PATCH',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    }).then(() => {
      return axios({
        url: `${apiUrl}/profile/`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${user.token}`
        }
      }).then((res) => setIndex(res.data.messages))
    })
  }

  const handleDelete = (event) => {
    axios({
      url: `${apiUrl}/messages/${event.target.name}`,
      method: 'DELETE',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    }).then(() => {
      return axios({
        url: `${apiUrl}/profile/`,
        method: 'GET',
        headers: {
          Authorization: `Token token=${user.token}`
        }
      }).then((res) => setIndex(res.data.messages))
    })
  }

  useEffect(() => {
    axios({
      url: `${apiUrl}/profile/`,
      method: 'GET',
      headers: {
        Authorization: `Token token=${user.token}`
      }
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const messageData = index.map((item) => (
    <div key={item._id}>
      <Card
        owner={item.owner}
        user={user}
        handleDelete={handleDelete}
        name={item.name}
        content={item.content}
        facility={item.facility}
        clinician={item.clinician}
        date={item.createdAt}
        id={item._id}
        handleShow={handleShow}
      />
    </div>
  ))
  return (
    <div className="profile-container">
      <div className="profile-data">
        <h2>{user.username}</h2>
        <h3>{user.email}</h3>
        <h2>Your sent cards ({index.length})</h2>
        <Link className="link" to="/change-password">
          <p>Change Password</p>
        </Link>
        <Link className="link" to="/sign-out">
          <p>Sign Out</p>
        </Link>
      </div>
      <div className="profile-index-container">{messageData.reverse()}</div>
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
          <form onSubmit={handleSubmit} id="message" name="message">
            <p>Name:</p>
            <input
              onChange={handleChange}
              value={message.name}
              name="name"
              placeholder="Name"
            ></input>
            <p>Message:</p>
            <textarea
              onChange={handleChange}
              value={message.content}
              name="content"
              cols={50}
              rows={5}
              placeholder=""
            ></textarea>
            <input
              onChange={handleChange}
              value={message.clinician}
              name="clinician"
              placeholder="Clinician"
            ></input>
            <input
              onChange={handleChange}
              value={message.facility}
              name="facility"
              placeholder="Facilty"
            ></input>
            <input
              onChange={handleChange}
              value={message.state}
              name="state"
              placeholder="Location"
            ></input>
            <button onClick={handleClose} type="submit">
              Send
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default Profile
