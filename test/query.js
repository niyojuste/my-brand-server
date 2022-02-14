import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../lib/index.js'
import Query from '../lib/models/query.js'
import {
	setupDatabase,
	queryId,
	userOneToken,
	clearDatabase,
} from './fixtures/db.js'

chai.use(chaiHttp)

beforeEach(setupDatabase)

describe('POST /queries', () => {
	it('should create a query', async () => {
		const res = await chai.request(server).post('/api/queries').send({
			name: 'Test User',
			email: 'testuser@email.com',
			tel: '+250788112233',
			query: 'Test query',
		})
		expect(res).to.have.status(201)
	})
})

describe('GET /queries', () => {
	it('should fetch all queries for admin', async () => {
		const res = await chai
			.request(server)
			.get('/api/queries')
			.set('Authorization', `Bearer ${userOneToken}`)
			.send()
		expect(res).to.have.status(200)
		expect(res.body).to.be.a('array').to.have.lengthOf(1)
	})
})

describe('GET /queries/:id', () => {
	it('should fetch all queries for admin', async () => {
		const res = await chai
			.request(server)
			.get(`/api/queries/${queryId}`)
			.set('Authorization', `Bearer ${userOneToken}`)
			.send()
		expect(res).to.have.status(200)
	})
})

afterEach(clearDatabase)
