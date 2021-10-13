const router = require('express').Router();
const { registerUser, loginUser, logout, getUserDetails } = require('../controlers/userController')
const { body } = require('express-validator')
const { checkValidation } = require('../utils/validations')
router.route('/')
    .post(
        body('user.name').trim().isLength({ min: 3 }).toLowerCase(),
        body('user.email').isEmail(),
        body('user.password').isLength({ min: 6 }),
        body('user.lastName').trim().isLength({ min: 3 }).toLowerCase(),
        checkValidation
        , registerUser)

router.route('/login')
    .post(
        body('user.email').isEmail(),
        body('user.password').isLength({ min: 6 }),
        checkValidation
        , loginUser)

router.route('/logout')
    .post(logout)

router.route('/profile')
    .get(getUserDetails)

module.exports = router;
