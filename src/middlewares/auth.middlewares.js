const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const { promisify } = require('util')

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
      return res.status(401).json({
        status: 'error',
        message: 'you are not login yet, please login and try again',
      })
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

    req.user = user
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
