const express = require('express') 
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')
const expressJwt = require('express-jwt')
const PowerSocket = require('../models/PowerSocket')
const User = require('../models/User')
const config = require('../../config')

const ObjectId = require('mongoose').Types.ObjectId

router.get('/sockets', (req, res) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    User.findById({'_id': user._id }, (err, user) => {

      let socketsIdArray =  user.powerSockets.map((socket, index, array) => {
          return socket.socketId       
      })

      console.log(socketsIdArray)


       
      PowerSocket.find({_id: {$in: socketsIdArray}}, (err, sockets) => {

        res.json({
          powerSockets: sockets
        })        
      }) 

    })

  })

})


router.post('/addPowerSocket', (req, res) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
        User.update(
           { "_id": user._id},
           { "$push": { "powerSockets": {
            "name": "power socket",
            "socketId": new ObjectId(req.body.powerSocketId)
           }}},
           function (err, info) {
             res.json({
               user: info
             }) 
           }
        )
    })
})

router.get('/socket/:id', (req, res) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    })
  }

  jwt.verify(token, config.secretKey, (err, user) => {
    User.findById({'_id': user._id }, (err, user) => {
      PowerSocket.find({'_id': new ObjectId(req.params.id)}, (err, socket) => {
        res.json({
          powerSocket: socket
        })
     }) 
   })
  })
})

router.get('/updateState/:id', (req, res) => {

  let token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    PowerSocket.findOne({'_id': new ObjectId(req.params.id)}, (err, oldPowerSocket) => {
        let newPowerSocket = oldPowerSocket
        newPowerSocket.state = !oldPowerSocket.state
        newPowerSocket.save((err, powerSocket) => {
          res.json({
            powerSocket: powerSocket
          })
        })
    })
  }

  if (token) { 
    jwt.verify(token, config.secretKey, (err, user) => {
      User.findById({'_id': user._id }, (err, user) => {
       PowerSocket.findOne({'_id': new ObjectId(req.params.id)}, (err, oldPowerSocket) => {
              let newPowerSocket = oldPowerSocket
              newPowerSocket.state = !oldPowerSocket.state
              newPowerSocket.save((err, powerSocket) => {
              res.json({
                powerSocket: powerSocket
              })
          })
        })
      })
    })
  }

})


router.post('/data', (req, res) => {

  let body = req.body

  console.log(body)

  PowerSocket.update(
     { "_id": new ObjectId(body.id)},
     { "$push": { "data": {
      "watts": body.data[0],
      "amperes": body.data[1],
      "volts": body.data[2],
      "timestamps": Date.now().toString()
     }}},
     function (err, info) {
      PowerSocket.findOne({'_id': new ObjectId(body.id)}, (err, powerSocket) => {
          
            res.send(
              powerSocket.state
            )
      })
    }
  )
})


router.post('/createPowerSocket', (req, res) => {

  console.log(req.body)

  let body = req.body


  let powerSocket = new PowerSocket({
    name: body.name.trim(),
    data: [],
    state: false
  })

   powerSocket.save((err, powerSocket) => {
      if (err)
        throw err

        res.json({
          powerSocket
        })

  })

})
module.exports = router









