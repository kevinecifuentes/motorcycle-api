const express = require('express')
const router = express.Router()

//controllers
const repairControllers = require('./../controllers/repair.controllers')

//middlewares
const repairMiddleware = require('../middlewares/repair.middleware')

router
  .route('/')
  .get(repairControllers.findAllRepairs)
  .post(repairControllers.createRepair)

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
