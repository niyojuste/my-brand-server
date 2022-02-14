import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../../lib/models/user.js'
import Post from '../../lib/models/post.js'
import Query from '../../lib/models/query.js'

const userOneId = new mongoose.Types.ObjectId()
const userOneToken = jwt.sign({ id: userOneId }, process.env.JWT_SECRET)
const userOne = {
	_id: userOneId,
	name: 'Juste Niyonteze',
	password: 'himself',
	username: 'Yusto',
	email: 'niyojuste@email.com',
	role: 'admin',
	tokens: [
		{
			token: userOneToken,
		},
	],
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwoToken = jwt.sign({ id: userTwoId }, process.env.JWT_SECRET)
const userTwo = {
	_id: userTwoId,
	name: 'Jane Doe',
	password: 'unknown',
	username: 'Anonymous',
	email: 'anonymousdoe@email.com',
	tokens: [
		{
			token: userTwoToken,
		},
	],
}

const postOneId = new mongoose.Types.ObjectId()
const postOne = {
	_id: postOneId,
	title: 'Open your eye',
	body: 'You think you know how the world works? You think that this material universe is all that there is? What is real? What mysteries lie beyond the edge of your senses?',
	image: 'https://res.cloudinary.com/yustogallery/image/upload/v1643696744/my-brand/articles/RestaurantAtTheEndOfTheUniverse_zjahss.jpg',
	user: userOneId,
}

const postTwoId = new mongoose.Types.ObjectId()
const postTwo = {
	_id: postTwoId,
	title: 'The universe in a nutshell.',
	body: 'In the beginning, the universe was created. This in turn made a lot of people angry and was widely regarded as a bad move.',
	image: 'https://res.cloudinary.com/yustogallery/image/upload/v1643696744/my-brand/articles/RestaurantAtTheEndOfTheUniverse_zjahss.jpg',
	user: userTwoId,
	likes: [userOneId],
}

const queryId = new mongoose.Types.ObjectId()
const query = {
	_id: queryId,
	name: 'Guy Random',
	email: 'guyrandom@email.com',
	tel: '+250788112233',
	query: 'Random query',
}

const setupDatabase = async () => {
	await Post.deleteMany()
	await User.deleteMany()
	await Query.deleteMany()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new Post(postOne).save()
	await new Post(postTwo).save()
	await new Query(query).save()
}

const clearDatabase = async () => {
	await Post.deleteMany()
	await User.deleteMany()
	await Query.deleteMany()
}

export {
	setupDatabase,
	clearDatabase,
	userOneToken,
	userTwoToken,
	userOneId,
	userTwoId,
	postOneId,
	postTwoId,
	queryId,
}
