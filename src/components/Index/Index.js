import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import './index.scss'

const Index = ({ user, searchValue }) => {
  console.log(user)
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/messages/`,
      method: 'GET'
    }).then((res) => setIndex(res.data.messages))
  }, [])

  console.log('index value is:', index)

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
  return <div className="index-container">{messageData.reverse()}</div>
}

export default Index
