import Joi from 'joi'
import AppController from './app.js'
import Cloudinary from '../helpers/cloudinary.js'

class PostController extends AppController {
	schema = Joi.object({
		title: Joi.string(),
		body: Joi.string(),
		image: Joi.string(),
	})
    comment = Joi.object({ comment: Joi.string().required() })
	constructor(model) {
		super(model)
        this._model = model
	}

	validatePost = async (req, res) => {
		const newSchema = this.schema.and('title', 'body', 'image')
		const { error } = newSchema.validate(req.body)

		if (error) {
			return res.status(400).json(error.message)
		}
		try {
			const result = await Cloudinary.uploadPost(req.body.image)
			req.body.image = result.secure_url
			req.body.user = req.user._id
			super.create(req.body, res)
		} catch (e) {
			res.status(403).json(e.message)
		}
	}

	validatePatch = async (req, res) => {
		const newSchema = this.schema.or('title', 'body', 'image')
		const { error } = newSchema.validate(req.body)

		if (error) {
			return res.status(400).json(error.message)
		}
        if (req.body.image) {
            try {
                const result = await Cloudinary.uploadPost(req.body.image)
                req.body.image = result.secure_url
                console.log(result.message)
            } catch (e) {
                res.status(400).json(e.message)
            }
        }
        super.update(req, res)
	}

    getAllFromUser = async (req, res) => {
        try {
            const posts = await this._model.find({ user: req.user._id })
            res.json(posts)
        } catch(e) {
            res.status(500).json({ error: "something went wrong", e })
        }
    }

    react = async (req, res) => {
        try {
            const post = await this._model.findOne({ _id: req.params.id })

            if(!post) {
                return res.status(404).json({ message: 'Article not found' })
            }
            let message = ''

            if(post.likes.find(user => user.toString() === req.user._id.toString())) {
                await post.likes.splice(post.likes.findIndex(user => user === req.user._id), 1)
                message = "Like removed"
            } else {
                await post.likes.push(req.user._id)
                message = "Like added"
            }
            await post.save()

            res.json({ message })
        } catch(e) {
            res.status(500).json({ error: "something went wrong" })
        }
    }

    addComment = async (req, res) => {
        try {
            const post = await this._model.findOne({ _id: req.params.id })
            if(!post) {
                return res.status(404).json({ error: 'Article not found' })
            }
            const { error } = this.comment.validate(req.body)
            if (error) {
                return res.status(400).json(error.message)
            }
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })
            await post.save()
            res.json({ success: 'Comment saved' })
        } catch(e) {
            res.status(500).send(e)
        }
    }
}

export default PostController
