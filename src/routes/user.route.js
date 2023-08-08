const express = require('express')
const router = express.Router()

// controller
const userController = require('./../controllers/user.controllers')

// middleware
const userMiddleware = require('./../middlewares/user.middleware')
const validationMiddleware = require('./../middlewares/validation.middleware')

router
  .route('/')
  .get(userController.findAllUsers)
  .post(validationMiddleware.userValidation, userController.createUser)

router
  .route('/:id')
  .get(userMiddleware.validateUser, userController.findUser)
  .patch(userMiddleware.validateUser, userController.updateUser)
  .delete(userMiddleware.validateUser, userController.deleteUser)

module.exports = router
