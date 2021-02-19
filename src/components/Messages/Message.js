/* eslint-disable no-throw-literal */
import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

// import Picker from 'emoji-picker-react'
// import Col from 'react-bootstrap/Col'
import './message.scss'
import EmojiTextarea from '../Emoji/Emoji'

const Message = ({ user, msgAlert }) => {
  const [message, setMessage] = useState({ name: user.username })
  const [messageId, setMessageId] = useState(null)
  const [text, setText] = useState('')
  const handleCheck = (event) => {
    event.persist()
    const value =
      event.target.name === 'name' && event.target.checked === true
        ? 'Anonymous'
        : user.username
    setMessage((prevMessage) => {
      const updatedMessage = { [event.target.name]: value }
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      return editedMessage
    })
  }
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
  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/messages/`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: { message }
    })
      .then((res) => setMessageId(res.data.message._id))
      .then(setMessage({}))
  }

  return (
    <div className="create-message-container">
      {messageId && <Redirect to={'/profile'} />}
      <div className="create-message-title-row">
        <div className="create-message-title">
          <h1>Post a Thank You</h1>
        </div>
        <div className="create-message-title-text">
          <p>Tell frontline healthcare workers how much you appreciate them!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} id="message" name="message">
        <EmojiTextarea
          setText={setText}
          className="create-message-textarea"
          name="content"
          rows={5}
          placeholder=""
          editValue={message.content}
          handleChange={handleContentChange}
        />
        <div>
          <div className="checkbox">
            <input
              id="checkbox"
              type="checkbox"
              name="name"
              onClick={handleCheck}
            />{' '}
            <label htmlFor="checkbox">
              <span>Post as anonymous</span>
            </label>
          </div>
          <h5 className="create-message-add-optional-title">
            Add to your post (optional)
          </h5>
          <div className="create-message-optional">
            <div className="create-message-option">
              Clinician:
              <input
                name="clinician"
                onChange={handleChange}
                placeholder="Clinician"
              />
            </div>
            <div className="create-message-option">
              Facility:
              <input
                name="facility"
                onChange={handleChange}
                placeholder="Facilty"
              />
            </div>
            <div className="create-message-option">
              State:
              <input
                name="state"
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
          </div>
        </div>
        {/* <Picker/> */}
        <button to="/" type="submit" className="create-message-submit">
          Submit Post
        </button>
      </form>
    </div>
  )
}
export default withRouter(Message)
