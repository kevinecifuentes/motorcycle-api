const AppError = require('../utils/appError')
const User = require('./../models/user.model')

exports.validateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'status'],
      },
    })

    if (!user) {
      return next(new AppError(`User with id: ${id} not found`, 404))
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    })
  }
}
