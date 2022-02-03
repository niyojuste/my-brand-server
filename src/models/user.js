import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    location: {
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        }
    },
    avatar: {
        type: String
    },
    role: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.plugin(uniqueValidator)
export default mongoose.model('User', userSchema)
