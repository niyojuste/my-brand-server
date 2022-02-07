import jwt from 'jsonwebtoken'

class AuthController {
    constructor(userModel) {
        this._userModel = userModel
        this.generateAuthToken = this.generateAuthToken.bind(this)
    }

    generateAuthToken = async (id) => {
        const user = await this._userModel.findOne({ _id: id })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET )
        
        user.tokens.push({ token })
        await user.updateOne(user)

        return token
    }

    auth = async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await this._userModel.findOne({ _id: decoded.id, 'tokens.token': token })

            if(!user) {
                throw new Error()
            }

            req.user = user
            req.token = token
            next()
            
        } catch(e) {
            res.status(401).json({ error: 'Unauthenticated' })
        }
    }

    authAdmin = async (req, res, next) => {
        try {
            const admin = await this._userModel.findOne({ _id: req.user._id, role: 'admin' })

            if(!admin) {
                throw new Error()
            }

            next()
            
        } catch(e) {
            res.status(403).json({ error: 'Not allowed' })
        }
    }
}

export default AuthController