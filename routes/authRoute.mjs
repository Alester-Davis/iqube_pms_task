import { Router } from "express"
import { displayUser, displayUsers } from "../Controllers/userController.mjs"
import { signup, login, protect ,restrict} from "../Controllers/authContoller.mjs"
const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)



export default router