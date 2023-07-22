const express = require('express')
const router = express.Router()

// controller
const userController = require('./../controllers/user.controllers')

// middleware
const userMiddleware = require('./../middlewares/user.middleware')

router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userMiddleware.validateUser, userController.findUser)
  .patch(userMiddleware.validateUser, userController.updateUser)
  .delete(userMiddleware.validateUser, userController.deleteUser)

module.exports = router
