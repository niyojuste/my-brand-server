import { Router } from 'express'
import UserModel from '../models/user.js'
import UserController from '../controllers/user.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = new Router()
const userController = new UserController(UserModel)

router.post('/users', userController.validatePost)
router.post('/login', userController.login)
router.get('/logout', auth, userController.logout)
router.get('/logoutAll', auth, userController.logoutAll)
router.get('/users', auth, authAdmin, userController.getAll)
router.get('/users/me', auth, userController.getOne)
router.get('/users/:id', auth, authAdmin, userController.getSelf)
router.patch('/users/:id', auth, userController.validatePatch)
router.delete('/users/:id', auth, authAdmin, userController.delete)

export default router