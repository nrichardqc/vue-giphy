let express = require('express')
let logger = require('morgan')
require('dotenv').load()

let indexRouter = require('./routes/index')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

module.exports = app
