import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import './index.scss'

const Index = ({ user, searchValue }) => {
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/messages/`,
      method: 'GET'
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const filterData = index.filter((item) =>
    item.content.toLowerCase().includes(searchValue.toLowerCase())
  )

  const messageData = filterData.map((item) => (
    <div key={item._id}>
      <Card
        owner={item.owner}
        name={item.name}
        content={item.content}
        facility={item.facility}
        clinician={item.clinician}
        date={item.createdAt}
        user={user}
      />
    </div>
  ))
  return (
    <div>
      <div className="index-header">
        <div className="thanks-box">
          {index.length}
          <br />
          Thanks Sent
        </div>
        <div className="index-header-text">
          <h2>The frontline needs us as much as we need them.</h2>
          <h2>Thank them virtually with a personalized post!</h2>
        </div>
      </div>
      <div className="index-container">{messageData.reverse()}</div>
    </div>
  )
}

export default Index
