import { Router } from 'express'
import QueryController from '../controllers/query.js'
import QueryModel from '../models/query.js'

const router = new Router()
const queryController = new QueryController(QueryModel)

router.post('/queries', queryController.validateQuery)
router.get('/queries', queryController.getAll)

export default router