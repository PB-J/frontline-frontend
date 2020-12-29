import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Message = ({ user, history }) => {
  const [message, setMessage] = useState({})
  const [messageId, setMessageId] = useState(null)
  const [index, setIndex] = useState([])
  console.log('!!!', this.props)
  console.log(index)

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

  const formReset = () => {
    document.getElementById('message').reset()
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
      .then(() => formReset())
      .then(() => {
        return (
          axios({
            url: `${apiUrl}/`,
            method: 'GET',
            headers: {
              'Authorization': `Token token=${user.token}`
            }
          })
            .then(res => setIndex(res.data.messages))
        )
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="message" name="message">
        <p>Name:</p>
        <input name="name" onChange={handleChange} placeholder="Name"></input>
        <p>Message:</p>
        <textarea name="content" onChange={handleChange} cols={50} rows={5} placeholder=""></textarea>
        <input name="clinician" onChange={handleChange} placeholder="Clinician"></input>
        <input name="facility" onChange={handleChange} placeholder="Facilty"></input>
        <input name="state" onChange={handleChange} placeholder="Location"></input>
        <button to='/' type="submit">Send</button>
      </form>
    </div>
  )
}
export default Message
