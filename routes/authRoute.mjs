import { Router } from "express"
import { displayUser, displayUsers } from "../Controllers/userController.mjs"
import { signup, login, protect ,restrict} from "../Controllers/authContoller.mjs"
import { receiveLink } from "../Controllers/inviteContoller.mjs"
const router = Router()


router.route('/login').post(login)
router.route('/signup').post(receiveLink,signup)


export default router