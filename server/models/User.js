const db = require('./db')

const timestamps = require('mongoose-timestamp')

const userSchema = db.Schema({
  username:  { 
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: { 
    type: String,
    required: true
  },
  powerSockets: [{
    name: String,
    socketId: db.Schema.Types.ObjectId
  }]
})

userSchema.plugin(timestamps)

module.exports = db.model('User', userSchema)

