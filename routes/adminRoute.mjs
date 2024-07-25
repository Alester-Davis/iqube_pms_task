<<<<<<< HEAD
import {Router} from 'express'
import {admin} from '../Controllers/pageContoller.mjs'
import {displayUser,displayUsers,deleteUser} from '../Controllers/userController.mjs'
import {protect,restrict} from '../Controllers/authContoller.mjs'

const router = Router()

router.route('/').get(admin)
router.route('/aboutMe').get(protect,displayUser)
router.route('/allUsers').get(protect,restrict('admin'),displayUsers)
router.route('/deletUser').get(protect,restrict('admin'),deleteUser)

=======
import {Router} from 'express'
import {admin} from '../Controllers/pageContoller.mjs'
import {displayUser,displayUsers,deleteUser} from '../Controllers/userController.mjs'
import {protect,restrict} from '../Controllers/authContoller.mjs'
import { generateLink , receiveLink} from '../Controllers/inviteContoller.mjs'

const router = Router()

router.route('/').get(admin)
router.route('/aboutMe').get(protect,restrict('admin'),displayUser)
router.route('/allUsers').get(protect,restrict('admin'),displayUsers)
router.route('/deletUser').get(protect,restrict('admin'),deleteUser)
router.route('/sendMail').get(protect,restrict('admin'),generateLink)


>>>>>>> master
export default router