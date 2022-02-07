import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import { setupDatabase, userOneToken } from './fixtures/db.js'

chai.use(chaiHttp)

beforeEach(setupDatabase)

describe('GET /user', () => {
    it('should return the logged in user', (done) => {
        chai.request(server).get('/api/users/me')
            .set('Authorization', `Bearer ${userOneToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
})

