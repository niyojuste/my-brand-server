import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import { setupDatabase } from './fixtures/db.js'

chai.use(chaiHttp)

beforeEach(setupDatabase)

describe('GET /posts', () => {
	it('should get all posts', (done) => {
	chai.request(server).get('/api/posts')
		.end((err, res) => {
			expect(res).to.have.status(200)
			done()
		})
	})
})
