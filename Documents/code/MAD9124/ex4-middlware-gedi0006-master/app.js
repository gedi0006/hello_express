'use strict'

const carsRouter = require('./routes/carsRouter')

const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/cars',carsRouter)


const port = process.env.port || 3030

app.listen(port, () => console.log(`server listening on port ${port}.......`))