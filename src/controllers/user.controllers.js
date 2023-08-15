const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')
const generateJWT = require('./../utils/jwt')

// Find all users
exports.findAllUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      parent,
    })
  }
}

// Find user with id
exports.findUser = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req

    return res.status(200).json({
      status: 'succes',
      message: `User with id ${id} found`,
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status.json({
      status: 'fail',
      message: 'somethong went wroong!',
    })
  }
}

// Create new user
exports.createUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'fail',
      message: 'somwthing went wrong!',
      error,
    })
  }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { user } = req
    const { name, email } = req.body

    await user.update({ name, email })

    res.status(200).json({
      status: 'succes',
      message: 'user updated',
      user,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req

    await user.update({ status: 'not available' })

    res.status(200).json({
      status: 'succes',
      message: `user ${user.name} with id ${user.id} deleted`,
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    })
  }
}
