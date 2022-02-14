import bcrypt from 'bcrypt'
import Joi from 'joi'
import Cloudinary from '../helpers/cloudinary.js'
import AppController from "./app.js"
import AuthController from './auth.js'

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
        this.create = this.create.bind(this)
        this.login = this.login.bind(this)
        this.validatePost = this.validatePost.bind(this)
        this.validatePatch = this.validatePatch.bind(this)
    }

    validatePost = async (req, res) => {
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

        this.create(value, res)
    }

    create = async (newuser, res) => {
        try {
            const user = new this._model(newuser)
            await user.save()
            const token = await new AuthController(this._model).generateAuthToken(user._id)
            res.status(201).send({ token, user })
            
        } catch (e) {
            res.status(400).json({ e })
        }

    }

    login = async (req, res) => {
        try {
            const user = await this._model.findOne({ 
                email: req.body.email 
            })
            
            if(!user) {
                return res.status(404).json({ error: 'Unable to login'})
            }
            
            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if(!isMatch) {
                return res.status(404).json({ error: 'Unable to login' })
            }

            const token = await new AuthController(this._model).generateAuthToken(user._id)

            res.json({ token, user })
        } catch(e) {
            res.status(400).json(e)
        }
           
    }

    logout = async (req, res) => {
        try {
            req.user.tokens.splice(req.user.tokens.findIndex(token => {
                token.token === req.token
            }), 1)
            await req.user.updateOne(req.user)

            res.json({ message: "Logged out" })
        } catch(e) {
            res.status(500).json({ message: "Failed to logout", e})
        }

    }

    logoutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.updateOne(req.user)
            
            res.json({ message: "Lougged out everywhere" })
        } catch(e) {
            res.status(500).json({ message: "Failed to logout", e })
        }
    }

    getSelf = async (req, res) => {
        return res.json(req.user)
    }

    validatePatch = async (req, res) => {
        const newSchema = this.schema.or('name', 'username', 'email', 'password', 'avatar', 'location')
        const { error } = newSchema.validate(req.body)

        if(error) {
            return res.status(400).json(error)
        }
        if(req.body.avatar) {
            try {
                const result = await Cloudinary.uploadUser(req.body.avatar)
                req.body.avatar = result.secure_url
            } catch(e) {
                res.status(500).json(e.message)
            }
        }
        super.update(req, res)
    }

    
}

export default UserController