const mongoose = require('mongoose')

const dbUrl = process.env.MONGODB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/iotSocket'
mongoose.connect(dbUrl, function(){
	mongoose.Promise = Promise
    console.log('MongoDB connected sucessfully')
    return mongoose.connection
})
   

module.exports = mongoose
