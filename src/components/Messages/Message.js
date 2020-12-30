import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
// import Picker from 'emoji-picker-react'
// import Col from 'react-bootstrap/Col'
import './message.scss'

const Message = ({ user }) => {
  const [message, setMessage] = useState({ name: user.username })
  const [messageId, setMessageId] = useState(null)

  const handleCheck = (event) => {
    event.persist()
    const value =
      event.target.name === 'name' && event.target.checked === true
        ? 'Anonymous'
        : user.username
    console.log(value)
    setMessage((prevMessage) => {
      const updatedMessage = { [event.target.name]: value }
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      return editedMessage
    })
  }

  const handleChange = (event) => {
    event.persist()
    console.log('message', message)
    setMessage((prevMessage) => {
      const updatedMessage = { [event.target.name]: event.target.value }
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      return editedMessage
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // const value = event.target.type === 'checkbox' && event.target.value === true ? 'Anonymous' : 'other'
    // setMessage(prevMessage => {
    //   const updatedMessage = { [event.target.name]: event.target.value }
    //   const editedMessage = Object.assign({}, prevMessage, updatedMessage)
    //   return editedMessage
    // })
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
          <h1>Write a Thank you</h1>
        </div>
        <div className="create-message-title-text">
          <p>Tell frontline healthcare workers how much you appreciate them!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} id="message" name="message">
        <h3>Message:</h3>
        <textarea
          className="create-message-textarea"
          name="content"
          onChange={handleChange}
          rows={5}
          placeholder=""
        ></textarea>
        <div>
          <input type="checkbox" name="name" onClick={handleCheck} /> Post as
          anonymous.
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
