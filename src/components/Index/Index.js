import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Index = () => {
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/messages/`,
      method: 'GET'
    })
      .then(res => setIndex(res.data.messages))
  }, [])

  const messageData = index.map(item => <div key={item.id}>{item.content}, {item.name}, {item.clinician}, {item.createdAt}</div>)
  return (
    <div>{messageData}</div>
  )
}

export default Index
