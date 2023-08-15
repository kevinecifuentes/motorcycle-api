const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//routes
const userRoutes = require('./routes/user.route')
const repairRoutes = require('./routes/repair.route')
const AppError = require('./utils/appError')

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

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'fail'

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

module.exports = app
