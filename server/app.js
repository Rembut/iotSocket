const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const index = require('./routes')
const user = require('./routes/user')
const powerSocket = require('./routes/powerSocket')
const cors = require('cors')

const app = express()

app.use(express.static('public'))

app.use(cors())

app.disable('etag');

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Request-Headers", "*")
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})

app.use(logger('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())

app.use(bodyParser({limit: '50mb'}))

app.use('/api/', index)
app.use('/api/', user)
app.use('/api/', powerSocket)

const server = app.listen(process.env.PORT || 3001, () => {
    console.log('Server up and running in %d ', server.address().port)
})