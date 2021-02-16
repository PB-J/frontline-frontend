import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Message from '../Messages/Message'
import Index from '../Index/Index'
import Profile from '../Profile/profile'

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      searchValue: '',
      msgAlerts: []
    }
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({
      msgAlerts: [...this.state.msgAlerts, { heading, message, variant }]
    })
  }

  render() {
    const { msgAlerts, user, searchValue } = this.state

    return (
      <Fragment>
        <Header user={user} handleChange={this.handleSearchInputChange} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="main-container">
          <Route
            path="/sign-up"
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path="/sign-in"
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => <Index user={user} searchValue={searchValue} />}
          />
          <AuthenticatedRoute
            user={user}
            path="/sign-out"
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/change-password"
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path="/message"
            render={() => (
              <Message msgAlert={this.msgAlert} user={user} history={history} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/profile"
            render={() => <Profile user={user} history={history} />}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
