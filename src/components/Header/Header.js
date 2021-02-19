import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl } from 'react-bootstrap'

// Image and Icon imports
import appLogo from '../../Images/MediLogo.svg'
import searchIcon from '../../Images/SearchIcon.svg'
import { MdAddCircle, MdPerson } from 'react-icons/md'

import './header.scss'

const authenticatedOptions = (
  <div className="nav-header-links">
    <div className="create-post-link">
      <Nav.Link href="#message">
        <MdAddCircle className="message-icon" />
        Add Post
      </Nav.Link>
    </div>
    <div className="profile-link">
      <Nav.Link href="#profile">
        <MdPerson className="message-icon" />
        Profile
      </Nav.Link>
    </div>
    <div className="sign-out-link">
      <Nav.Link href="#sign-out">
        <p>Sign Out</p>
      </Nav.Link>
    </div>
  </div>
)

const unauthenticatedOptions = (
  <div className="sign-in-link">
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </div>
)

const Header = ({ user, handleChange }) => {
  const hideSearchBar = window.location.hash === '#/profile'
  return (
    <Navbar collapseOnSelect className="header-nav-bar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="nav-dropdown">
          <div className="auth-link-mobile auth-link">
            {user ? authenticatedOptions : unauthenticatedOptions}
          </div>
          <div className="mobile-nav-search-bar">
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
        <div className="hide-search-bar" style={{ visibility: 'hidden' }}>
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
