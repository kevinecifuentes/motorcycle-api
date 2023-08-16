const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')
const generateJWT = require('./../utils/jwt')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email: email.trim().toLowerCase(),
      status: 'available',
    },
  })

  if (!(await bcrypt.compare(password, user.password)))
    next(new AppError('Email or password incorrect', 401))

  const token = await generateJWT(user.id)

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      nama: user.name,
      email: user.email,
      role: user.role,
    },
  })
})
