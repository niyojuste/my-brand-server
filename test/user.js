import mocha from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import { setupDatabase, userOneToken, userTwoToken, userOneId, userTwoId, clearDatabase } from './fixtures/db.js'
import User from '../src/models/user.js'

chai.use(chaiHttp)

beforeEach(setupDatabase)

describe('POST /users', () => {
    it('should signup a user', async () => {
        const res = await chai.request(server).post('/api/users')
            .send({
                name: 'Juste Irénée',
                username: 'justeirenee',
                email: 'justeirenee@email.com',
                password: 'str1ng0fCharact3rs'
            })
        expect(res).to.have.status(201)
    })
})

describe('POST /login', () => {
    it('should login an existing user', async () => {
        const res = await chai.request(server).post('/api/login')
                              .send({
                                  username: 'Anonymous',
                                  password: 'unknown'
                              })
        expect(res).to.have.status(200)
    })
})

describe('GET /logout', () => {
    it('should logout a signed in user on current client', async () => {
        const res = await chai.request(server).get('/api/logout')
                              .set('Authorization', `Bearer ${userTwoToken}`)
                              .send()
        expect(res).to.have.status(200)

        const user = await User.findById(userTwoId)
        expect(user.tokens).to.be.empty
    })
})

describe('GET /logoutAll', () => {
    it('should logout a signed in user everywhere', async () => {
        const res = await chai.request(server).get('/api/logoutAll')
                              .set('Authorization', `Bearer ${userTwoToken}`)
                              .send()
        expect(res).to.have.status(200)

        const user = await User.findById(userTwoId)
        expect(user.tokens).to.be.empty
    })
})

describe('GET /users', () => {
    it('should fetch all users for admin only', async () => {
        const res = await chai.request(server).get('/api/users')
                              .set('Authorization', `Bearer ${userOneToken}`)
                              .send()
        expect(res).to.have.status(200)
    })
    it('should not fetch all users for non-admin user', async () => {
        const res = await chai.request(server).get('/api/users')
                              .set('Authorization', `Bearer ${userTwoToken}`)
                              .send()
        expect(res).to.have.status(403)
    })
})

describe('/GET /users/me', () => {
    it('should return the logged in user', async () => {
        const res = await chai.request(server).get('/api/users/me')
                              .set('Authorization', `Bearer ${userTwoToken}`)
                              .send()
        expect(res).to.have.status(200)
        expect(res.body._id).to.equal(userTwoId.toString())
    })
})

describe('/GET /users/:id', () => {
    it('should fetch any requested user for admin only', async () => {
        const res = await chai.request(server).get(`/api/users/${userTwoId}`)
                              .set('Authorization', `Bearer ${userOneToken}`)
                              .send()
        expect(res).to.have.status(200)

        const user = await User.findById(userTwoId)
        expect(res.body._id).to.equal(user._id.toString())
    })
})


describe('PATCH /users/:id', () => {
    it('should update a user by admin', async () => {
        const res = await chai.request(server).patch(`/api/users/${userTwoId}`)
                              .set('Authorization', `Bearer ${userOneToken}`)
                              .send({
                                  name: 'John Doe',
                                  email: 'johndoe@email.com'
                              })
        expect(res).to.have.status(200)
    })
    it('should not update a user by non-admin user', async () => {
        const res = await chai.request(server).patch(`/api/users/${userTwoId}`)
                              .set('Authorization', `Bearer ${userTwoToken}`)
                              .send({
                                  name: 'John Doe',
                                  email: 'johndoe@email.com'
                              })
        expect(res).to.have.status(403)
    })
    it('should not update a user by unauthenticated user', async () => {
        const res = await chai.request(server).patch(`/api/users/${userTwoId}`)
                              .send({
                                  name: 'John Doe',
                              })
        expect(res).to.have.status(401)
    })
})

describe('DELETE /users/:id', () => {
    it('should delete a requested user by admin only', async () => {
        const res = await chai.request(server).delete(`/api/users/${userTwoId}`)
                                              .set('Authorization', `Bearer ${userOneToken}`)
                                              .send()
        expect(res).to.have.status(202)
    })
})

afterEach(clearDatabase)