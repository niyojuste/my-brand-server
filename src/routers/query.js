import { Router } from 'express'
import QueryController from '../controllers/query.js'
import QueryModel from '../models/query.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = new Router()
const queryController = new QueryController(QueryModel)

router.post('/queries', queryController.validateQuery)
router.get('/queries', auth, authAdmin, queryController.getAll)
router.get('/queries/:id', auth, authAdmin, queryController.getOne)

export default router