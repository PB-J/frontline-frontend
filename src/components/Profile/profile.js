import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'

function Profile ({ user }) {
  const [index, setIndex] = useState([])
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
  const messageData = index.map(item => <div key={item.id}>
    <Card
      name={item.name}
      content={item.content}
      facility={item.facility}
      clinician={item.clinician}
      date={item.createdAt}
    />
  </div>)
  return (
    <div className="index-container">{messageData}</div>
  )
}
export default Profile
