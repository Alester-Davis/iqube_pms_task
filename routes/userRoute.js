const express = require("express")
const userControl = require("../Controllers/userController")
const authControl = require("../Controllers/authContoller")
const router = express.Router()

router.route('/signup').post(authControl.signup)
router.route('/login').post(authControl.login)

router.route('/aboutMe').get(authControl.protect,userControl.displayUser)
router.route('/allUsers').get(userControl.displayUsers)

module.exports = router