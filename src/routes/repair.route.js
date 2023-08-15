const express = require('express')
const router = express.Router()

//controllers
const repairControllers = require('./../controllers/repair.controllers')

//middlewares
const repairMiddleware = require('../middlewares/repair.middleware')
const validationMiddleware = require('./../middlewares/validation.middleware')
const authMiddleware = require('./../middlewares/auth.middlewares')

router.use(authMiddleware.protect)
router
  .route('/')
  .post(validationMiddleware.repairValidation, repairControllers.createRepair)

router.use(authMiddleware.restrictTo('employee'))

router.get('/', repairControllers.findAllRepairs)

router
  .route('/:id')
  .get(repairMiddleware.validateRepair, repairControllers.findRepair)
  .patch(
    repairMiddleware.validatePendingAndCompletedRepair,
    repairControllers.updateRepair
  )
  .delete(
    repairMiddleware.validatePendingAndCompletedRepair,
    repairControllers.deleteRepair
  )

module.exports = router
