import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl } from 'react-bootstrap'

// Image and Icon imports
import appLogo from '../../Images/MediLogo.svg'
import searchIcon from '../../Images/SearchIcon.svg'
import { MdAddCircle, MdPerson } from 'react-icons/md'

import './header.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="message-link" href="#message">
      <MdAddCircle className="message-icon" />
      Add Post
    </Nav.Link>
    <Nav.Link className="message-link" href="#profile">
      <MdPerson className="message-icon" />
      Profile
    </Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user, handleChange }) => {
  const hideSearchBar = window.location.hash === '#/profile'
  return (
    <Navbar className="header-nav-bar" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? authenticatedOptions : unauthenticatedOptions}
        </Nav>
      </Navbar.Collapse>

      <div className="app-logo">
        <a href="#">
          <img src={appLogo} alt="Medi thanks logo"></img>
        </a>
      </div>

      {!hideSearchBar ? (
        <div className="search-bar-container">
          <img src={searchIcon}></img>
          <Form inline>
            <FormControl
              onChange={handleChange}
              type="text"
              placeholder="Search"
              className="nav-search-bar mr-sm-2"
            />
          </Form>
        </div>
      ) : (
        <div className="hide-search-bar" style={{ display: 'none' }}>
          <img src={searchIcon}></img>
          <Form inline>
            <FormControl
              onChange={handleChange}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </Form>
        </div>
      )}
    </Navbar>
  )
}

export default Header
