import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../src/index.js'
import User from '../src/models/user.js'

chai.use(chaiHttp)

const userOneId = new mongoose.Types.ObjectId()
const userOneToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
const userOne = {
    _id: userOneId,
    name: 'Juste Niyonteze',
    password: 'himself',
    username: 'Yusto',
    email: 'niyojuste@email.com',
    role: 'admin',
    tokens: [{
        token: userOneToken
    }]
}

const userTwoId = new mongoose.Types.ObjectId
const userTwo = {
    _id: userTwoId,
    name: 'John Doe',
    password: 'unknown',
    username: 'Anonymous',
    email: 'anonymousdoe@email.com',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET )
    }]
}

describe('User', () => {
    beforeEach(async () => {
        await User.deleteMany()
        await new User(userOne).save()
        await new User(userTwo).save()
    })
})