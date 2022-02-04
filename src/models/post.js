import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String
        }
    },
    {
        timestamps: true
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model('Post', postSchema)



