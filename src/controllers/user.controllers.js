const User = require('./../models/user.model')

// Find all users
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    })

    res.status(200).json({
      status: 'succes',
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
      id,
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

    const user = await User.create({
      name,
      email,
      password,
      role,
    })

    if (email) {
    }

    res.status(200).json({
      status: 'succes',
      message: `new user with name ${name} created`,
      user,
    })
  } catch (error) {
    console.log(error)

    const errorMessage = error.errors[0].message

    return res.status(500).json({
      status: 'fail',
      message: 'somwthing went wrong!',
      errorMessage,
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
    const errorMessage = error.errors[0].message
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      errorMessage,
    })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const { user } = req

    await user.update({ status: 'not available' })

    res.status(200).json({
      status: 'succes',
      message: `user with name ${name} and id ${id} deleted`,
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