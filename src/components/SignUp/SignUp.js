import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import styling
import './SignUp.scss'
class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  onSignUp = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    if (this.state.password.length < 3) {
      this.setState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      })
      msgAlert({
        heading:
          'Sign Up Failed with error: your password must be longer than 3 characters',
        message: messages.signUpFailure,
        variant: 'danger'
      })
    } else {
      const { msgAlert, history, setUser } = this.props

      signUp(this.state)
        .then(() => signIn(this.state))
        .then((res) => setUser(res.data.user))
        .then(() =>
          msgAlert({
            heading: 'Sign Up Success',
            message: messages.signUpSuccess,
            variant: 'success'
          })
        )
        .then(() => history.push('/'))
        .catch((error) => {
          this.setState({
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          })
          msgAlert({
            heading: 'Sign Up Failed with error: ' + error.message,
            message: messages.signUpFailure,
            variant: 'danger'
          })
        })
    }
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state

    return (
      <div className="row sign-up-container">
        <div className="col-sm-10 col-md-8 mx-auto mt-5 sign-up-form">
          <div className="sign-up-message">
            <h3 className="sign-up-title">Let&apos;s Get Started</h3>
            <p className="sign-up-content">
              Make an account to send your first &quot;thank you&quot; card
            </p>
          </div>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="username"
                name="username"
                value={username}
                placeholder="Enter Username"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className="submit-button" variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
          <p className="disclaimer">
            By clicking this button, you agree to our <a>Privacy Policy</a>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
