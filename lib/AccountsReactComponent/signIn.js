import React, { Component, Fragment } from 'react'
import BaseForm from './baseForm'
import { validateForm } from '../utils'
import { getModel, redirect } from './commonUtils'
import { login } from './methods'
import SocialButtons from './socialButtons'

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      errors: []
    }

    this.getModel = getModel.bind(this)
    this.redirect = redirect.bind(this)
  }

  render () {
    const {
      currentState,
      defaults
    } = this.props

    const {
      texts,
      hideSignUpLink,
      showForgotPasswordLink
    } = defaults

    const model = this.getModel()

    return (
      <Fragment>
        <BaseForm
          context={this}
          currentState={currentState}
          values={model}
          defaults={defaults}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
        />

        <SocialButtons />

        {!hideSignUpLink && <a onMouseDown={this.redirectToSignUp} style={linkStyle}>{texts.links.toSignUp}</a>}
        {showForgotPasswordLink && <a onMouseDown={this.redirectToForgotPwd} style={linkStyle}>{texts.links.toForgotPwd}</a>}
      </Fragment>
    )
  }

  onSubmit = () => {
    /* Login */
    const model = this.getModel()

    // Validate form
    if (!validateForm(model, this)) return

    const { username, email, password } = model

    // Login
    login(username, email, password, err => {
      if (err) {
        this.setState({ errors: [{ _id: '__globals', errStr: err.reason }] })
      }
    })
  }

  redirectToSignUp = () => {
    this.redirect('signUp', this.props.defaults.redirects.toSignUp)
  }

  redirectToForgotPwd = () => {
    this.redirect('forgotPwd', this.props.defaults.redirects.toForgotPwd)
  }
}

const linkStyle = {
  display: 'block',
  cursor : 'pointer'
}

export default SignIn