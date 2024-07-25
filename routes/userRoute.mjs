import { Router } from "express"
import { signup } from '../Controllers/authContoller.mjs'
import { updateUser } from "../Controllers/userController.mjs"
import { protect , restrict } from "../Controllers/authContoller.mjs"

const router = Router()


router.route('/').put(protect,restrict('user'),updateUser)


export default router