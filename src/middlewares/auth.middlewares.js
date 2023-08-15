const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const { promisify } = require('util')
const AppError = require('../utils/appError')

exports.protect = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return next(
        new AppError('you are not login yet, please login and try again', 401)
      )
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    )

    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: 'available',
      },
    })

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'the owner of this token is not available',
      })
    }

    req.sessionUser = user
    next()
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'error',
      message: 'something went wrong',
      error,
    })
  }
}

exports.protectAccountOwner = (req, res, next) => {
  const { user, sessionUser } = req

  if (user.id !== sessionUser.id) {
    return next(
      new AppError(
        'you are not the own of this account and cannot do that',
        403
      )
    )
  }
  next()
}

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(new AppError('you do not have permission to do that', 403))
    }
    next()
  }
}
