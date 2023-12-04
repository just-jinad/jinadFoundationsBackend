const express = require("express")
const router = express.Router()
const {userSignup, userLogin, userDashBoard, adminSignup} = require('../controllers/users.contoller')


router.post("/signup", userSignup)
router.post("/login", userLogin)
router.get("/dashboard", userDashBoard)
router.post("/admin", adminSignup)

module.exports = router