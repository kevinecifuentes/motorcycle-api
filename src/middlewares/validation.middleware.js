const { body, validationResult } = require('express-validator')

const validFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    })
  }
  next()
}

exports.repairValidation = [
  body('date').notEmpty().withMessage('date cannot be empty'),
  body('motorsNumber').notEmpty().withMessage('this field, cannot be empty'),
  body('description').notEmpty().withMessage('this repair needs a description'),
  validFields,
]

exports.userValidation = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('this email is not valid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
  validFields,
]
