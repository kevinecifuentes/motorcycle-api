const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Repair = require('./../models/repair.model')

//validate only pending status
exports.validateRepair = catchAsync(async (req, res, next) => {
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
})

//validate pending and completed status
exports.validatePendingAndCompletedRepair = catchAsync(
  async (req, res, next) => {
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
  }
)
