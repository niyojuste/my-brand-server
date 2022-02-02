import AppController from "./app.js"
import Joi from 'joi'

class QueryController extends AppController {
    schema = Joi.object({
        name: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().email().required(),
        query: Joi.string().required(),
    })
    constructor(model) {
        super(model)
        this.validateQuery = this.validateQuery.bind(this)
    }

    async validateQuery(req, res) {
        const { error, value } = this.schema.validate(req.body)
        
        if(error) {
            return res.status(400).json(error.message)
        }
        super.create(value, res)
    }
}

export default QueryController