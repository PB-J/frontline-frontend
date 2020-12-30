import React from 'react'

const SearchBar = (props) => {
  // const [searchValue, setSearchValue] = useState([])

  // console.log(searchValue)
  console.log('this props is:', props)

  // const resetInputValue = () => {
  //   setSearchValue('')
  // }

  // const searchFunction = (event) => {
  //   event.preventDefault()

  //   resetInputValue()
  // }

  return (
    <form className="searchForm">
      <input
        onChange={props.handleChange}
        placeholder="Enter Title Here"
        type="text"
      />
    </form>
  )
}

export default SearchBar
