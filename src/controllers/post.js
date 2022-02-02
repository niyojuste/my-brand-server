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
		this.validatePost = this.validatePost.bind(this)
		this.validatePatch = this.validatePatch.bind(this)
        this.react = this.react.bind(this)
        this.addComment = this.addComment.bind(this)
        this.getComments = this.getComments.bind(this)
	}

	async validatePost(req, res) {
		const newSchema = this.schema.and('title', 'body', 'image')
		const { error } = newSchema.validate(req.body)

		if (error) {
			return res.status(400).json(error.message)
		}
		try {
			const result = await Cloudinary.uploadPost(req.body.image)
			req.body.image = result.secure_url
			console.log(result.message)
			super.create(req.body, res)
		} catch (e) {
			res.status(403).json(e.message)
		}
	}

	async validatePatch(req, res) {
		const newSchema = this.schema.or('title', 'body', 'image')
		const { error } = newSchema.validate(req.body)

		if (error) {
			return res.status(403).json(error.message)
		}
		try {
			const result = await Cloudinary.uploadPost(req.body.image)
			req.body.image = result.secure_url
			console.log(result.message)
			super.create(req.body, res)
		} catch (e) {
			res.status(403).json(e.message)
		}
	}

    async react(req, res) {
        try {
            const post = await this._model.findOne({ _id: req.params.id })

            if(!post) {
                return res.status(404).json({ message: 'Article not found' })
            }
            const message = ''

            if(post.likes.find(user => user.toString() === (req.params.user))) {
                await post.likes.splice(post.likes.findIndex(user => user.toString() === req.params.user), 1)
                message = 'Like removed'
            } else {
                await post.likes.push(req.params.user)
                message = 'Like added'
            }
            await post.save()

            res.json({ message })
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async addComment(req, res) {
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
                user: req.params.user,
                comment: req.body.comment
            })
            await post.save()
            res.json({ success: 'Comment saved' })
        } catch(e) {
            res.status(500).send(e)
        }
    }

    async getComments(req, res) {
        try {
            const post = await this._model.findOne({ _id: req.params.id })
            console.log(post)
            res.json(post.comments)
        } catch(e) {
            res.status(404).json({ error: "Article not found" })
        }
    }
}

export default PostController
