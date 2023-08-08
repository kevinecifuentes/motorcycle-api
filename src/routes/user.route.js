const express = require('express')
const router = express.Router()

// controller
const userController = require('./../controllers/user.controllers')

// middleware
const userMiddleware = require('./../middlewares/user.middleware')
const validationMiddleware = require('./../middlewares/validation.middleware')
const authController = require('./../controllers/authContoller')
const authMiddlewares = require('./../middlewares/auth.middlewares')

router
  .route('/')
  .post(validationMiddleware.userValidation, userController.createUser)

router.route('/login').post(authController.signIn)

router.use(authMiddlewares.protect)

router.route('/').get(userController.findAllUsers)

router
  .route('/:id')
  .get(userMiddleware.validateUser, userController.findUser)
  .patch(userMiddleware.validateUser, userController.updateUser)
  .delete(userMiddleware.validateUser, userController.deleteUser)

module.exports = router
