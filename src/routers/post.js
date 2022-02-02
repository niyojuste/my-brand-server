import { Router } from 'express'
import model from '../models/post.js'
import PostController from '../controllers/post.js'

const router = new Router()
const postController = new PostController(model)

router.post('/posts', postController.validatePost)
router.get('/posts', postController.getAll)
router.get('/posts/:id', postController.getOne)
router.patch('/posts/:id', postController.validatePatch)
router.delete('/posts/:id', postController.delete)
router.patch('/posts/:id/likes/:user', postController.react)
router.post('/posts/:id/comments/:user', postController.addComment)
router.get('/posts/:id/comments', postController.getComments)

export default router