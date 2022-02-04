import express from 'express'
import './db/mongoose.js'
import userRouter from './routers/user.js'
import postRouter from './routers/post.js'

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(process.env.PORT, () => {
	console.log('Server is running...')
})
