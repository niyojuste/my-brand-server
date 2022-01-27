import express from 'express'
import './db/mongoose.js'

const app = express()

app.listen(process.env.PORT, () => {
	console.log('Server is running...')
})
