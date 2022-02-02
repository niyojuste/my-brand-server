import mongoose from 'mongoose'

const querySchema = new mongoose.Schema({
    name: String,
    tel: String,
    email: String,
    query: String
}, {
    timestamps: true
})

export default mongoose.model('Query', querySchema)