import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Card from '../Card/Card'
import Masonry from 'react-masonry-css'
import './index.scss'

const Index = ({ user, searchValue }) => {
  const [index, setIndex] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/messages/`,
      method: 'GET'
    }).then((res) => setIndex(res.data.messages))
  }, [])

  const searchValueLowerCase = searchValue.toLowerCase()

  const filterData = index.filter(
    (item) =>
      item.content.toLowerCase().includes(searchValueLowerCase) ||
      item.facility.toLowerCase().includes(searchValueLowerCase) ||
      item.name.toLowerCase().includes(searchValueLowerCase) ||
      item.clinician.toLowerCase().includes(searchValueLowerCase) ||
      item.state.toLowerCase().includes(searchValueLowerCase)
  )

  const breakpointColumnsObj = {
    default: 3,
    1000: 2,
    700: 1
  }

  const breakpointColumnsObjOf2 = {
    default: 2,
    940: 1
  }

  const messageData = filterData.map((item) => (
    <div key={item._id} className="card-item">
      <Card
        owner={item.owner}
        name={item.name}
        content={item.content}
        facility={item.facility}
        clinician={item.clinician}
        state={item.state}
        date={item.createdAt}
        user={user}
      />
    </div>
  ))
  return (
    <div className="thank-count-container">
      <div className="thanks-box">
        {index.length} <br />
        Thanks Sent
      </div>
      <div className="index-header-text">
        Share your gratitude to health care workers with a personalized post!
      </div>
      <div className="masonry-container">
        {messageData.length > 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {messageData.reverse()}
          </Masonry>
        )}
        {messageData.length <= 2 && (
          <Masonry
            breakpointCols={breakpointColumnsObjOf2}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {messageData.reverse()}
          </Masonry>
        )}
      </div>
    </div>
  )
}

export default Index
