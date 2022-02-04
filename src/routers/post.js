import { Router } from 'express'
import postModel from '../models/post.js'
import PostController from '../controllers/post.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = new Router()
const postController = new PostController(postModel)

router.post('/posts', auth, postController.validatePost)
router.get('/posts', postController.getAll)
router.get('/posts/me', auth, postController.getAllFromUser)
router.get('/posts/:id', postController.getOne)
router.patch('/posts/:id', auth, postController.validatePatch)
router.delete('/posts/:id', auth, authAdmin, postController.delete)
router.patch('/posts/:id/likes', auth, postController.react)
router.post('/posts/:id/comments', auth, postController.addComment)
router.get('/posts/:id/comments', postController.getComments)

export default router