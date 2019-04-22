const db = require('./db')

const timestamps = require('mongoose-timestamp')

const powerSocketSchema = db.Schema({
  name:  { 
    type: String,
    required: true,
    unique: true
  },
  data: [{
    watts: String,
    amperes: String,
    volts: String,
    timestamps: String
  }],
  state: Boolean
})








powerSocketSchema.plugin(timestamps)

module.exports = db.model('PowerSocket', powerSocketSchema)
