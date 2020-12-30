import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl } from 'react-bootstrap'

// Image and Icon imports
import appLogo from '../../Images/MediLogo.svg'
import searchIcon from '../../Images/SearchIcon.svg'

import './header.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#profile">Profile</Nav.Link>
    <Nav.Link href="#message">Message</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user, handleChange }) => {
  console.log('window.location.hash is:', window.location.hash)

  const hideSearchBar = window.location.hash === '#/profile'

  console.log('hide search bar is: ', hideSearchBar)

  return (
    <Navbar className="header-nav-bar" expand="md">
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
      <div className="app-logo">
        <a href="#">
          <img src={appLogo} alt="Medi thanks logo"></img>
        </a>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user && (
            <span className="navbar-text mr-2">Welcome, {user.email}</span>
          )}
          {user ? authenticatedOptions : unauthenticatedOptions}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
