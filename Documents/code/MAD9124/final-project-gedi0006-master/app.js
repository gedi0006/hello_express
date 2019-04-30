'use strict'

const debug = require('debug')('pizza')

require('./startup/database')()

const express = require('express')

const app  = express()

app.use(express.json())

app.use(require('express-mongo-sanitize')())

app.use('/app/user',require('./routes/user'))

app.use('/app/ingredient',require('./routes/ingredient'))

app.use('/app/pizza',require('./routes/pizza'))

app.use('/app/order',require('./routes/order'))

app.use('/auth',require('./routes/auth'))

const port = process.env.PORT || 3030

app.listen(port,() => debug(`Express is listening on port ${port}.....`))
