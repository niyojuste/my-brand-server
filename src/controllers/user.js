import Joi from 'joi'
import AppController from "./app.js"
import Cloudinary from '../helpers/cloudinary.js'

class UserController extends AppController {
    schema = Joi.object({
            name: Joi.string().min(4),
            username: Joi.string().min(3),
            email: Joi.string().email(),
            password: Joi.string().min(3),
            location: {
                longitude: Joi.number(),
                latitude: Joi.number()
            },
            avatar: Joi.any()            
        })
    constructor(model) {
        super(model)
        this._model = model
        this.validatePost = this.validatePost.bind(this)
        this.validatePatch = this.validatePatch.bind(this)
    }

    async validatePost(req, res) {
        const newSchema = this.schema.and('name', 'username', 'email', 'password')
        const { error, value } = newSchema.validate(req.body)

        if(error) {
            return res.status(400).json(error)
        }
        if(value.avatar) {
            try {
                const result = await Cloudinary.uploadUser(value.avatar)
                value.avatar = result.secure_url
                console.log(result.message)
            } catch(e) {
                res.status(403).json(e.message)
            }
        }
        super.create(value, res)
    }

    async validatePatch(req, res) {
        const newSchema = this.schema.or('name', 'username', 'email', 'password', 'avatar', 'location')
        const { error } = newSchema.validate(req.body)

        if(error) {
            return res.status(400).json(error)
        }
        if(req.body.avatar) {
            try {
                const result = await Cloudinary.uploadUser(req.body.avatar)
                req.body.avatar = result.secure_url
                console.log(result.message)
            } catch(e) {
                res.status(403).json(e.message)
            }
        }
        super.update(req, res)
    }

    
}

export default UserController