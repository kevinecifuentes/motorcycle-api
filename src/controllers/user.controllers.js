const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')
const generateJWT = require('./../utils/jwt')
const catchAsync = require('../utils/catchAsync')

// Find all users
exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: {
      exclude: ['password'],
    },
  })

  const result = users.length

  res.status(200).json({
    status: 'succes',
    result,
    users,
  })
})

// Find user with id
exports.findUser = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { user } = req

  return res.status(200).json({
    status: 'succes',
    message: `User with id ${id} found`,
    user,
  })
})

// Create new user
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const salt = await bcrypt.genSalt(13)
  const encryptedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name: name.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: encryptedPassword,
    role,
  })

  const token = await generateJWT(user.id)

  res.status(200).json({
    status: 'succes',
    message: `new user ${name} created`,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

// Update user
exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req
  const { name, email } = req.body

  await user.update({ name, email })

  res.status(200).json({
    status: 'succes',
    message: 'user updated',
    user,
  })
})

// Delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'not available' })

  res.status(200).json({
    status: 'succes',
    message: `user ${user.name} with id ${user.id} deleted`,
    user,
  })
})
