const User = require('./../models/user.model')
const bcrypt = require('bcryptjs')
const generateJWT = require('./../utils/jwt')

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email: email.trim().toLowerCase(),
        status: 'available',
      },
    })

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'email or password incorrect',
      })
    }

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
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error,
    })
  }
}
