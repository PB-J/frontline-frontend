import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import EmojiTextarea from '../Emoji/Emoji'
import { Button, Modal } from 'react-bootstrap'
import './profile.scss'

function Profile({ user, owner }) {
  const [index, setIndex] = useState([])
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState({})
  const [messageId, setMessageId] = useState(null)
  const [text, setText] = useState('')
  const [editDeleteShow, setEditDeleteShow] = useState(false)
  console.log(text)
  const handleContentChange = (text) => {
    setMessage((prevMessage) => {
      const updatedMessage = { content: text }
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      return editedMessage
    })
  }

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
    })
      .then((res) => setMessage(res.data.message))
      .then(() => setText(message.content))
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
      })
        .then((res) => setIndex(res.data.messages))
        .then(() => setShow(false))
        .then(() => setEditDeleteShow(false))
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
      console.log('Successfully Deleted')
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
        state={item.state}
        clinician={item.clinician}
        date={item.createdAt}
        id={item._id}
        handleShow={handleShow}
        setEditDeleteShow={editDeleteShow}
      />
    </div>
  ))
  return (
    <div className="profile-container">
      <div className="profile-data">
        <div className="user-info">
          <p>Hello, {user.username} </p>
          <p>{user.email}</p>
        </div>
        <Link className="link" to="/change-password">
          <p>Change Password</p>
        </Link>
        <Link className="link" to="/sign-out">
          <p>Sign Out</p>
        </Link>
      </div>
      <div className="sent-cards">Your Sent Cards ({index.length})</div>
      <div className="profile-index-container">{messageData.reverse()}</div>
      <Modal
        show={show}
        onHide={handleClose}
        data-backdrop="true"
        keyboard={false}
      >
        <Modal.Body className="update-message-container">
          <form onSubmit={handleSubmit} id="message" name="message">
            <div className="header-container">
              <div className="closeButton" onClick={() => setShow(!show)}>
                X
              </div>
            </div>
            <p>Name:</p>
            <input
              onChange={handleChange}
              value={message.name}
              name="name"
              placeholder="Name"
            ></input>
            <p>Message:</p>
            <EmojiTextarea
              setText={setText}
              className="create-message-textarea"
              name="content"
              rows={3}
              placeholder=""
              editValue={message.content}
              handleChange={handleContentChange}
            />
            <div className="create-message-option">
              Clinician:
              <input
                onChange={handleChange}
                value={message.clinician}
                name="clinician"
                placeholder="Clinician"
              ></input>
            </div>
            <div className="create-message-option">
              Facility:
              <input
                onChange={handleChange}
                value={message.facility}
                name="facility"
                placeholder="Facilty"
              ></input>
            </div>
            <div className="create-message-option">
              Location:
              <input
                onChange={handleChange}
                value={message.state}
                name="state"
                placeholder="Location"
              ></input>
            </div>
            <Button
              className="edit-send"
              variant="secondary"
              onClick={handleClose}
              type="submit"
            >
              Send
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Profile
