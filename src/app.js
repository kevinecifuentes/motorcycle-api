const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalHanldeError = require('./utils/globalHandleError')

//routes
const userRoutes = require('./routes/user.route')
const repairRoutes = require('./routes/repair.route')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/repairs', repairRoutes)

//routes validation
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on this server`, 404)
  )
})

app.use(globalHanldeError)

module.exports = app
