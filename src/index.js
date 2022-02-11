import express from 'express'
import './db/mongoose.js'
import swaggerDocs from './swagger.js'
import queryRouter from './routers/query.js'
import userRouter from './routers/user.js'
import postRouter from './routers/post.js'

const port = process.env.PORT || 3005
const app = express()

app.use(express.json())
app.use('/api', queryRouter)
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	swaggerDocs(app, port)
})

export default app