import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import './index.scss'

const Index = ({ user }) => {
  console.log(user)
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/messages/`,
      method: 'GET'
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const messageData = index.map((item) => (
    <div key={item._id}>
      <Card
        name={item.name}
        content={item.content}
        facility={item.facility}
        clinician={item.clinician}
        date={item.createdAt}
      />
    </div>
  ))
  return <div className="index-container">{messageData.reverse()}</div>
}

export default Index
