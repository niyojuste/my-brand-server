import UserModel from '../models/user.js'
import AuthController from "../controllers/auth.js";

const user = new AuthController(UserModel)

const auth = user.auth
const authAdmin = user.authAdmin

export { auth, authAdmin }