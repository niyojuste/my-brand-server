import { Router } from 'express'
import postModel from '../models/post.js'
import PostController from '../controllers/post.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = new Router()
const postController = new PostController(postModel)
router.get('/posts', postController.getAll)
router.post('/posts', auth, postController.validatePost)
router.get('/posts/:id', postController.getOne)
router.delete('/posts/:id', auth, authAdmin, postController.delete)
router.get('/posts/me', auth, postController.getAllFromUser)
router.patch('/posts/:id', auth, postController.validatePatch)
router.patch('/posts/:id/likes', auth, postController.react)
router.patch('/posts/:id/comments', auth, postController.addComment)
router.get('/posts/:id/comments', postController.getComments)

export default router