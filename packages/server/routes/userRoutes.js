const router = require('express').Router();
const {registerUser, loginUser, logout} = require('../controlers/userController')

router.route('/')
    .post(registerUser)
    
router.route('/login')
    .post(loginUser)

router.route('/logout')
    .get(logout)
module.exports = router;
