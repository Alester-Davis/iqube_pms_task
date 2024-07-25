<<<<<<< HEAD
import { Router } from "express"
import { displayUser, displayUsers } from "../Controllers/userController.mjs"
import { signup, login, protect ,restrict} from "../Controllers/authContoller.mjs"
const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)



=======
import { Router } from "express"
import { displayUser, displayUsers } from "../Controllers/userController.mjs"
import { signup, login, protect ,restrict} from "../Controllers/authContoller.mjs"
import { receiveLink } from "../Controllers/inviteContoller.mjs"
const router = Router()


router.route('/login').post(login)
router.route('/signup').post(receiveLink,signup)


>>>>>>> master
export default router