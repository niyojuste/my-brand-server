import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import { 
	setupDatabase, 
	userOneId, 
	userTwoId, 
	postOneId, 
	postTwoId, 
	userTwoToken,
	userOneToken,
	clearDatabase
} from './fixtures/db.js'
import Post from '../src/models/post.js'

chai.use(chaiHttp)

beforeEach(setupDatabase)

describe('POST /posts', () => {
	it('should create an article by logged in user', async () => {
		const res = await chai.request(server).post('/api/posts')
							  .set('Authorization', `Bearer ${userTwoToken}`)
							  .send({
								  title: 'Unlimited power',
								  body: 'The darkside of the force is a pathway to many abilities some consider unnatural',
								  image: 'https://res.cloudinary.com/yustogallery/image/upload/v1644542691/my-brand/articles/palpatine-family-children-1576775874.jpg_zhyggh.jpg'
							  })
		expect(res).to.have.status(201)
		
		const post = await Post.findById(res.body._id)
		expect(post.user.toString()).to.equal(userTwoId.toString())
	})
})

describe('GET /posts', () => {
	it('should get all posts', (done) => {
		chai.request(server).get('/api/posts')
		.end((err, res) => {
			expect(res).to.have.status(200)
			done()
		})
	})
})

describe('GET /posts/me', () => {
	it('should fetch only posts of logged in user', async () => {
		const res = await chai.request(server).get('/api/posts/me')
							  .set('Authorization', `Bearer ${userTwoToken}`)
							  .send()
		expect(res).to.have.status(200)
		expect(res.body).to.be.a('array').to.have.lengthOf(1)
	})
})

describe('GET /posts/:id', () => {
	it('should fetch a requested article', async () => {
		const res = await chai.request(server).get(`/api/posts/${postOneId}`)
							  .send()
		expect(res).to.have.status(200)
		expect(res.body._id).to.be.equal(postOneId.toString())
	})
})

describe('PATCH /posts/:id', () => {
	it('should update contents of an article by its owning, logged in user', async () => {
		const res = await chai.request(server).patch(`/api/posts/${postTwoId}`)
							  .set('Authorization', `Bearer ${userTwoToken}`)
							  .send({
								  title: "The Hitchhiker's guide to the galaxy" 
							  })
		expect(res).to.have.status(200)
		expect(res.body).to.own.property('_id', postTwoId.toString())
	})
})

describe('PATCH /likes', () => {
	it('should add a like to an article', async () => {
		const res = await chai.request(server).patch(`/api/posts/${postOneId}/likes`)
							  .set('Authorization', `Bearer ${userTwoToken}`)
							  .send()
		expect(res).to.have.status(200)
		expect(res.body).to.own.property('message', 'Like added')
	})
	it('should remove a like to an article', async () => {
		const res = await chai.request(server).patch(`/api/posts/${postTwoId}/likes`)
							  .set('Authorization', `Bearer ${userOneToken}`)
							  .send()
		expect(res).to.have.status(200)
		expect(res.body).to.own.property('message', 'Like removed')
	})
})

describe('PATCH /posts/:id/comments', () => {
	it('should add a logged in user\'s comment to a requested post', async () => {
		const res = await chai.request(server).patch(`/api/posts/${postOneId}/comments`)
							  .set('Authorization', `Bearer ${userTwoToken}`)
							  .send({
								  comment: 'Good stuff'
							  })
		expect(res).to.have.status(200)

		const post = await Post.findById(postOneId)
		expect(post.comments).not.to.be.empty
	})
})

describe('DELETE /posts/:id', () => {
	it('should delete an article by admin only', async() => {
		const res = await chai.request(server).delete(`/api/posts/${postTwoId}`)
							  .set('Authorization', `Bearer ${userOneToken}`)
							  .send()
		expect(res).to.have.status(202)
		
		const post = await Post.findById(postTwoId)
		expect(post).to.be.null
	})
})

afterEach(clearDatabase)