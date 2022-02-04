import { Router } from 'express'
import UserModel from '../models/user.js'
import UserController from '../controllers/user.js'

const router = new Router()
const userController = new UserController(UserModel)

router.post('/users', userController.validatePost)
router.get('/users', userController.getAll)
router.get('/users/:id', userController.getOne)
router.patch('/users/:id', userController.validatePatch)
router.delete('/users/:id', userController.delete)

export default router