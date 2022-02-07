import mongoose from 'mongoose'
import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import Post from '../src/models/post.js'

chai.use(chaiHttp)

const postOne = {
	title: 'The multiverse trip',
	body: 'You think you know how the world works? You think that this material universe is all that there is? What is real?',
	avatar:
		'https://res.cloudinary.com/yustogallery/image/upload/v1643696744/my-brand/articles/RestaurantAtTheEndOfTheUniverse_zjahss.jpg',
	user: new mongoose.Types.ObjectId(),
}

describe('Post', () => {
	beforeEach(async () => {
		await Post.deleteMany()
		const post = await new Post(postOne)
		await post.save()
	})

    describe('GET them', () => {
        it('should get all posts', (done) => {
        chai.request(server).get('/api/posts')
            .end((err, res) => {
                expect(res).to.have.status(200)
              done()
            })
        })
    })
})
