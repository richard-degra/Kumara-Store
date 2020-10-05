const express = require('express')
const routes = express.Router()
const sessionController = require('../app/controllers/sessionController')
const userController = require('../app/controllers/userController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const { loggedUserRedirect, onlyUsers } = require('../app/middlewares/session')

// LOGIN / LOGOUT //

routes.get('/login', loggedUserRedirect, sessionController.loginForm)
routes.post('/login', SessionValidator.login, sessionController.login)
routes.post('/logout', sessionController.logout)

// // RESET PASSWORD //

routes.get('/forgot-password', sessionController.forgotForm)
routes.get('/password-reset', sessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, sessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, sessionController.reset)

// // USER REGISTER //

routes.get('/register', userController.registerForm)
routes.post('/register', UserValidator.post, userController.post)

routes.get('/', onlyUsers, UserValidator.show, userController.show)
routes.put('/', UserValidator.update, userController.update)
routes.delete('/', userController.delete)

module.exports = routes