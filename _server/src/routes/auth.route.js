import { Router } from 'express'
const router = new Router()
import { authController } from '../controllers'
import protect, { auth } from '../middlewares/auth'
import validate from '../middlewares/validate'
import { authValidation, userValidation } from '../validations'

router.post(
  '/signup',
  validate(userValidation.createUser),
  authController.register
)

router.post('/signing', validate(authValidation.login), authController.login)
router.get('/access_token', authController.accessToken)
router.post(
  '/forgot_password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)
router.post(
  '/reset_password',
  protect,
  validate(authValidation.resetPassword),
  authController.resetPassword
)

router.get('/signout', auth(), authController.logout)

export default router
