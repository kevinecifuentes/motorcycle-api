const AppError = require('../utils/appError')
const Repair = require('./../models/repair.model')

//validate only pending status
exports.validateRepair = async (req, res, next) => {
  try {
    const { id } = req.params

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    })

    if (!repair) {
      return next(new AppError('Repair not found', 404))
    }

    req.repair = repair
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    })
  }
}

//validate pending and completed status
exports.validatePendingAndCompletedRepair = async (req, res, next) => {
  try {
    const { id } = req.params

    const repair = await Repair.findOne({
      where: {
        id,
        status: ['pending', 'completed'],
      },
    })

    if (!repair) {
      return next(new AppError(`Repair with id ${id} not found`, 404))
    }

    req.repair = repair
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    })
  }
}
