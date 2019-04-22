const jwt = require('jsonwebtoken')
const config = require('../../config')

const validateSignUpForm = (values, callback) => {
  let errors = {}
  let hasErrors = false

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email'
    hasErrors = true
  }

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username'
    hasErrors = true
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password'
    hasErrors = true
  }

  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password'
    hasErrors = true
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match'
    hasErrors = true
  }

  if (callback) {
    callback(hasErrors && errors)
  } else {
    return hasErrors && errors
  }
}

const generateToken = user => {
  let payload = {
    _id: user._id.toString()
  }

  return token = jwt.sign(payload, config.secretKey, {
    expiresIn: 60 * 60 * 24 
  })
}

const getCleanUser = user => {
  if (!user) return {}

  let prettyUser = user.toJSON()

  return {
    _id: prettyUser._id,
    username: prettyUser.username,
    email: prettyUser.email,
    powerSockets: prettyUser.powerSockets
  }
}

module.exports = {
  validateSignUpForm: validateSignUpForm,
  generateToken: generateToken,
  getCleanUser: getCleanUser
}



