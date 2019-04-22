const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const expressJwt = require('express-jwt')
const User = require('../models/User')
const config = require('../../config')

const isUserUnique = (reqBody, callback) => {

  let email = reqBody.email.trim()
  let username = reqBody.username.trim()

  User.findOne({
    $or: [{
      'email': new RegExp(["^", email, "$"].join(""), "i")
    },{
      'username': new RegExp(["^", username, "$"].join(""), "i")
    }]
  }, (err, user) => {
    if (err)
      throw err

    if (!user) {
      callback()
      return
    }

    var err 
    if (user.email === email) {
      err = err ? err : {}
      err.email = `${email} is not unique`
    }

    if (user.username === username) {
      err = err ? err : {}
      err.username = `${username} is not unique`
    }

    callback(err)
  })

}

router.post('/signin', (req, res) => {

  console.log(req.body)

  User
    .findOne({
      username: req.body.username
    })
    .select({
      __v: 0
    }) 
    .exec((err, user) => {
      if (err)
        throw err

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Username or Password is Wrong'
        })
      }

      bcrypt.compare(req.body.password, user.password, (err, valid) => {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong'
          })
        }

        let token = utils.generateToken(user)

        user = utils.getCleanUser(user)

        res.json({
          token: token,
          user: user
        })

        console.log({
          token: token,
          user: user
        })

      })
    })
})

router.post('/signup', (req, res) => {

  let body = req.body
  console.log(req.body)

  let errors = utils.validateSignUpForm(body)

  if (errors) {
    return res.status(403).json(errors)
  }

  isUserUnique(body, (err) => {
    if (err) {
      return res.status(403).json(err)
    }

    let hash = bcrypt.hashSync(body.password.trim(), 10)

    let user = new User({
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      powerSocket: []
    })

    user.save((err, user) => {
      if (err)
        throw err

        let token = utils.generateToken(user)

        user = utils.getCleanUser(user)

        res.json({
          token: token,
          user: user
        })
      })
  })
})

router.get('/im', (req, res) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    User.findById({'_id': user._id }, (err, user) => {
      //Note.find({'userId': user._id.toString()}, (err, notes) => {

        user = utils.getCleanUser(user)

        res.json({
          token: token,
          user: user//,
          //notes: notes
        })
     // }) 
    })
  })
})

module.exports = router
