import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import Picker from 'emoji-picker-react'

const Message = ({ user }) => {
  const [message, setMessage] = useState({})
  const [messageId, setMessageId] = useState(null)
  console.log('!!!', this.props)

  const handleChange = event => {
    console.log(messageId)
    event.persist()
    setMessage(prevMessage => {
      const updatedMessage = { [event.target.name]: event.target.value }
      console.log(updatedMessage)
      const editedMessage = Object.assign({}, prevMessage, updatedMessage)
      console.log(editedMessage)
      return editedMessage
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/messages/`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { message }
    })
      .then(res => setMessageId(res.data.message._id))
      .then(setMessage({}))
  }

  return (
    <div>
      {messageId && <Redirect to ={'/profile'}/>}
      <form onSubmit={handleSubmit} id="message" name="message">
        <p>Name:</p>
        <input name="name" onChange={handleChange} placeholder="Name"></input>
        <p>Message:</p>
        <textarea name="content" onChange={handleChange} cols={50} rows={5} placeholder=""></textarea>
        <input name="clinician" onChange={handleChange} placeholder="Clinician"></input>
        <input name="facility" onChange={handleChange} placeholder="Facilty"></input>
        <input name="state" onChange={handleChange} placeholder="Location"></input>
        <Picker/>
        <button to='/' type="submit">Send</button>
      </form>
    </div>
  )
}
export default withRouter(Message)
