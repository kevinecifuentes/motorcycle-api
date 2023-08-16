const Repair = require('../models/repair.model')
const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')

// find all pending repairs
exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: User,
        attributes: ['name', 'email', 'role'],
      },
    ],
  })

  res.status(200).json({
    status: 'succes',
    message: 'repair founds',
    results: repairs.length,
    repairs,
  })
})

//find repair with id
exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req
  const { id } = req.params

  return res.status(200).json({
    status: 'succes',
    message: `repair with id ${id} found`,
    repair,
  })
})

//create repair
exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body
  const { id } = req.sessionUser

  const repair = await Repair.create({
    date,
    userId: id,
    motorsNumber,
    description,
  })

  return res.status(200).json({
    status: 'succes',
    message: 'new repair created',
    repair,
  })
})

//update repair
exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req

  if (repair.status === 'cancelled') {
    return res.status(400).json({
      status: 'invalid',
      message: 'status cancelled cannot be updated to completed',
    })
  }

  if (repair.status === 'completed') {
    return res.status(400).json({
      status: 'invalid',
      message:
        'A repair with status completed connot be changed to the same value',
    })
  }

  await repair.update({ status: 'completed' })

  return res.status(200).json({
    status: 'succes',
    message: 'status has been changed to completed',
    repair,
  })
})

//delete repair
exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req

  if (repair.status === 'completed') {
    return res.status(400).json({
      status: 'error',
      message: 'repair with status completed cannot be deleted',
    })
  }

  await repair.update({ status: 'cancelled' })

  res.status(200).json({
    status: 'succes',
    message: 'repair deleted',
    repair,
  })
})
